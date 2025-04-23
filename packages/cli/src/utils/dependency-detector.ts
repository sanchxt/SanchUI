import * as fs from 'fs-extra';
import * as path from 'path';
import * as ts from 'typescript';
import { ComponentMetadata } from '../../types/components';
import { PackageDependency } from '../../types/dependencies';
import { getComponentPath } from './paths';

/**
 * Detects dependencies by analyzing the TypeScript AST of a component
 */
export async function detectComponentDependencies(
  componentKey: string,
  allComponents: Record<string, ComponentMetadata>
): Promise<{
  componentDependencies: string[];
  packageDependencies: PackageDependency[];
}> {
  const [type, name] = componentKey.split('/');
  const componentPath = getComponentPath(type, name);
  const indexPath = path.join(componentPath, 'index.tsx');

  if (!fs.existsSync(indexPath)) {
    throw new Error(`Component file not found: ${indexPath}`);
  }

  const code = await fs.readFile(indexPath, 'utf-8');

  // parse the code into an AST
  const sourceFile = ts.createSourceFile(
    indexPath,
    code,
    ts.ScriptTarget.Latest,
    true
  );

  // extract imports
  const imports = extractImports(sourceFile);

  // component dependencies from imports
  const importDependencies = findComponentDependencies(imports, allComponents);

  // component dependencies from JSX
  const jsxDependencies = findJsxComponents(sourceFile, allComponents);

  // combine and deduplicate
  const componentDependencies = Array.from(
    new Set([...importDependencies, ...jsxDependencies])
  );

  // package dependencies
  const packageDependencies = findPackageDependencies(imports);

  return {
    componentDependencies,
    packageDependencies,
  };
}

/**
 * Extracts all import statements from a TypeScript AST
 */
function extractImports(sourceFile: ts.SourceFile): {
  moduleName: string;
  importNames: string[];
  isDefault: boolean;
  isRelative: boolean;
}[] {
  const imports: {
    moduleName: string;
    importNames: string[];
    isDefault: boolean;
    isRelative: boolean;
  }[] = [];

  // visit each node in the AST
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isImportDeclaration(node)) {
      const moduleName = (node.moduleSpecifier as ts.StringLiteral).text;
      const isRelative =
        moduleName.startsWith('.') || moduleName.startsWith('/');

      let importNames: string[] = [];
      let isDefault = false;

      // check for default import
      if (node.importClause && node.importClause.name) {
        isDefault = true;
        importNames.push(node.importClause.name.text);
      }

      // check for named imports
      if (
        node.importClause &&
        node.importClause.namedBindings &&
        ts.isNamedImports(node.importClause.namedBindings)
      ) {
        importNames = [
          ...importNames,
          ...node.importClause.namedBindings.elements.map(
            (element) => element.name.text
          ),
        ];
      }

      imports.push({
        moduleName,
        importNames,
        isDefault,
        isRelative,
      });
    }
  });

  return imports;
}

/**
 * Finds component dependencies by matching imports with known components
 */
function findComponentDependencies(
  imports: {
    moduleName: string;
    importNames: string[];
    isDefault: boolean;
    isRelative: boolean;
  }[],
  allComponents: Record<string, ComponentMetadata>
): string[] {
  const componentDependencies: Set<string> = new Set();

  // map of component names to keys for faster lookup
  const componentNameMap = new Map<string, string>();
  for (const key in allComponents) {
    componentNameMap.set(allComponents[key].name.toLowerCase(), key);
  }

  // map for path resolution
  const componentPaths = new Map<string, string>();
  for (const key in allComponents) {
    const [type, name] = key.split('/');
    componentPaths.set(`./components/${type}/${name}`, key);
    componentPaths.set(`../components/${type}/${name}`, key);
    componentPaths.set(`../../components/${type}/${name}`, key);
    componentPaths.set(`./${name}`, key);
    componentPaths.set(`../${name}`, key);
    componentPaths.set(`../${type}/${name}`, key);
  }

  // check each import to see if it matches a component
  for (const importInfo of imports) {
    if (importInfo.isRelative) {
      // Check if the relative path might be a component
      if (componentPaths.has(importInfo.moduleName)) {
        componentDependencies.add(componentPaths.get(importInfo.moduleName)!);
        continue;
      }

      // check by component name
      for (const name of importInfo.importNames) {
        const lowerName = name.toLowerCase();
        if (componentNameMap.has(lowerName)) {
          componentDependencies.add(componentNameMap.get(lowerName)!);
        }
      }
    }
  }

  return Array.from(componentDependencies);
}

/**
 * Extracts package dependencies from import statements
 */
function findPackageDependencies(
  imports: {
    moduleName: string;
    importNames: string[];
    isDefault: boolean;
    isRelative: boolean;
  }[]
): PackageDependency[] {
  const packageDependencies: PackageDependency[] = [];

  // filter non-relative imports (external packages)
  const externalImports = imports.filter((imp) => !imp.isRelative);

  // convert to package dependencies
  for (const importInfo of externalImports) {
    // ignore node core modules
    if (!isNodeCoreModule(importInfo.moduleName)) {
      // extract package name
      let packageName = importInfo.moduleName;

      // handle subpaths like 'lodash/fp' -> 'lodash'
      if (packageName.includes('/') && !packageName.startsWith('@')) {
        packageName = packageName.split('/')[0];
      }

      // check if already in the list
      if (!packageDependencies.some((dep) => dep.name === packageName)) {
        packageDependencies.push({
          name: packageName,
          // We don't have version info here, would need to check package.json
          isDev: false, // Assume not dev dependencies
          isPeer: false, // Assume not peer dependencies
        });
      }
    }
  }

  return packageDependencies;
}

/**
 * Check if a module name is a core Node.js module
 */
function isNodeCoreModule(moduleName: string): boolean {
  const coreModules = [
    'assert',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'constants',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'events',
    'fs',
    'http',
    'https',
    'module',
    'net',
    'os',
    'path',
    'perf_hooks',
    'process',
    'punycode',
    'querystring',
    'readline',
    'repl',
    'stream',
    'string_decoder',
    'timers',
    'tls',
    'trace_events',
    'tty',
    'url',
    'util',
    'v8',
    'vm',
    'wasi',
    'worker_threads',
    'zlib',
  ];

  return coreModules.includes(moduleName);
}

/**
 * Analyzes JSX in a component to find other components used
 * This is a more advanced approach to detect components used in JSX
 */
function findJsxComponents(
  sourceFile: ts.SourceFile,
  allComponents: Record<string, ComponentMetadata>
): string[] {
  const componentDependencies: Set<string> = new Set();
  const componentNameMap = new Map<string, string>();

  // build component name lookup
  for (const key in allComponents) {
    componentNameMap.set(allComponents[key].name.toLowerCase(), key);
  }

  // function to check for JSX elements
  function visitNode(node: ts.Node): void {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = node.tagName.getText(sourceFile);

      // Only look for PascalCase component names (not HTML elements)
      if (/^[A-Z]/.test(tagName)) {
        const lowerTagName = tagName.toLowerCase();
        if (componentNameMap.has(lowerTagName)) {
          componentDependencies.add(componentNameMap.get(lowerTagName)!);
        }
      }
    }

    ts.forEachChild(node, visitNode);
  }

  visitNode(sourceFile);

  return Array.from(componentDependencies);
}

/**
 * Analyzes a component file to find JSX usage of other components
 * This is more complex and would require deeper AST analysis
 */
function findJsxUsage(
  sourceFile: ts.SourceFile,
  allComponents: Record<string, ComponentMetadata>
): string[] {
  // This is a more advanced implementation that would need to:
  // 1. Find all JSX elements in the file
  // 2. Check if the element names match component names
  // 3. Return the component keys for those matches

  // For now, we'll return an empty array as this would
  // require more complex AST traversal
  return [];
}

/**
 * Builds a complete dependency graph for all components
 */
export async function buildFullDependencyGraph(
  componentsRegistry: Record<string, ComponentMetadata>
): Promise<Map<string, string[]>> {
  const dependencyGraph = new Map<string, string[]>();

  // process each component
  for (const key in componentsRegistry) {
    try {
      const { componentDependencies } = await detectComponentDependencies(
        key,
        componentsRegistry
      );

      dependencyGraph.set(key, componentDependencies);
    } catch (error) {
      console.error(`Error analyzing dependencies for ${key}:`, error);
      // add component with empty dependencies to avoid breaking the graph
      dependencyGraph.set(key, []);
    }
  }

  return dependencyGraph;
}
