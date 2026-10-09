// app/(user)/explore/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Globe, Hash, TrendingUp, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatCount, getChannelInitials } from '@/features/channels/utils/utils';
import { ChannelCard } from '@/features/channels/components/channel-card';
import { ExploreCategory } from '@/features/channels/types/channel.types';
import { useExploreChannelsQuery } from '@/features/channels/api/channels.queries';
import { useDebouncedValue } from '@/features/channels/hooks/use-debounce-value';

const PAGE_SIZE = 12;
const CATEGORIES: ExploreCategory[] = ['all', 'trending', 'technology', 'design', 'general'];
const CATEGORY_LABELS: Record<ExploreCategory, string> = {
  all: 'All',
  trending: 'Trending',
  technology: 'Technology',
  design: 'Design',
  general: 'General',
};

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<ExploreCategory>('all');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search.trim(), 300);

  // Back to page 1 whenever the filters change
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setPage(1), [debouncedSearch, activeCategory]);

  const { data, isLoading, isError, isFetching, refetch } = useExploreChannelsQuery({
    search: debouncedSearch || undefined,
    category: activeCategory === 'all' ? undefined : activeCategory,
    page,
    pageSize: PAGE_SIZE,
  });

  const channels = data?.items ?? [];
  const meta = data?.meta;
  const trending = [...channels].sort((a, b) => b.memberCount - a.memberCount).slice(0, 3);

  return (
    <div className="mx-auto w-full space-y-8 px-4 py-6 sm:px-6">
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
          nativeButton={false}
          render={<Link href="/channels/create" />}
        >
          <Hash className="size-4" />
          Create Channel
        </Button>
      </div>

      {trending.length > 0 && (
        <section>
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp className="size-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-zinc-300">Popular Here</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {trending.map((ch, i) => (
              <Link
                key={ch.id}
                href={`/channels/${ch.id}/message`}
                className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition-colors hover:border-zinc-700"
              >
                <span className="text-lg font-black text-zinc-700">#{i + 1}</span>
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 text-xs font-bold text-white">
                  {getChannelInitials(ch.name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-200">#{ch.name}</p>
                  <p className="text-xs text-zinc-500">{formatCount(ch.memberCount)} members</p>
                </div>
                <Zap className="ml-auto size-4 shrink-0 text-amber-400" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <Separator className="bg-zinc-800" />

      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search public channels..."
          className="h-10 border-zinc-700 bg-zinc-900 pl-9 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
        />
        {isFetching && !isLoading && (
          <Loader2 className="absolute top-1/2 right-3 size-4 -translate-y-1/2 animate-spin text-zinc-500" />
        )}
      </div>

      <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as ExploreCategory)}>
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
      </Tabs>

      {/* One shared results area: filtering is server-side now, so no per-tab content */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-6 animate-spin text-zinc-600" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-zinc-800 py-16 text-center">
          <h3 className="text-sm font-semibold text-zinc-400">Couldn&apos;t load channels</h3>
          <Button variant="ghost" size="sm" className="mt-2" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : channels.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-800 py-16 text-center">
          <Search className="mb-3 size-10 text-zinc-700" />
          <h3 className="text-sm font-semibold text-zinc-400">No channels found</h3>
          <p className="mt-1 text-xs text-zinc-600">
            Try adjusting your search or browse a different category.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((ch) => (
              <ChannelCard key={ch.id} channel={ch} />
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                disabled={!meta.hasPreviousPage}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="text-xs text-zinc-500">
                Page {meta.currentPage} of {meta.totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                disabled={!meta.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
