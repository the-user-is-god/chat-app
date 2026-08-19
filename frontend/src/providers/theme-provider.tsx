'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class" // Toggles dark modes via <html class="dark">
      defaultTheme="system" // Synchronizes with the user's operating system setting
      enableSystem // Enables system tracking
      disableTransitionOnChange // Prevents awkward style flashes during layout loads
      value={{
        light: 'light',
        dark: 'dark',
      }}
    >
      {children}
    </NextThemesProvider>
  );
}
