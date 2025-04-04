export type ComponentType = 'atom' | 'molecule' | 'organism';

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string;
}

export interface ComponentVariant {
  name: string;
  description: string;
}

export interface ComponentExample {
  name: string;
  code: string;
  description?: string;
}

export interface ComponentMetadata {
  name: string;
  type: ComponentType;
  description: string;
  dependencies: string[];
  peerDependencies?: string[];
  exports: string[];
  props: ComponentProp[];
  variants?: ComponentVariant[];
  examples?: ComponentExample[];
  hasTests: boolean;
  hasReadme: boolean;
  version?: string;
  author?: string;
  tags?: string[];
}

export interface ComponentRegistry {
  components: Record<string, ComponentMetadata>;
  version: string;
  lastUpdated: string;
}
