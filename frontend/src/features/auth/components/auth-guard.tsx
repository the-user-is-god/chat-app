'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCurrentUser } from '../hooks/use-current-user';
import { useAuthUiStore } from '../store/auth-ui.store';
import { ROUTES } from '@/config/routes';
import { StatusDisplay } from '@/components';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading } = useCurrentUser();
  const setPostLoginRedirectPath = useAuthUiStore((state) => state.setPostLoginRedirectPath);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Remember where the user wanted to go so we can redirect them back later
      setPostLoginRedirectPath(pathname);
      router.replace(ROUTES.auth.login);
    }
  }, [isLoading, isAuthenticated, pathname, router, setPostLoginRedirectPath]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <StatusDisplay
          variant="loading"
          title="Verifying Authorization..."
          description="Confirming secure server-side credentials."
        />
      </div>
    );
  }

  // Only render protected children if a valid user session is present in the cache
  return isAuthenticated && user ? <>{children}</> : null;
}
