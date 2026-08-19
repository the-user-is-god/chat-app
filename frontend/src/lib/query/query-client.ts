import { QueryClient } from '@tanstack/react-query';

/**
 * Enterprise core configuration for TanStack Query behavior.
 * Defines explicit rules for cache lifetime, garbage collection, and retry boundaries.
 */
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Garbage collect unused cache entries after 30 minutes
      refetchOnWindowFocus: false, // Disable unpredictable refetches when switching browser tabs
      refetchOnReconnect: true, // Automatically refresh broken connections once network restores
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      retry: (failureCount: number, error: any) => {
        // Do not retry if the backend explicitly tells us the user is unauthorized or input was bad
        if (error?.statusCode === 401 || error?.statusCode === 403 || error?.statusCode === 422) {
          return false;
        }
        return failureCount < 2; // Max out at 2 silent retries for genuine service blips
      },
    },
    mutations: {
      retry: false, // Never auto-retry mutations (POST/PUT/DELETE) to prevent duplicate side effects
    },
  },
};

/**
 * Factory function creating pristine QueryClient configurations.
 * Crucial for avoiding shared-state memory leaks across multi-user environments.
 */
export function createQueryClient() {
  return new QueryClient(queryClientConfig);
}
