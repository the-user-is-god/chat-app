'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal } from 'lucide-react';
import { PageContainer } from '@/components';
import { ROUTES } from '@/config/routes';
import { APP_CONFIG } from '@/config/app';

/**
 * High-impact, professional enterprise starter landing view shell.
 */
export default function HomePage() {
  return (
    <PageContainer className="relative flex min-h-[85vh] flex-col justify-between py-10">
      {/* Ambient background glow - subtle & professional */}

      {/* Main Hero Section */}
      <section className="animate-in fade-in slide-in-from-bottom-3 mx-auto flex max-w-4xl flex-col items-center space-y-6 pt-6 text-center duration-500 sm:pt-12">
        {/* Hero Headline */}
        <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {APP_CONFIG.name}
        </h1>

        {/* Primary & Secondary CTAs */}
        <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 sm:w-auto sm:flex-row">
          <Link
            href={ROUTES.auth.login}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-purple-500 sm:w-auto"
          >
            <span>Login</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href={ROUTES.auth.register}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-6 py-3 text-sm font-semibold text-zinc-200 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-800 sm:w-auto"
          >
            <span>New Here ?</span>
          </Link>
        </div>
      </section>

      {/* Footer Info Strip */}
      <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/80 pt-6 text-xs text-zinc-400 sm:flex-row">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-zinc-400" />
          <span>
            {APP_CONFIG.company.name} &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="cursor-pointer transition-colors hover:text-zinc-300">
            Documentation
          </span>
          <span className="cursor-pointer transition-colors hover:text-zinc-300">
            API Architecture
          </span>
          <span className="cursor-pointer transition-colors hover:text-zinc-300">
            Security Specs
          </span>
        </div>
      </footer>
    </PageContainer>
  );
}
