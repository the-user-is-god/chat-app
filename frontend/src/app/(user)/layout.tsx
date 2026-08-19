import React from 'react';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { DashboardHeader } from '@/components/layout/dashboard-header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="relative min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-indigo-500 selection:text-white">
        {/* Background Ambient Glow FX */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-125 w-175 -translate-x-1/2 rounded-full bg-linear-to-tr from-indigo-600/15 via-purple-600/10 to-pink-500/10 opacity-60 blur-3xl" />

        {/* Subtle Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[4rem_4rem]" />

        {/* Global Dashboard Navigation Header */}
        <DashboardHeader />

        {/* Main Content Area */}
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
