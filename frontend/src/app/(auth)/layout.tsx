import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { ROUTES } from '@/config/routes';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-zinc-950 font-sans text-zinc-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glow FX */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-125 w-150 -translate-x-1/2 rounded-full bg-linear-to-tr from-indigo-600/20 via-purple-600/15 to-pink-500/10 opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute right-10 -bottom-40 -z-10 h-100 w-100 rounded-full bg-indigo-900/20 opacity-50 blur-3xl" />

      {/* Subtle Grid Background Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[4rem_4rem]" />

      {/* Top Navigation Header */}
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <Link
          href={ROUTES.home}
          className="group flex items-center gap-2.5 transition-transform duration-200 active:scale-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-lg ring-1 shadow-indigo-500/25 ring-white/20 transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-base font-extrabold tracking-tight text-white">
              Sainzo <Sparkles className="h-3.5 w-3.5 fill-indigo-400/20 text-indigo-400" />
            </span>
            <span className="text-[11px] font-medium text-zinc-400">Enterprise Starter Engine</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-zinc-400 sm:inline-block">Need help?</span>
          <a
            href="https://github.com/the-user-is-god/"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            Documentation
          </a>
        </div>
      </header>

      {/* Main Content Form Container */}
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-7xl px-6 py-6 text-center text-xs text-zinc-400">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p>© {new Date().getFullYear()} Sainzo Boilerplate. Clean Next.js Architecture.</p>
          <div className="flex gap-4 font-medium text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              Systems Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
