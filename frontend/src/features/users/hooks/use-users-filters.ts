'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';

/**
 * Custom URL State Synchronization Hook.
 * Manages list queries (page, search) strictly via URL search parameters.
 */
export function useUsersFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Read values reactively straight from the URL parameters (with solid fallbacks)
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  /**
   * Helper function to append or overwrite parameters onto the browser URL history stream.
   */
  const setFilters = React.useCallback(
    (newFilters: { page?: number; search?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.page !== undefined) {
        params.set('page', String(newFilters.page));
      }

      if (newFilters.search !== undefined) {
        if (newFilters.search) {
          params.set('search', newFilters.search);
          // Always reset the page pointer back to 1 when a brand-new keyword is entered
          params.set('page', '1');
        } else {
          params.delete('search');
        }
      }

      // Flush parameters to URL history without triggering a full-page reload
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  return {
    page,
    search,
    setFilters,
  };
}
