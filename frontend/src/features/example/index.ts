/**
 * Public API Entry Point for the Example Feature Module.
 * Strictly shields internal queries, stores, and schemas from external scope leakages.
 */

// Export the primary Orchestrator Container View Component
export { ExampleManager } from './components/example-manager';

// Export type-safe schema descriptors for external routing reference if necessary
export type { ExampleItem } from './types';
