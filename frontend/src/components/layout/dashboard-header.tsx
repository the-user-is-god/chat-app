'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LogOut, Loader2, Sparkles } from 'lucide-react';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { ROUTES } from '@/config/routes';
import { toast } from '@/utils/toast';

export function DashboardHeader() {
  const router = useRouter();
  const { user } = useCurrentUser();
  const { logout, isLoading: isLoggingOut } = useLogout();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Signed Out', 'You have been logged out safely.');
      router.replace(ROUTES.auth.login);
    } catch (err) {
      toast.error(err, 'Failed to sign out');
    }
  };

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand logo & title */}
        <Link
          href={ROUTES.dashboard.home}
          className="group flex items-center gap-2.5 transition-transform duration-200 active:scale-95"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-md ring-1 shadow-indigo-500/20 ring-white/20 transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-white">
              Sainzo <Sparkles className="h-3 w-3 fill-indigo-400/20 text-indigo-400" />
            </span>
            <span className="text-[10px] font-medium text-zinc-400">Authenticated Environment</span>
          </div>
        </Link>

        {/* User profile info & Logout action */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-300 backdrop-blur-md sm:flex">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-tr from-indigo-500 to-purple-600 text-[11px] font-bold text-white shadow-sm">
                {userInitial}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] leading-tight font-semibold text-zinc-200">
                  {user.name || 'Tester User'}
                </span>
                <span className="text-[10px] leading-tight text-zinc-400">{user.email}</span>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2 text-xs font-semibold text-zinc-300 shadow-sm transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 active:scale-95 disabled:opacity-50"
            title="Sign Out of Session"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span className="hidden sm:inline">Signing out...</span>
              </>
            ) : (
              <>
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
