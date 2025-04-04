// src/utils/paths.ts
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * Get the root directory of the CLI package
 */
export function getPackageRoot(): string {
  // In ESM context
  if (typeof __filename === 'undefined') {
    const moduleURL = new URL(import.meta.url);
    const modulePath = fileURLToPath(moduleURL);
    return path.dirname(path.dirname(modulePath));
  }

  // In CommonJS context
  return path.dirname(path.dirname(__dirname));
}

/**
 * Get the path to the templates directory
 */
export function getTemplatesPath(): string {
  const packageRoot = getPackageRoot();

  // Check for production path first (in dist/)
  const prodPath = path.join(packageRoot, 'templates');
  if (fs.existsSync(prodPath)) {
    return prodPath;
  }

  // Fall back to development path (in src/)
  return path.join(packageRoot, 'src', 'templates');
}

/**
 * Get the path to the components templates
 */
export function getComponentsPath(): string {
  return path.join(getTemplatesPath(), 'components');
}

/**
 * Get the path to a specific component type directory
 */
export function getComponentTypePath(type: string): string {
  return path.join(getComponentsPath(), type);
}

/**
 * Get the path to a specific component
 */
export function getComponentPath(type: string, name: string): string {
  return path.join(getComponentTypePath(type), name);
}

/**
 * Get the path to the registry file
 */
export function getRegistryPath(): string {
  const packageRoot = getPackageRoot();

  // Check for production path first (in dist/)
  const prodPath = path.join(packageRoot, 'registry.json');
  if (fs.existsSync(prodPath)) {
    return prodPath;
  }

  // Fall back to development path
  return path.join(packageRoot, 'src', 'utils', 'registry.json');
}

/**
 * Get the path to the core package in development
 * This is only used during development/build, not in production
 */
export function getCorePath(): string {
  const packageRoot = getPackageRoot();

  // Try to locate core package based on monorepo structure
  const possiblePaths = [
    // If we're in packages/cli
    path.join(packageRoot, '..', 'core'),
    // If we're in a different structure
    path.join(packageRoot, '..', '..', 'packages', 'core'),
  ];

  for (const corePath of possiblePaths) {
    if (fs.existsSync(corePath)) {
      return corePath;
    }
  }

  throw new Error(
    'Could not locate core package. Please specify CORE_PATH environment variable.'
  );
}
