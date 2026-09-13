'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { Compass, Hash, Sparkles, PanelLeft, User, Activity } from 'lucide-react';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';

export function DashboardView() {
  const { user } = useCurrentUser();
  const searchParams = useSearchParams();

  const activeChannel = searchParams.get('channel');
  const activeTab = searchParams.get('tab');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 space-y-6 duration-500">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-linear-to-r from-zinc-900/90 via-zinc-900/50 to-indigo-950/40 p-6 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
                <Sparkles className="size-3" /> Collapsible Sidebar Active
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Welcome back, {user?.name || 'Explorer'}! 👋
            </h1>
            <p className="text-sm text-zinc-400">
              Your chat application workspace is ready. Use the sidebar to navigate channels,
              explore content, and manage your profile.
            </p>
          </div>
        </div>
      </div>

      {/* Current Active Selection Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Hash className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400">Active Channel</p>
              <p className="text-base font-semibold text-zinc-100">
                {activeChannel ? `#${activeChannel}` : '#channel1 (Default)'}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Selected from the Channels section in the collapsible sidebar.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
              <Compass className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400">Active Tab</p>
              <p className="text-base font-semibold text-zinc-100 capitalize">
                {activeTab || 'General Overview'}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Switch between Explore, Direct Messages, and Notifications.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur-md sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <User className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-zinc-400">Logged in User</p>
              <p className="max-w-45 truncate text-base font-semibold text-zinc-100">
                {user?.name || user?.email || 'Authenticated User'}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Managed via the user dropdown at the bottom of the sidebar.
          </p>
        </div>
      </div>

      {/* Sidebar Test Highlights & Usage Tips */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2">
            <PanelLeft className="size-5 text-indigo-400" />
            <h2 className="text-base font-semibold text-zinc-100">Sidebar Features</h2>
          </div>
          <ul className="space-y-3 text-sm text-zinc-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 rounded-full bg-indigo-400" />
              <span>
                <strong className="text-zinc-100">Collapsible Modes:</strong> Collapse or expand
                using the top-left trigger button or keyboard shortcut{' '}
                <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                  ⌘B
                </kbd>{' '}
                /{' '}
                <kbd className="rounded border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                  Ctrl+B
                </kbd>
                .
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 rounded-full bg-indigo-400" />
              <span>
                <strong className="text-zinc-100">Navigation:</strong> Includes{' '}
                <span className="text-indigo-400">Explore</span>, Direct Messages, and Notifications
                with unread badge indicators.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 rounded-full bg-indigo-400" />
              <span>
                <strong className="text-zinc-100">Channels:</strong> Includes{' '}
                <span className="text-indigo-400">#channel1</span>,{' '}
                <span className="text-indigo-400">#channel2</span>,{' '}
                <span className="text-indigo-400">#general</span>,{' '}
                <span className="text-indigo-400">#announcements</span>, and{' '}
                <span className="text-indigo-400">#random</span>.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 size-1.5 rounded-full bg-indigo-400" />
              <span>
                <strong className="text-zinc-100">User Profile:</strong> Bottom footer displaying
                user avatar, name, email, and interactive dropdown menu with Profile, Settings, and
                Sign Out.
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2">
            <Activity className="size-5 text-purple-400" />
            <h2 className="text-base font-semibold text-zinc-100">Live Channels Test</h2>
          </div>
          <div className="space-y-2">
            {[
              { id: 'channel1', desc: 'Main discussion channel with 2 new messages' },
              { id: 'channel2', desc: 'Secondary development and testing channel' },
              { id: 'general', desc: 'Company-wide updates and casual banter' },
            ].map((ch) => (
              <a
                key={ch.id}
                href={`/dashboard?channel=${ch.id}`}
                className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                  activeChannel === ch.id
                    ? 'border-indigo-500/50 bg-indigo-500/10 text-white'
                    : 'hover:bg-zinc-850 border-zinc-800/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Hash className="size-4 text-zinc-400" />
                  <span className="font-medium">#{ch.id}</span>
                </div>
                <span className="text-xs text-zinc-500">{ch.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
