'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Code2,
  Cpu,
  Sparkles,
  ArrowRight,
  Terminal,
  CheckCircle2,
} from 'lucide-react';
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
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center overflow-hidden">
        <div className="h-100 w-200 bg-linear-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 opacity-40 blur-3xl" />
      </div>

      {/* Main Hero Section */}
      <section className="animate-in fade-in slide-in-from-bottom-3 mx-auto flex max-w-4xl flex-col items-center space-y-6 pt-6 text-center duration-500 sm:pt-12">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800/90 bg-zinc-900/90 px-4 py-1.5 text-xs font-semibold text-zinc-300 shadow-sm backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-indigo-400" />
          <span>Production-Ready Next.js Architecture</span>
          <span className="h-1 w-1 rounded-full bg-zinc-600" />
          <span className="text-zinc-400">v{APP_CONFIG.version}</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {APP_CONFIG.name}
        </h1>

        {/* Subhead Description */}
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          {APP_CONFIG.description} Engineered with HTTP-only cookie security, Zod validation
          pipelines, and TanStack Query state caching.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="flex w-full flex-col items-center justify-center gap-3 pt-4 sm:w-auto sm:flex-row">
          <Link
            href={ROUTES.auth.login}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-purple-500 sm:w-auto"
          >
            <span>Access Gateway Console</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href={ROUTES.auth.register}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-6 py-3 text-sm font-semibold text-zinc-200 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-800 sm:w-auto"
          >
            <span>Create Developer Space</span>
          </Link>
        </div>

        {/* System Capabilities Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-xs font-semibold text-zinc-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>HTTP-Only Cookies</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>TanStack Cache Layer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Normalized Error Gateways</span>
          </div>
        </div>
      </section>

      {/* 3 Pillar Feature Highlights Grid */}
      <section className="animate-in fade-in slide-in-from-bottom-3 grid gap-6 pt-12 delay-150 duration-500 md:grid-cols-3">
        {/* Pillar 1: Secure Auth Engine */}
        <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-2xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20 transition-transform group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-white">Secure Auth Engine</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Robust HTTP-only cookie authentication, token verification logic, and protected router
            boundaries to keep user sessions safe.
          </p>
        </div>

        {/* Pillar 2: Type-Safe Validation */}
        <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-2xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20 transition-transform group-hover:scale-105">
            <Code2 className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-white">Type-Safe Validation</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Strict Zod form schemas coupled with unified error feedback and standardized FormField
            primitives for reliable inputs.
          </p>
        </div>

        {/* Pillar 3: Optimized Data Layer */}
        <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-2xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20 transition-transform group-hover:scale-105">
            <Cpu className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-white">Optimized Data Layer</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Powered by TanStack Query for background updates, automatic caching, retry logic, and
            seamless server state sync.
          </p>
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
