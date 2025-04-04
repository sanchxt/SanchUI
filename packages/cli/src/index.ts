#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { getPackageRoot, getRegistryPath } from './utils/paths';

const program = new Command();

// Get package version dynamically
let version = '0.1.0';
try {
  const packagePath = path.join(getPackageRoot(), 'package.json');
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    version = packageJson.version;
  }
} catch (error) {
  console.warn('Could not determine package version, using default');
}

// Set up CLI
program
  .name('sanch')
  .description('CLI for installing Sanch UI components')
  .version(version);

// Add command
program
  .command('add <component...>')
  .description('Add components to your project')
  .option(
    '-d, --directory <directory>',
    'Directory to add component to',
    'components'
  )
  .option('-f, --force', 'Overwrite existing components', false)
  .action(async (components, options) => {
    console.log(chalk.blue('Adding components:'), components.join(', '));

    try {
      // Load registry
      const registryPath = getRegistryPath();
      if (!fs.existsSync(registryPath)) {
        console.error(
          chalk.red('Component registry not found. Run build:templates first.')
        );
        process.exit(1);
      }

      console.log(chalk.yellow('This feature is not yet implemented.'));
      console.log(chalk.gray(`Registry found at: ${registryPath}`));
      // This will be implemented in the Dependency Resolution phase
    } catch (error) {
      console.error(
        chalk.red('Error:'),
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  });

// Init command
program
  .command('init')
  .description('Initialize Sanch UI in your project')
  .option(
    '-d, --directory <directory>',
    'Base directory for components',
    'components'
  )
  .action(async (options) => {
    console.log(chalk.blue('Initializing Sanch UI in your project'));
    console.log(chalk.yellow('This feature is not yet implemented.'));
    // This will be implemented in the Core Functionality phase
  });

// List command
program
  .command('list')
  .description('List all available components')
  .option('-i, --installed', 'Show only installed components')
  .action(async (options) => {
    try {
      // Load registry
      const registryPath = getRegistryPath();

      if (!fs.existsSync(registryPath)) {
        console.error(
          chalk.red('Component registry not found. Run build:templates first.')
        );
        process.exit(1);
      }

      const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
      console.log(chalk.blue('Available components:'));
      console.log(
        chalk.gray(
          `Found ${Object.keys(registry.components).length} components`
        )
      );
      console.log(chalk.yellow('Full listing not yet implemented.'));
    } catch (error) {
      console.error(
        chalk.red('Error:'),
        error instanceof Error ? error.message : String(error)
      );
      process.exit(1);
    }
  });

// Remove command
program
  .command('remove <component...>')
  .description('Remove components from your project')
  .option('-f, --force', 'Force removal without confirmation', false)
  .action(async (components, options) => {
    console.log(chalk.blue('Removing components:'), components.join(', '));
    console.log(chalk.yellow('This feature is not yet implemented.'));
    // This will be implemented in the Core Functionality phase
  });

// Check command
program
  .command('check')
  .description('Check component health')
  .action(async () => {
    console.log(chalk.blue('Checking component health'));
    console.log(chalk.yellow('This feature is not yet implemented.'));
    // This will be implemented in the Enhanced Features phase
  });

// Update command
program
  .command('update [component...]')
  .description('Update components')
  .option('-a, --all', 'Update all components', false)
  .action(async (components, options) => {
    console.log(chalk.blue('Updating components'));
    console.log(chalk.yellow('This feature is not yet implemented.'));
    // This will be implemented in the Enhanced Features phase
  });

// Parse command line arguments
program.parse();

// If no arguments, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
