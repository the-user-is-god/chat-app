/**
 * Centralized client-side route paths.
 * Prevents hardcoded URL strings throughout the codebase and ensures clean refactoring.
 * Do not include business logic or API endpoints here.
 */
export const ROUTES = {
  // Public/Marketing Routes
  home: '/',
  about: '/about',

  // Authentication Module
  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },

  // Protected Application Dashboard Layouts
  dashboard: {
    home: '/dashboard',
    profile: '/dashboard/profile',
    settings: '/dashboard/settings',
    billing: '/dashboard/billing',
  },
} as const;

// Type definition for route autocompletion and type-safety
export type AppRoutes = typeof ROUTES;
