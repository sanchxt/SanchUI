import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Represents a project configuration
 */
export interface ProjectConfig {
  componentsDirectory: string;
  installedComponents: string[];
  packageManager: 'npm' | 'yarn' | 'pnpm';
  frameworkDetected: string | null;
  tailwindConfigLocation: string | null;
  lastUpdated: string;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: ProjectConfig = {
  componentsDirectory: 'components',
  installedComponents: [],
  packageManager: 'npm',
  frameworkDetected: null,
  tailwindConfigLocation: null,
  lastUpdated: new Date().toISOString(),
};

/**
 * Path to the configuration file
 */
const CONFIG_FILE = '.sanch-ui.json';

/**
 * Loads the project configuration
 */
export async function loadProjectConfig(): Promise<ProjectConfig> {
  const configPath = path.join(process.cwd(), CONFIG_FILE);

  if (!fs.existsSync(configPath)) {
    return DEFAULT_CONFIG;
  }

  try {
    const config = await fs.readJSON(configPath);
    return { ...DEFAULT_CONFIG, ...config };
  } catch (error) {
    console.warn('Error loading config file, using defaults');
    return DEFAULT_CONFIG;
  }
}

/**
 * Saves the project configuration
 */
export async function saveProjectConfig(config: ProjectConfig): Promise<void> {
  const configPath = path.join(process.cwd(), CONFIG_FILE);

  // Update last updated timestamp
  config.lastUpdated = new Date().toISOString();

  await fs.writeJSON(configPath, config, { spaces: 2 });
}

/**
 * Detects the package manager being used in the project
 */
export function detectPackageManager(): 'npm' | 'yarn' | 'pnpm' {
  if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) {
    return 'yarn';
  }

  if (fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  return 'npm';
}

/**
 * Updates the installed components list
 */
export async function updateInstalledComponents(
  components: string[],
  action: 'add' | 'remove'
): Promise<void> {
  const config = await loadProjectConfig();

  if (action === 'add') {
    // Add components if not already installed
    for (const component of components) {
      if (!config.installedComponents.includes(component)) {
        config.installedComponents.push(component);
      }
    }
  } else {
    // Remove components
    config.installedComponents = config.installedComponents.filter(
      (comp) => !components.includes(comp)
    );
  }

  await saveProjectConfig(config);
}

/**
 * Detects the framework being used (React, Next.js, etc.)
 */
export function detectFramework(): string | null {
  const packageJsonPath = path.join(process.cwd(), 'package.json');

  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  try {
    const packageJson = fs.readJSONSync(packageJsonPath);
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (dependencies.next) {
      return 'next.js';
    }

    if (dependencies.react) {
      return 'react';
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Finds the tailwind config file location
 */
export function findTailwindConfig(): string | null {
  const possibleLocations = [
    'tailwind.config.js',
    'tailwind.config.cjs',
    'tailwind.config.mjs',
    'tailwind.config.ts',
  ];

  for (const location of possibleLocations) {
    if (fs.existsSync(path.join(process.cwd(), location))) {
      return location;
    }
  }

  return null;
}
