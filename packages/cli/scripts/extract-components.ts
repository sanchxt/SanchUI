import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import * as ts from 'typescript';

// Configuration
const CORE_PACKAGE_PATH = path.resolve(__dirname, '../../core');
const OUTPUT_PATH = path.resolve(__dirname, '../src/templates/components');
const COMPONENT_TYPES = ['atoms', 'molecules', 'organisms'];

// Ensure output directories exist
function ensureDirectories() {
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  for (const type of COMPONENT_TYPES) {
    const typePath = path.join(OUTPUT_PATH, type);
    if (!fs.existsSync(typePath)) {
      fs.mkdirSync(typePath, { recursive: true });
    }
  }
}

// Extract component metadata from files
function extractMetadata(componentPath: string, componentContent: string): any {
  const name = path.basename(path.dirname(componentPath));
  const type = path.basename(path.dirname(path.dirname(componentPath)));

  // Basic metadata
  const metadata: any = {
    name,
    type,
    description: '',
    dependencies: [],
    exports: [],
    props: [],
    hasTests: fs.existsSync(
      path.join(path.dirname(componentPath), `${name}.test.tsx`)
    ),
    hasReadme: fs.existsSync(
      path.join(path.dirname(componentPath), 'README.md')
    ),
  };

  // Extract JSDoc comments for description
  const sourceFile = ts.createSourceFile(
    componentPath,
    componentContent,
    ts.ScriptTarget.Latest,
    true
  );

  // This is a simple example - a real implementation would use the TypeScript
  // AST to extract more detailed metadata about props, exports, etc.
  const firstComment = sourceFile.getFullText().match(/\/\*\*([\s\S]*?)\*\//);
  if (firstComment && firstComment[1]) {
    metadata.description = firstComment[1].replace(/\n\s*\*/g, '\n').trim();
  }

  // Extract dependencies by looking for imports
  const importRegex = /import\s+(?:{([^}]+)})?\s*(?:from\s+['"]([^'"]+)['"])?/g;
  let match;
  while ((match = importRegex.exec(componentContent)) !== null) {
    if (match[2] && !match[2].startsWith('.')) {
      // External dependency
      metadata.dependencies.push(match[2]);
    }
  }

  // Extract exports
  const exportRegex =
    /export\s+(?:const|interface|type|function|default)\s+(\w+)/g;
  while ((match = exportRegex.exec(componentContent)) !== null) {
    metadata.exports.push(match[1]);
  }

  return metadata;
}

function transformReact19(content: string): string {
  // Handle forwardRef changes for React 19
  let transformed = content.replace(
    /React\.forwardRef<([^>]+)>\s*\(\s*\(\s*({[^}]+})\s*,\s*ref\s*\)/g,
    'function($2'
  );

  transformed = transformed.replace(
    /forwardRef<([^>]+)>\s*\(\s*\(\s*({[^}]+})\s*,\s*ref\s*\)/g,
    'function($2'
  );

  // Add ref prop to interface/type if it doesn't exist
  const interfaceRegex = /interface\s+(\w+Props)\s+{([^}]*)}/g;
  transformed = transformed.replace(interfaceRegex, (match, name, content) => {
    if (!content.includes('ref?:')) {
      return `interface ${name} {${content}\n  ref?: React.RefObject<HTMLElement>;\n}`;
    }
    return match;
  });

  return transformed;
}

// Process a single component
async function processComponent(componentPath: string) {
  const componentDir = path.dirname(componentPath);
  const componentName = path.basename(componentDir);
  const componentType = path.basename(path.dirname(componentDir)); // atoms, molecules, etc.

  // Only process if it's an index.tsx file in a component directory
  if (
    path.basename(componentPath) !== 'index.tsx' ||
    !COMPONENT_TYPES.includes(componentType)
  ) {
    return;
  }

  console.log(`Processing component: ${componentType}/${componentName}`);

  // Read component file
  const content = fs.readFileSync(componentPath, 'utf-8');

  // Transform the content
  const transformedContent = transformReact19(content);

  // Extract metadata
  const metadata = extractMetadata(componentPath, content);

  // Create output directory
  const outputDir = path.join(OUTPUT_PATH, componentType, componentName);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write transformed component
  fs.writeFileSync(path.join(outputDir, 'index.tsx'), transformedContent);

  // Copy associated files
  const files = fs.readdirSync(componentDir);
  for (const file of files) {
    if (file === 'index.tsx') continue; // Skip the main file which we've already processed

    const sourcePath = path.join(componentDir, file);
    const destPath = path.join(outputDir, file);

    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, destPath);
    }
  }

  // Write metadata
  fs.writeFileSync(
    path.join(outputDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
}

// Main function
async function extractComponents() {
  ensureDirectories();

  try {
    // Find all component index files
    const componentPaths = await glob(
      `${CORE_PACKAGE_PATH}/src/components/**/**/index.tsx`
    );

    // Process each component
    for (const componentPath of componentPaths) {
      await processComponent(componentPath);
    }

    console.log('Component extraction completed successfully!');
  } catch (error) {
    console.error('Error extracting components:', error);
    process.exit(1);
  }
}

extractComponents();
