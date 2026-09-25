'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Hash, Lock, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '../utils/utils';
import { MyChannel } from '../types';

export function ChannelsTab({ initialChannels }: { initialChannels: MyChannel[] }) {
  const [channels] = useState(initialChannels);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          You own <span className="font-semibold text-zinc-200">{channels.length}</span> channel
          {channels.length !== 1 ? 's' : ''}.
        </p>
        <Button
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-500"
          nativeButton={false}
          render={<Link href="/channels/create" />}
        >
          <Hash className="size-3.5" />
          New Channel
        </Button>
      </div>

      {channels.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-800 py-16 text-center">
          <Hash className="mb-3 size-10 text-zinc-700" />
          <h3 className="text-sm font-semibold text-zinc-400">No channels yet</h3>
          <p className="mt-1 text-xs text-zinc-600">Create your first channel to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {channels.map((ch) => (
            <Card key={ch.id} className="border-zinc-800 bg-zinc-900">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-xs font-bold text-white">
                  {ch.name[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {ch.visibility === 'PRIVATE' ? (
                      <Lock className="size-3.5 text-amber-400" />
                    ) : (
                      <Hash className="size-3.5 text-zinc-500" />
                    )}
                    <span className="text-sm font-semibold text-zinc-100">{ch.name}</span>
                    <Badge
                      variant={ch.visibility === 'PUBLIC' ? 'success' : 'warning'}
                      className="text-[10px]"
                    >
                      {ch.visibility}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-600">
                    {ch.memberCount} members · Created {formatDate(ch.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-zinc-500 hover:text-zinc-200"
                    nativeButton={false}
                    render={<Link href={`/channels/${ch.id}/message`} />}
                  >
                    <Hash className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-zinc-500 hover:text-zinc-200"
                    nativeButton={false}
                    render={<Link href={`/channels/${ch.id}/settings`} />}
                  >
                    <Settings className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
