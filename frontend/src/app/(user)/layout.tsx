import React from 'react';
import { AuthGuard } from '@/features/auth/components/auth-guard';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <div className="relative min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-indigo-500 selection:text-white">
        {/* Global Dashboard Navigation Header */}
        {/* <DashboardHeader /> */}

        {/* Main Content Area */}
        <main className="mx-auto w-full">{children}</main>
      </div>
    </AuthGuard>
  );
}
