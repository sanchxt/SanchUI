import chalk from 'chalk';
import { ComponentMetadata, ComponentRegistry } from '../../types/components';

/**
 * Represents a graph of component dependencies
 */
export class DependencyGraph {
  private graph: Map<string, Set<string>> = new Map();
  private components: Map<string, ComponentMetadata> = new Map();

  /**
   * Add a component to the dependency graph
   */
  addComponent(component: ComponentMetadata): void {
    const componentKey = `${component.type}/${component.name}`.toLowerCase();

    // Add component to the components map
    this.components.set(componentKey, component);

    // Initialize adjacency list if not exists
    if (!this.graph.has(componentKey)) {
      this.graph.set(componentKey, new Set<string>());
    }
  }

  /**
   * Add a dependency relationship between components
   */
  addDependency(from: string, to: string): void {
    // Ensure both components exist in the graph
    if (!this.graph.has(from)) {
      this.graph.set(from, new Set<string>());
    }

    if (!this.graph.has(to)) {
      this.graph.set(to, new Set<string>());
    }

    // Add the dependency
    this.graph.get(from)!.add(to);
  }

  /**
   * Get all dependencies for a component (including transitive dependencies)
   */
  getAllDependencies(componentKey: string): Set<string> {
    const visited = new Set<string>();
    this.dfs(componentKey, visited);

    // Remove the component itself from dependencies
    visited.delete(componentKey);

    return visited;
  }

  /**
   * Depth-first search to find all dependencies
   */
  private dfs(componentKey: string, visited: Set<string>): void {
    // Mark the current node as visited
    visited.add(componentKey);

    // Visit all adjacent nodes
    const dependencies = this.graph.get(componentKey) || new Set<string>();
    for (const dependency of dependencies) {
      if (!visited.has(dependency)) {
        this.dfs(dependency, visited);
      }
    }
  }

  /**
   * Get installation order for components (topological sort)
   */
  getInstallationOrder(components: string[]): string[] {
    const result: string[] = [];
    const visited = new Set<string>();
    const temp = new Set<string>();

    // Define recursive DFS function for topological sort
    const visit = (componentKey: string): void => {
      // If node is in temp, we have a cycle
      if (temp.has(componentKey)) {
        throw new Error(
          `Circular dependency detected involving ${componentKey}`
        );
      }

      // If node is already visited, skip
      if (visited.has(componentKey)) {
        return;
      }

      // Mark node as temporarily visited
      temp.add(componentKey);

      // Visit all dependencies
      const dependencies = this.graph.get(componentKey) || new Set<string>();
      for (const dependency of dependencies) {
        visit(dependency);
      }

      // Mark node as visited
      visited.add(componentKey);
      temp.delete(componentKey);

      // Add to result
      result.push(componentKey);
    };

    // Visit all requested components
    for (const component of components) {
      if (!visited.has(component)) {
        visit(component);
      }
    }

    // Reverse to get correct installation order (dependencies first)
    return result.reverse();
  }

  /**
   * Check if the dependency graph has cycles
   */
  hasCycles(): { hasCycle: boolean; cycles: string[][] } {
    const visited = new Set<string>();
    const recStack = new Set<string>();
    const cycles: string[][] = [];
    const path: string[] = [];

    const findCycle = (node: string): boolean => {
      // Mark current node as visited and add to recursion stack and path
      if (!visited.has(node)) {
        visited.add(node);
        recStack.add(node);
        path.push(node);

        // Visit all adjacent nodes
        const neighbors = this.graph.get(node) || new Set<string>();
        for (const neighbor of neighbors) {
          // If not visited, recursively check
          if (!visited.has(neighbor)) {
            if (findCycle(neighbor)) {
              return true;
            }
          }
          // If already in recursion stack, cycle found
          else if (recStack.has(neighbor)) {
            // Extract the cycle
            const cycleStart = path.indexOf(neighbor);
            const cycle = path.slice(cycleStart);
            cycle.push(neighbor); // Close the cycle
            cycles.push(cycle);
            return true;
          }
        }

        // Remove from path and recursion stack
        path.pop();
        recStack.delete(node);
      }

      return false;
    };

    // Check each node
    for (const node of this.graph.keys()) {
      visited.clear();
      recStack.clear();
      path.length = 0;

      if (findCycle(node)) {
        return { hasCycle: true, cycles };
      }
    }

    return { hasCycle: false, cycles: [] };
  }

  /**
   * Generate a visual representation of the dependency tree
   * @param rootComponent The root component to start visualization from
   * @param indent Indentation string for nested levels
   * @param visited Set of visited nodes to prevent infinite recursion
   */
  generateDependencyTree(
    rootComponent: string,
    indent = '',
    visited = new Set<string>()
  ): string {
    if (visited.has(rootComponent)) {
      return `${indent}${chalk.yellow('↺')} ${chalk.red(rootComponent)} ${chalk.gray('(circular reference)')}\n`;
    }

    visited.add(rootComponent);

    let result = `${indent}${chalk.cyan(rootComponent)}\n`;

    const dependencies = this.graph.get(rootComponent) || new Set<string>();
    const sortedDeps = Array.from(dependencies).sort();

    for (const dependency of sortedDeps) {
      result += this.generateDependencyTree(
        dependency,
        `${indent}  ${chalk.gray('├─')} `,
        new Set(visited)
      );
    }

    return result;
  }

  /**
   * Get metadata for a component
   */
  getComponentMetadata(componentKey: string): ComponentMetadata | undefined {
    return this.components.get(componentKey);
  }

  /**
   * Get all components in the graph
   */
  getAllComponents(): Map<string, ComponentMetadata> {
    return this.components;
  }

  /**
   * Get direct dependencies for a component
   */
  getDirectDependencies(componentKey: string): Set<string> {
    return this.graph.get(componentKey) || new Set<string>();
  }
}

/**
 * Analyze component code to extract component dependencies
 * This is a basic implementation that could be enhanced with AST parsing
 */
export function extractComponentDependencies(
  component: ComponentMetadata,
  allComponents: Record<string, ComponentMetadata>
): string[] {
  const dependencies: string[] = [];

  // In a real implementation, you would:
  // 1. Parse the component file to get imports
  // 2. Check if imports reference other components in the library
  // 3. Return the component keys for those dependencies

  // For now, we'll use a simplified heuristic:
  // If component A's file contains an import or JSX reference to component B,
  // we consider it a dependency

  return dependencies;
}

/**
 * Build a dependency graph from component metadata
 */
export function buildDependencyGraph(
  components: Record<string, ComponentMetadata>
): DependencyGraph {
  const graph = new DependencyGraph();

  // First, add all components to the graph
  for (const key in components) {
    graph.addComponent(components[key]);
  }

  // Then, process dependencies
  // For now, this is a placeholder where we would analyze component code
  // to extract dependencies

  // This could be enhanced in future to parse component code and
  // automatically detect dependencies

  return graph;
}

/**
 * Resolve all dependencies for a set of components
 */
export function resolveDependencies(
  componentKeys: string[],
  registry: Record<string, ComponentMetadata>
): {
  installOrder: string[];
  allDependencies: Set<string>;
  graph: DependencyGraph;
} {
  // Build dependency graph
  const graph = buildDependencyGraph(registry);

  // Get all dependencies for requested components
  const allDependencies = new Set<string>();
  for (const key of componentKeys) {
    // Add the component itself
    allDependencies.add(key);

    // Add all its dependencies
    const dependencies = graph.getAllDependencies(key);
    for (const dep of dependencies) {
      allDependencies.add(dep);
    }
  }

  // Get installation order
  const installOrder = graph.getInstallationOrder(Array.from(allDependencies));

  return {
    installOrder,
    allDependencies,
    graph,
  };
}

/**
 * Detect component dependencies by parsing component files
 * This function will scan the component file for imports and JSX usage
 * of other components in the library
 */
export async function detectComponentDependencies(
  componentKey: string,
  registry: ComponentRegistry,
  componentsDir: string
): Promise<string[]> {
  // This would be implemented to:
  // 1. Read the component file
  // 2. Parse imports and JSX usage
  // 3. Match against known components
  // 4. Return dependency keys

  // This is a placeholder for future implementation
  return [];
}

/**
 * Parse an import statement to extract imported component names
 */
function parseImports(importStatement: string): string[] {
  // This would use a proper parser to extract imported names
  // For now, it's a placeholder
  return [];
}

/**
 * Generate a visual representation of dependencies for CLI output
 */
export function formatDependencyTree(
  graph: DependencyGraph,
  componentKeys: string[]
): string {
  let output = chalk.bold('Dependency Tree:\n');

  for (const key of componentKeys) {
    output += `\n${chalk.green('Component:')} ${chalk.bold(key)}\n`;
    output += graph.generateDependencyTree(key);
  }

  return output;
}
