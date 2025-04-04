import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';
import { ComponentMetadata, ComponentRegistry } from '../types/components';

// Configuration
const TEMPLATES_PATH = path.resolve(__dirname, '../src/templates/components');
const REGISTRY_OUTPUT_PATH = path.resolve(
  __dirname,
  '../src/utils/registry.json'
);

// Main function to generate the registry
async function generateRegistry() {
  console.log('Generating component registry...');

  try {
    // Find all metadata.json files
    const metadataFiles = await glob(`${TEMPLATES_PATH}/**/**/metadata.json`);

    // Create registry object
    const registry: ComponentRegistry = {
      components: {},
      version: process.env.npm_package_version || '0.1.0',
      lastUpdated: new Date().toISOString(),
    };

    // Process each metadata file
    for (const metadataFile of metadataFiles) {
      const metadata = JSON.parse(
        fs.readFileSync(metadataFile, 'utf-8')
      ) as ComponentMetadata;
      const componentKey = `${metadata.type}/${metadata.name}`.toLowerCase();

      registry.components[componentKey] = metadata;
    }

    // Ensure directory exists
    const registryDir = path.dirname(REGISTRY_OUTPUT_PATH);
    if (!fs.existsSync(registryDir)) {
      fs.mkdirSync(registryDir, { recursive: true });
    }

    // Write registry file
    fs.writeFileSync(REGISTRY_OUTPUT_PATH, JSON.stringify(registry, null, 2));

    console.log(
      `Registry generated with ${Object.keys(registry.components).length} components!`
    );
  } catch (error) {
    console.error('Error generating registry:', error);
    process.exit(1);
  }
}

// Generate the registry
generateRegistry();
