import { defineConfig } from 'tsup';
import fs from 'fs-extra';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  outDir: 'dist',
  target: 'node18',

  // Handle templates and registry during build
  async onSuccess() {
    // Copy templates directory to output
    const srcTemplates = path.join(__dirname, 'src', 'templates');
    const distTemplates = path.join(__dirname, 'dist', 'templates');

    // Check if src/templates exists
    if (fs.existsSync(srcTemplates)) {
      console.log('Copying templates to dist/templates');
      await fs.copy(srcTemplates, distTemplates);
    } else {
      console.warn('No templates directory found at src/templates');
    }

    // Copy registry.json to root of dist
    const srcRegistry = path.join(__dirname, 'src', 'utils', 'registry.json');
    const distRegistry = path.join(__dirname, 'dist', 'registry.json');

    if (fs.existsSync(srcRegistry)) {
      console.log('Copying registry.json to dist/');
      await fs.copy(srcRegistry, distRegistry);
    } else {
      console.warn('No registry.json found at src/utils/registry.json');
    }

    console.log('Build post-processing completed');
  },
});
