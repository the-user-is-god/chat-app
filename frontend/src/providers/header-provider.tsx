// src/providers/header-provider.tsx
'use client';

import * as React from 'react';

interface HeaderState {
  title?: string;
  breadcrumb?: React.ReactNode;
  actions?: React.ReactNode; // buttons, badges, whatever a page wants on the right
}

interface HeaderContextValue {
  header: HeaderState;
  setHeader: (state: HeaderState) => void;
}

const HeaderContext = React.createContext<HeaderContextValue | null>(null);

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [header, setHeader] = React.useState<HeaderState>({});
  const value = React.useMemo(() => ({ header, setHeader }), [header]);
  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>;
}

export function useHeaderContext() {
  const ctx = React.useContext(HeaderContext);
  if (!ctx) throw new Error('useHeaderContext must be used within HeaderProvider');
  return ctx;
}

// Convenience hook pages call to *set* the header
export function useSetHeader(state: HeaderState, deps: React.DependencyList = []) {
  const { setHeader } = useHeaderContext();
  React.useEffect(() => {
    setHeader(state);
    return () => setHeader({}); // reset on unmount so stale headers don't leak between routes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
