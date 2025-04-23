import { ComponentMetadata } from './components';

/**
 * Represents a node in the dependency graph
 */
export interface DependencyNode {
  key: string;
  metadata: ComponentMetadata;
  dependencies: Set<string>;
}

/**
 * Results of a dependency resolution operation
 */
export interface DependencyResolutionResult {
  componentDependencies: string[];
  packageDependencies: PackageDependency[];
}

/**
 * Options for generating a dependency tree visualization
 */
export interface DependencyTreeOptions {
  includeMetadata?: boolean;
  maxDepth?: number;
  format?: 'text' | 'json' | 'tree';
  showCircular?: boolean;
}

/**
 * Represents a package dependency
 */
export interface PackageDependency {
  name: string;
  version?: string;
  isDev: boolean;
  isPeer: boolean;
}

/**
 * Complete dependency information for a component
 */
export interface ComponentDependencyInfo {
  component: ComponentMetadata;
  componentDependencies: string[];
  packageDependencies: PackageDependency[];
}
