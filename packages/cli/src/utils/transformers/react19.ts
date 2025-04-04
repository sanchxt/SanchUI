import * as ts from 'typescript';

/**
 * Transforms React component code to be compatible with React 19 patterns
 * - Converts forwardRef to use ref as a prop
 * - Updates type definitions to include ref prop
 * - Adjusts import statements
 */
export function transformReact19Code(code: string, fileName: string): string {
  // Create a source file
  const sourceFile = ts.createSourceFile(
    fileName,
    code,
    ts.ScriptTarget.Latest,
    true
  );

  // Create a transformer factory
  const transformerFactory: ts.TransformerFactory<ts.SourceFile> = (
    context
  ) => {
    return (sourceFile) => {
      const visitor = (node: ts.Node): ts.Node => {
        // Handle forwardRef calls
        if (
          ts.isCallExpression(node) &&
          (node.expression.getText() === 'forwardRef' ||
            node.expression.getText() === 'React.forwardRef')
        ) {
          // Extract the function component inside forwardRef
          if (
            node.arguments.length > 0 &&
            ts.isArrowFunction(node.arguments[0])
          ) {
            const arrowFunc = node.arguments[0] as ts.ArrowFunction;

            // If the arrow function has exactly two parameters (props, ref)
            if (arrowFunc.parameters.length === 2) {
              const propsParam = arrowFunc.parameters[0];

              // Create a new function that uses only the props parameter
              // (React 19 will access ref via props)
              return ts.factory.createArrowFunction(
                arrowFunc.modifiers,
                arrowFunc.typeParameters,
                [propsParam], // Only include the props parameter
                arrowFunc.type,
                arrowFunc.equalsGreaterThanToken,
                // Make sure we only modify the body if it's valid
                ts.isBlock(arrowFunc.body)
                  ? (ts.visitNode(arrowFunc.body, visitor) as ts.Block)
                  : arrowFunc.body
              );
            }
          }
        }

        // Handle interface declarations for component props
        if (
          ts.isInterfaceDeclaration(node) &&
          node.name.text.endsWith('Props')
        ) {
          // Check if interface already has a ref property
          const hasRefProp = node.members.some(
            (member) =>
              ts.isPropertySignature(member) &&
              member.name.getText(sourceFile) === 'ref'
          );

          if (!hasRefProp) {
            // Create a ref property - fix the modifier issue
            const refProperty = ts.factory.createPropertySignature(
              undefined, // No modifiers, we'll use the question token directly
              'ref',
              ts.factory.createToken(ts.SyntaxKind.QuestionToken),
              ts.factory.createTypeReferenceNode('React.RefObject', [
                ts.factory.createTypeReferenceNode('HTMLElement', []),
              ])
            );

            // Add the ref property to the interface
            return ts.factory.createInterfaceDeclaration(
              node.modifiers,
              node.name,
              node.typeParameters,
              node.heritageClauses,
              [...node.members, refProperty]
            );
          }
        }

        return ts.visitEachChild(node, visitor, context);
      };

      return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
    };
  };

  // Create a printer to generate the transformed code
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  // Transform the source file
  const result = ts.transform(sourceFile, [transformerFactory]);
  const transformedSourceFile = result.transformed[0];

  // Print the transformed code
  const transformedCode = printer.printFile(transformedSourceFile);
  result.dispose();

  return transformedCode;
}

/**
 * Simple version of the transformer using regex
 * Note: This is a fallback and the TypeScript AST version should be preferred
 */
export function transformReact19WithRegex(content: string): string {
  // Handle forwardRef patterns
  let transformed = content;

  // Replace React.forwardRef pattern
  transformed = transformed.replace(
    /React\.forwardRef<([^>]+)>\s*\(\s*\(\s*({[^}]+})\s*,\s*ref\s*\)\s*=>\s*{/g,
    'function($2) {'
  );

  // Replace forwardRef pattern
  transformed = transformed.replace(
    /forwardRef<([^>]+)>\s*\(\s*\(\s*({[^}]+})\s*,\s*ref\s*\)\s*=>\s*{/g,
    'function($2) {'
  );

  // Replace ref usage in components
  transformed = transformed.replace(/ref\.current/g, 'props.ref?.current');

  // Add ref to interfaces/types
  const interfaceRegex = /interface\s+(\w+Props)\s+{([^}]*)}/g;
  transformed = transformed.replace(interfaceRegex, (match, name, content) => {
    if (!content.includes('ref?:')) {
      return `interface ${name} {${content}\n  ref?: React.RefObject<HTMLElement>;\n}`;
    }
    return match;
  });

  // Remove forwardRef imports
  transformed = transformed.replace(
    /import\s*{\s*([^}]*?)forwardRef([^}]*?)}\s*from\s*['"]react['"];?/g,
    (match, before, after) => {
      const imports = `${before}${after}`.trim();
      if (imports) {
        return `import { ${imports} } from 'react';`;
      }
      return '';
    }
  );

  return transformed;
}
