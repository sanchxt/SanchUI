import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

type ComponentType = 'atom' | 'molecule' | 'organism';

interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

interface ComponentMetadata {
  name: string;
  type: ComponentType;
  description: string;
  dependencies: string[];
  exports: string[];
  props: ComponentProp[];
  hasTests: boolean;
  hasReadme: boolean;
}

/**
 * Extracts metadata from a component file including:
 * - Description from JSDoc
 * - Prop types and descriptions
 * - Dependencies
 * - Exports
 */
export function extractComponentMetadata(
  filePath: string,
  componentType: string
): ComponentMetadata {
  const componentName = path.basename(path.dirname(filePath));
  const content = fs.readFileSync(filePath, 'utf-8');

  // Create source file
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  // Initialize metadata
  const metadata: ComponentMetadata = {
    name: componentName,
    type: componentType as ComponentType,
    description: '',
    dependencies: [],
    exports: [],
    props: [],
    hasTests: fs.existsSync(
      path.join(path.dirname(filePath), `${componentName}.test.tsx`)
    ),
    hasReadme: fs.existsSync(path.join(path.dirname(filePath), 'README.md')),
  };

  // Extract component description from JSDoc
  extractComponentDescription(sourceFile, metadata);

  // Extract props
  extractComponentProps(sourceFile, metadata);

  // Extract dependencies (imports)
  extractDependencies(sourceFile, metadata);

  // Extract exports
  extractExports(sourceFile, metadata);

  return metadata;
}

/**
 * Extract component description from JSDoc comments
 */
function extractComponentDescription(
  sourceFile: ts.SourceFile,
  metadata: ComponentMetadata
): void {
  // Find JSDoc comments in the file
  ts.forEachChild(sourceFile, (node) => {
    if (
      node.kind === ts.SyntaxKind.FunctionDeclaration ||
      node.kind === ts.SyntaxKind.VariableStatement
    ) {
      // Get the full text of the node
      const nodeText = node.getFullText(sourceFile);
      const commentRanges = ts.getLeadingCommentRanges(nodeText, 0);

      if (commentRanges && commentRanges.length > 0) {
        // Get the last comment before the node (likely the JSDoc)
        const commentRange = commentRanges[commentRanges.length - 1];
        const commentText = nodeText.substring(
          commentRange.pos,
          commentRange.end
        );

        // Parse the JSDoc comment
        const descriptionMatch = commentText.match(
          /\/\*\*\s*([\s\S]*?)(?:\s*@|\s*\*\/)/
        );
        if (descriptionMatch && descriptionMatch[1]) {
          metadata.description = descriptionMatch[1]
            .replace(/\n\s*\*/g, '\n')
            .trim();
        }
      }
    }
  });
}

/**
 * Extract component props from TypeScript interfaces and types
 */
function extractComponentProps(
  sourceFile: ts.SourceFile,
  metadata: ComponentMetadata
): void {
  // Look for interfaces that end with 'Props'
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text.endsWith('Props')) {
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member)) {
          const prop: ComponentProp = {
            name: member.name.getText(sourceFile),
            type: member.type ? member.type.getText(sourceFile) : 'any',
            required: !member.questionToken,
            description: '',
          };

          // Extract description from leading comments
          const nodeText = member.getFullText(sourceFile);
          const commentRanges = ts.getLeadingCommentRanges(nodeText, 0);

          if (commentRanges && commentRanges.length > 0) {
            const commentRange = commentRanges[commentRanges.length - 1];
            const commentText = nodeText.substring(
              commentRange.pos,
              commentRange.end
            );

            const descriptionMatch = commentText.match(
              /\/\*\*\s*([\s\S]*?)(?:\s*@|\s*\*\/)/
            );
            if (descriptionMatch && descriptionMatch[1]) {
              prop.description = descriptionMatch[1]
                .replace(/\n\s*\*/g, '\n')
                .trim();
            }
          }

          metadata.props.push(prop);
        }
      });
    }
  });
}

/**
 * Extract dependencies from import statements
 */
function extractDependencies(
  sourceFile: ts.SourceFile,
  metadata: ComponentMetadata
): void {
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isImportDeclaration(node)) {
      const moduleSpecifier = node.moduleSpecifier;

      if (ts.isStringLiteral(moduleSpecifier)) {
        const importPath = moduleSpecifier.text;

        // Only include external dependencies (not relative imports)
        if (!importPath.startsWith('.')) {
          metadata.dependencies.push(importPath);
        }
      }
    }
  });

  // Remove duplicates
  metadata.dependencies = [...new Set(metadata.dependencies)];
}

/**
 * Extract exported symbols
 */
function extractExports(
  sourceFile: ts.SourceFile,
  metadata: ComponentMetadata
): void {
  ts.forEachChild(sourceFile, (node) => {
    // Export declarations
    if (ts.isExportDeclaration(node) && node.exportClause) {
      if (ts.isNamedExports(node.exportClause)) {
        node.exportClause.elements.forEach((element) => {
          metadata.exports.push(element.name.text);
        });
      }
    }

    // Export assignments (default exports)
    if (ts.isExportAssignment(node)) {
      const exportText = node.expression.getText(sourceFile);
      metadata.exports.push(`default (${exportText})`);
    }

    // Variables, functions, classes, interfaces with export keyword
    if (
      (ts.isVariableStatement(node) ||
        ts.isFunctionDeclaration(node) ||
        ts.isClassDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node)) &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      if (ts.isVariableStatement(node)) {
        node.declarationList.declarations.forEach((declaration) => {
          if (declaration.name) {
            metadata.exports.push(declaration.name.getText(sourceFile));
          }
        });
      } else if (
        ts.isFunctionDeclaration(node) ||
        ts.isClassDeclaration(node) ||
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node)
      ) {
        if (node.name) {
          metadata.exports.push(node.name.text);
        }
      }
    }
  });

  // Remove duplicates
  metadata.exports = [...new Set(metadata.exports)];
}
