/**
 * Unified entry gatekeeper for shared application view building blocks.
 */

export { PageHeader } from './common/page-header';
export { StatusDisplay } from './feedback/status-display';
export { PageContainer } from './layout/page-container';

// Append to src/components/index.ts
export { FormField } from './common/form-field';
export { FormError } from './common/form-error';

// Append or overwrite within src/components/index.ts
export { LoadingState } from './feedback/loading-state';
export { ErrorState } from './feedback/error-state';
export { EmptyState } from './feedback/empty-state';
