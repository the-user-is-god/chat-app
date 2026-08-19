/**
 * Standardized Query Key Factory.
 * Prevents magic strings inside cache invalidations across the boilerplate.
 */
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};
