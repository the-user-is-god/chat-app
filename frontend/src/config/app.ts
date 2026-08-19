/**
 * Application-level static configuration.
 * Contains non-sensitive metadata and configuration used globally.
 * Do not include secrets, API endpoints, or runtime environment parsers here.
 */
export const APP_CONFIG = {
  name: 'Enterprise Boilerplate',
  description:
    'A highly scalable, feature-driven production boilerplate with Next.js, Zustand, and TanStack Query.',
  company: {
    name: 'Engine of Sainzo',
    url: 'https://kritishsainju.com.np',
  },
  supportEmail: 'kritishsainju2063@gmail.com',
  version: '1.0.0',
} as const;

// Type definition to ensure read-only immutability across the app
export type AppConfig = typeof APP_CONFIG;
