import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';
import { transformReact19Code } from '../src/utils/transformers/react19';
import { extractComponentMetadata } from '../src/utils/metadata-extractor';
import {
  getCorePath,
  getComponentsPath,
  getRegistryPath,
} from '../src/utils/paths';

// Component types to process
const COMPONENT_TYPES = ['atoms', 'molecules', 'organisms'];

// Allow overriding core path with environment variable
const CORE_PACKAGE_PATH = process.env.CORE_PATH || getCorePath();
const OUTPUT_PATH = getComponentsPath();
const REGISTRY_OUTPUT_PATH = getRegistryPath();

// Define component metadata type inline to avoid import issues
interface ComponentMetadata {
  name: string;
  type: string;
  description: string;
  dependencies: string[];
  exports: string[];
  props: any[];
  hasTests: boolean;
  hasReadme: boolean;
}

interface ComponentRegistry {
  components: Record<string, ComponentMetadata>;
  version: string;
  lastUpdated: string;
}

/**
 * Ensures all necessary directories exist
 */
function ensureDirectories() {
  // Create base components directory
  fs.ensureDirSync(OUTPUT_PATH);

  // Create type-specific directories
  for (const type of COMPONENT_TYPES) {
    const typePath = path.join(OUTPUT_PATH, type);
    fs.ensureDirSync(typePath);
  }

  // Ensure registry directory exists
  fs.ensureDirSync(path.dirname(REGISTRY_OUTPUT_PATH));
}

/**
 * Process a single component
 */
async function processComponent(
  componentPath: string
): Promise<ComponentMetadata | null> {
  const componentDir = path.dirname(componentPath);
  const componentName = path.basename(componentDir);
  const componentType = path.basename(path.dirname(componentDir)); // atoms, molecules, etc.

  // Only process if it's an index.tsx file in a component directory
  if (
    path.basename(componentPath) !== 'index.tsx' ||
    !COMPONENT_TYPES.includes(componentType)
  ) {
    return null;
  }

  console.log(`Processing component: ${componentType}/${componentName}`);

  // Read component file
  const content = fs.readFileSync(componentPath, 'utf-8');

  // Extract metadata
  const metadata = extractComponentMetadata(componentPath, componentType);

  // Transform the content for React 19
  const transformedContent = transformReact19Code(content, componentPath);

  // Create output directory
  const outputDir = path.join(OUTPUT_PATH, componentType, componentName);
  fs.ensureDirSync(outputDir);

  // Write transformed component
  fs.writeFileSync(path.join(outputDir, 'index.tsx'), transformedContent);

  // Copy associated files
  const files = fs.readdirSync(componentDir);
  for (const file of files) {
    if (file === 'index.tsx') continue; // Skip the main file which we've already processed

    const sourcePath = path.join(componentDir, file);
    const destPath = path.join(outputDir, file);

    if (fs.statSync(sourcePath).isFile()) {
      // Transform test files if needed
      if (file.endsWith('.test.tsx') || file.endsWith('.test.ts')) {
        const testContent = fs.readFileSync(sourcePath, 'utf-8');
        const transformedTest = transformReact19Code(testContent, sourcePath);
        fs.writeFileSync(destPath, transformedTest);
      } else {
        // Just copy other files
        fs.copyFileSync(sourcePath, destPath);
      }
    }
  }

  // Write metadata
  fs.writeFileSync(
    path.join(outputDir, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  return metadata;
}

/**
 * Generate component registry
 */
function generateRegistry(components: ComponentMetadata[]) {
  console.log('Generating component registry...');

  // Create registry object
  const registry: ComponentRegistry = {
    components: {},
    version: process.env.npm_package_version || '0.1.0',
    lastUpdated: new Date().toISOString(),
  };

  // Add components to registry
  for (const metadata of components) {
    const componentKey = `${metadata.type}/${metadata.name}`.toLowerCase();
    registry.components[componentKey] = metadata;
  }

  // Write registry file
  fs.writeFileSync(REGISTRY_OUTPUT_PATH, JSON.stringify(registry, null, 2));

  console.log(
    `Registry generated with ${Object.keys(registry.components).length} components!`
  );
}

/**
 * Main build function
 */
async function buildTemplates() {
  console.log('Starting component template extraction...');
  console.log(`Core package path: ${CORE_PACKAGE_PATH}`);
  console.log(`Output path: ${OUTPUT_PATH}`);

  ensureDirectories();

  try {
    // Find all component index files
    const componentPaths = await glob(
      `${CORE_PACKAGE_PATH}/src/components/**/**/index.tsx`
    );

    if (componentPaths.length === 0) {
      console.warn(
        `No components found in ${CORE_PACKAGE_PATH}/src/components`
      );
      return;
    }

    console.log(`Found ${componentPaths.length} component files`);

    // Process each component and collect metadata
    const componentMetadata: ComponentMetadata[] = [];

    for (const componentPath of componentPaths) {
      const metadata = await processComponent(componentPath);
      if (metadata) {
        componentMetadata.push(metadata);
      }
    }

    // Generate registry
    generateRegistry(componentMetadata);

    console.log('Component template extraction completed successfully!');
  } catch (error) {
    console.error('Error extracting components:', error);
    process.exit(1);
  }
}

// Run the build process
buildTemplates();
