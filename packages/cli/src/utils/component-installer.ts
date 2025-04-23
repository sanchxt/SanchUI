import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';
import { getComponentPath } from './paths';
import { ComponentMetadata } from '../../types/components';
import { PackageDependency } from '../../types/dependencies';

/**
 * Options for component installation
 */
export interface InstallOptions {
  directory: string;
  force: boolean;
  dryRun: boolean;
  skipDependencies: boolean;
  installPackages: boolean;
}

/**
 * Installs a component into the user's project
 */
export async function installComponent(
  componentKey: string,
  metadata: ComponentMetadata,
  targetDir: string,
  options: InstallOptions
): Promise<boolean> {
  const [type, name] = componentKey.split('/');
  const componentPath = getComponentPath(type, name);
  const targetPath = path.join(process.cwd(), targetDir, type, name);

  // check: component directory exists
  if (!fs.existsSync(componentPath)) {
    throw new Error(`Component template not found: ${componentKey}`);
  }

  // check: target directory already exists
  if (fs.existsSync(targetPath) && !options.force) {
    console.log(
      chalk.yellow(
        `Component ${chalk.bold(componentKey)} already exists in ${targetPath}`
      )
    );
    console.log(chalk.gray('Use --force to overwrite'));
    return false;
  }

  if (options.dryRun) {
    console.log(
      chalk.blue(`Would install ${chalk.bold(componentKey)} to ${targetPath}`)
    );
    return true;
  }

  // create target directory
  fs.ensureDirSync(targetPath);

  // copy component files
  await fs.copy(componentPath, targetPath, {
    overwrite: options.force,
    filter: (src) => !path.basename(src).includes('metadata.json'),
  });

  console.log(
    chalk.green(`Installed ${chalk.bold(componentKey)} to ${targetPath}`)
  );
  return true;
}

/**
 * install package dependencies for components
 */
export async function installPackageDependencies(
  dependencies: PackageDependency[],
  options: InstallOptions
): Promise<boolean> {
  if (dependencies.length === 0) {
    return true;
  }

  const packageNames = dependencies.map((dep) => dep.name);

  // check if using npm, yarn, or pnpm
  let packageManager = 'npm';
  if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) {
    packageManager = 'yarn';
  } else if (fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))) {
    packageManager = 'pnpm';
  }

  if (options.dryRun) {
    console.log(
      chalk.blue(
        `Would install package dependencies: ${packageNames.join(', ')}`
      )
    );
    return true;
  }

  const spinner = ora('Installing package dependencies...').start();

  try {
    // dfetermine install command based on package manager
    let installCmd: string;
    let installArgs: string[];

    if (packageManager === 'yarn') {
      installCmd = 'yarn';
      installArgs = ['add', ...packageNames];
    } else if (packageManager === 'pnpm') {
      installCmd = 'pnpm';
      installArgs = ['add', ...packageNames];
    } else {
      installCmd = 'npm';
      installArgs = ['install', ...packageNames];
    }

    // execute install command
    await execa(installCmd, installArgs);

    spinner.succeed(`Installed dependencies: ${packageNames.join(', ')}`);
    return true;
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    console.error(
      chalk.red('Error:'),
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}
