'use client';

import * as React from 'react';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';

interface AppProviderProps {
  children: React.ReactNode;
}

/**
 * Master Provider Composition Layer.
 * Stacks global framework concerns cleanly so that layout files remain untouched.
 */
export function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <TooltipProvider>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: { fontFamily: 'var(--font-sans)', borderRadius: '0.75rem' },
            }}
          />
        </TooltipProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
