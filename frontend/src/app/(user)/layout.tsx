import React from 'react';
import { AuthGuard } from '@/features/auth/components/auth-guard';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-indigo-500 selection:text-white">
          <header className="border-sidebar-border sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-zinc-950/80 px-4 backdrop-blur-md">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 bg-zinc-800" />
            <div className="flex flex-1 items-center justify-between">
              <span className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
                Workspace
              </span>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="mx-auto w-full flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
