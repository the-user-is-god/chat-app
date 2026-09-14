'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Users, Globe, Hash, TrendingUp, Zap, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface PublicChannel {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  messageCount: number;
  visibility: 'PUBLIC';
  category: 'trending' | 'technology' | 'design' | 'general';
  isJoined: boolean;
}

const MOCK_CHANNELS: PublicChannel[] = [
  {
    id: '1',
    name: 'general',
    description: 'General discussion for everyone. Share news, ideas, and updates.',
    memberCount: 1204,
    messageCount: 43200,
    visibility: 'PUBLIC',
    category: 'general',
    isJoined: true,
  },
  {
    id: '2',
    name: 'next-js',
    description: 'Everything about Next.js — tips, tutorials, and announcements.',
    memberCount: 842,
    messageCount: 18900,
    visibility: 'PUBLIC',
    category: 'technology',
    isJoined: false,
  },
  {
    id: '3',
    name: 'design-system',
    description: 'UI/UX discussions, design system patterns, and component libraries.',
    memberCount: 567,
    messageCount: 9800,
    visibility: 'PUBLIC',
    category: 'design',
    isJoined: false,
  },
  {
    id: '4',
    name: 'typescript',
    description: 'TypeScript tips, patterns, and best practices from the community.',
    memberCount: 1100,
    messageCount: 32000,
    visibility: 'PUBLIC',
    category: 'technology',
    isJoined: false,
  },
  {
    id: '5',
    name: 'random',
    description: 'Off-topic conversations, memes, and anything fun.',
    memberCount: 2100,
    messageCount: 88000,
    visibility: 'PUBLIC',
    category: 'general',
    isJoined: true,
  },
  {
    id: '6',
    name: 'announcements',
    description: 'Official announcements and updates from the workspace administrators.',
    memberCount: 3200,
    messageCount: 400,
    visibility: 'PUBLIC',
    category: 'general',
    isJoined: true,
  },
  {
    id: '7',
    name: 'tailwindcss',
    description: 'Tailwind CSS tips, tricks, and showcase of beautiful UIs.',
    memberCount: 780,
    messageCount: 15300,
    visibility: 'PUBLIC',
    category: 'design',
    isJoined: false,
  },
  {
    id: '8',
    name: 'open-source',
    description: 'Share and discover open source projects. Contributions welcome!',
    memberCount: 630,
    messageCount: 7200,
    visibility: 'PUBLIC',
    category: 'technology',
    isJoined: false,
  },
];

const CATEGORIES = ['all', 'trending', 'technology', 'design', 'general'] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'All',
  trending: 'Trending',
  technology: 'Technology',
  design: 'Design',
  general: 'General',
};

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function getInitials(name: string) {
  return name
    .split('-')
    .map((p) => p[0].toUpperCase())
    .join('')
    .slice(0, 2);
}

// ─── Channel Card ──────────────────────────────────────────────────────────────

function ChannelCard({ channel }: { channel: PublicChannel }) {
  const [joined, setJoined] = useState(channel.isJoined);

  return (
    <Card className="group border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700 hover:shadow-lg hover:shadow-indigo-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          {/* Icon */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-white shadow-sm">
            <span className="text-xs font-bold">{getInitials(channel.name)}</span>
          </div>

          {/* Join/Joined btn */}
          {joined ? (
            <Button
              size="sm"
              variant="outline"
              className="border-zinc-700 text-zinc-400"
              render={<Link href={`/channels/${channel.id}/message`} />}
            >
              <MessageCircle className="size-3.5" />
              Open
            </Button>
          ) : (
            <Button
              size="sm"
              className="bg-indigo-600 text-white hover:bg-indigo-500"
              onClick={() => setJoined(true)}
            >
              Join
            </Button>
          )}
        </div>

        <div className="mt-1">
          <CardTitle className="flex items-center gap-1.5 text-zinc-100">
            <Hash className="size-4 text-zinc-500" />
            {channel.name}
            {joined && (
              <Badge variant="info" className="text-[10px]">
                Joined
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="mt-1 line-clamp-2 text-xs text-zinc-500">
            {channel.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <div className="flex items-center gap-4 text-xs text-zinc-600">
          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {formatCount(channel.memberCount)} members
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="size-3.5" />
            {formatCount(channel.messageCount)} messages
          </span>
          <span className="flex items-center gap-1">
            <Globe className="size-3.5 text-emerald-500" />
            <span className="text-emerald-500">Public</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filtered = MOCK_CHANNELS.filter((ch) => {
    const matchSearch =
      !search ||
      ch.name.toLowerCase().includes(search.toLowerCase()) ||
      ch.description.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      activeCategory === 'all' || activeCategory === 'trending'
        ? true
        : ch.category === activeCategory;
    return matchSearch && matchCat;
  });

  const trending = [...MOCK_CHANNELS].sort((a, b) => b.memberCount - a.memberCount).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-6 sm:px-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Globe className="size-5 text-indigo-400" />
            <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Explore Channels</h1>
          </div>
          <p className="text-sm text-zinc-500">
            Discover public channels and join conversations that matter to you.
          </p>
        </div>
        <Button
          className="shrink-0 bg-indigo-600 hover:bg-indigo-500"
          render={<Link href="/channels/create" />}
        >
          <Hash className="size-4" />
          Create Channel
        </Button>
      </div>

      {/* ── Trending strip ── */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="size-4 text-amber-400" />
          <h2 className="text-sm font-semibold text-zinc-300">Trending This Week</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {trending.map((ch, i) => (
            <div
              key={ch.id}
              className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition-colors hover:border-zinc-700"
            >
              <span className="text-lg font-black text-zinc-700">#{i + 1}</span>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 text-xs font-bold text-white">
                {getInitials(ch.name)}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-200">#{ch.name}</p>
                <p className="text-xs text-zinc-500">{formatCount(ch.memberCount)} members</p>
              </div>
              <Zap className="ml-auto size-4 shrink-0 text-amber-400" />
            </div>
          ))}
        </div>
      </section>

      <Separator className="bg-zinc-800" />

      {/* ── Search ── */}
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search public channels..."
          className="h-10 border-zinc-700 bg-zinc-900 pl-9 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
        />
      </div>

      {/* ── Category Tabs ── */}
      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as Category)}>
        <TabsList className="h-auto flex-wrap gap-1 border border-zinc-800 bg-zinc-900 p-1">
          {CATEGORIES.map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              {CATEGORY_LABELS[cat]}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((cat) => (
          <TabsContent key={cat} value={cat} className="mt-6">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-800 py-16 text-center">
                <Search className="mb-3 size-10 text-zinc-700" />
                <h3 className="text-sm font-semibold text-zinc-400">No channels found</h3>
                <p className="mt-1 text-xs text-zinc-600">
                  Try adjusting your search or browse a different category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((ch) => (
                  <ChannelCard key={ch.id} channel={ch} />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* ── Stats banner ── */}
      <div className="rounded-xl border border-zinc-800 bg-linear-to-r from-zinc-900 to-zinc-900/50 p-6">
        <div className="flex flex-wrap items-center gap-8">
          {[
            { label: 'Public Channels', value: formatCount(MOCK_CHANNELS.length), icon: Hash },
            {
              label: 'Total Members',
              value: formatCount(MOCK_CHANNELS.reduce((s, c) => s + c.memberCount, 0)),
              icon: Users,
            },
            {
              label: 'Messages Sent',
              value: formatCount(MOCK_CHANNELS.reduce((s, c) => s + c.messageCount, 0)),
              icon: MessageCircle,
            },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-800">
                <Icon className="size-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-zinc-100">{value}</p>
                <p className="text-xs text-zinc-500">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
