import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { getRegistryPath } from '../utils/paths';
import { ComponentMetadata, ComponentRegistry } from '../../types/components';
import {
  DependencyGraph,
  resolveDependencies,
  formatDependencyTree,
} from '../utils/dependency-resolver';
import {
  buildFullDependencyGraph,
  detectComponentDependencies,
} from '../utils/dependency-detector';
import {
  installComponent,
  installPackageDependencies,
  InstallOptions,
} from '../utils/component-installer';
import {
  loadProjectConfig,
  saveProjectConfig,
  updateInstalledComponents,
  detectPackageManager,
  detectFramework,
  findTailwindConfig,
} from '../utils/project-config';

export interface AddCommandOptions {
  directory: string;
  force: boolean;
  dryRun: boolean;
  showDependencies: boolean;
  skipDependencies: boolean;
  installPackages?: boolean;
}

/**
 * Normalizes component names to match registry keys
 */
function normalizeComponentKey(
  componentName: string,
  registry: Record<string, ComponentMetadata>
): string {
  // if it includes a /, assume it's already normalized
  if (componentName.includes('/')) {
    return componentName.toLowerCase();
  }

  // search for component by name
  const matchingKey = Object.keys(registry).find((key) => {
    const parts = key.split('/');
    return (
      parts[parts.length - 1].toLowerCase() === componentName.toLowerCase()
    );
  });

  if (!matchingKey) {
    throw new Error(`Component "${componentName}" not found in registry`);
  }

  return matchingKey;
}

/**
 * Handles the add command
 */
export async function handleAddCommand(
  components: string[],
  options: AddCommandOptions
): Promise<void> {
  const spinner = ora('Analyzing components...').start();

  try {
    // load registry
    const registryPath = getRegistryPath();
    if (!fs.existsSync(registryPath)) {
      spinner.fail('Component registry not found');
      throw new Error(
        'Component registry not found. Run build:templates first.'
      );
    }

    const registry = JSON.parse(
      await fs.readFile(registryPath, 'utf-8')
    ) as ComponentRegistry;

    // normalize component keys
    const componentKeys = components.map((comp) =>
      normalizeComponentKey(comp, registry.components)
    );

    spinner.text = 'Building dependency graph...';

    // build full dependency graph
    const dependencyGraph = await buildFullDependencyGraph(registry.components);

    // create and populate the graph
    const graph = new DependencyGraph();

    // add all components to the graph
    for (const key in registry.components) {
      graph.addComponent(registry.components[key]);
    }

    // add dependencies
    for (const [component, dependencies] of dependencyGraph.entries()) {
      for (const dependency of dependencies) {
        graph.addDependency(component, dependency);
      }
    }

    // check for cycles
    const cycleCheck = graph.hasCycles();
    if (cycleCheck.hasCycle) {
      spinner.warn('Circular dependencies detected in the component library');
      console.log(chalk.yellow('Circular Dependencies:'));
      cycleCheck.cycles.forEach((cycle, index) => {
        console.log(`  ${index + 1}. ${cycle.join(' → ')} → ${cycle[0]}`);
      });

      // ask user if they want to continue
      if (!options.dryRun) {
        const { shouldContinue } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'shouldContinue',
            message: 'Circular dependencies detected. Continue anyway?',
            default: false,
          },
        ]);

        if (!shouldContinue) {
          throw new Error(
            'Installation cancelled due to circular dependencies'
          );
        }
      }
    }

    // resolve dependencies for the requested components
    spinner.text = 'Resolving dependencies...';

    let installOrder: string[];
    let allDependencies: Set<string>;

    if (options.skipDependencies) {
      // only install the requested components, no dependencies
      installOrder = componentKeys;
      allDependencies = new Set(componentKeys);
    } else {
      // resolve all dependencies
      const resolution = resolveDependencies(
        componentKeys,
        registry.components
      );
      installOrder = resolution.installOrder;
      allDependencies = resolution.allDependencies;
    }

    spinner.succeed('Component analysis complete');

    // display dependency information
    if (options.showDependencies) {
      console.log(formatDependencyTree(graph, componentKeys));
    }

    // display installation order
    console.log(chalk.blue('\nInstallation Order:'));
    installOrder.forEach((comp, index) => {
      let label = comp;
      if (!componentKeys.includes(comp)) {
        label = `${comp} ${chalk.gray('(dependency)')}`;
      }
      console.log(`${index + 1}. ${chalk.cyan(label)}`);
    });

    if (options.dryRun) {
      console.log(chalk.yellow('\nDry run completed. No files were changed.'));
      return;
    }

    // determine if we should install package dependencies
    const installPackagesOption =
      options.installPackages !== undefined ? options.installPackages : true; // default to true if not specified

    // create options for installation
    const installOptions: InstallOptions = {
      directory: options.directory,
      force: options.force,
      dryRun: options.dryRun,
      skipDependencies: options.skipDependencies,
      installPackages: installPackagesOption,
    };

    // collect all external package dependencies
    const allPackageDependencies = new Set<string>();

    // install components in the correct order
    let successfulInstalls: string[] = [];
    for (const componentKey of installOrder) {
      const metadata = registry.components[componentKey];

      // install the component
      const installed = await installComponent(
        componentKey,
        metadata,
        options.directory,
        installOptions
      );

      if (installed) {
        successfulInstalls.push(componentKey);
      }

      // collect package dependencies
      if (installPackagesOption) {
        const { packageDependencies } = await detectComponentDependencies(
          componentKey,
          registry.components
        );

        for (const dep of packageDependencies) {
          allPackageDependencies.add(dep.name);
        }
      }
    }

    // install package dependencies if needed
    if (installPackagesOption && allPackageDependencies.size > 0) {
      const packageDeps = Array.from(allPackageDependencies).map((name) => ({
        name,
        isDev: false,
        isPeer: false,
      }));
      await installPackageDependencies(packageDeps, installOptions);
    }

    // update project configuration
    if (successfulInstalls.length > 0 && !options.dryRun) {
      try {
        // load or create project config
        const config = await loadProjectConfig();

        // update with detected values if not already set
        if (!config.packageManager) {
          config.packageManager = detectPackageManager();
        }

        if (!config.frameworkDetected) {
          config.frameworkDetected = detectFramework();
        }

        if (!config.tailwindConfigLocation) {
          config.tailwindConfigLocation = findTailwindConfig();
        }

        // update components directory
        config.componentsDirectory = options.directory;

        // save config
        await saveProjectConfig(config);

        // update installed components list
        await updateInstalledComponents(successfulInstalls, 'add');

        console.log(chalk.gray('Project configuration updated'));
      } catch (error) {
        console.warn(
          chalk.yellow('Could not update project configuration'),
          error
        );
      }
    }

    console.log(chalk.green('\nInstallation complete!'));
  } catch (error) {
    spinner.fail('Error during component installation');
    console.error(
      chalk.red('Error:'),
      error instanceof Error ? error.message : String(error)
    );
    throw error;
  }
}
