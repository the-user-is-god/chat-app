'use client';

import Link from 'next/link';
import { Hash, Settings, Users, Lock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Channel } from '../types/channel.types';

export function ChannelHeader({
  channel,
  channelId,
  onToggleMembers,
}: {
  channel: Channel;
  channelId: string;
  onToggleMembers: () => void;
}) {
  return (
    <header className="sticky top-14 z-99 flex w-full shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 py-2.5 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-800">
          {channel.visibility === 'PRIVATE' ? (
            <Lock className="size-4 text-zinc-400" />
          ) : (
            <Hash className="size-4 text-zinc-400" />
          )}
        </div>
        <div>
          <h2 className="text-sm font-bold text-zinc-100">{channel.name}</h2>
          {/* {channel.description && (
            <p className="max-w-xs truncate text-xs text-zinc-500">{channel.description}</p>
          )} */}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-zinc-400 hover:text-zinc-200"
          onClick={onToggleMembers}
        >
          <Users className="size-4" />
          <span className="text-xs">{channel.memberCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-zinc-200"
          nativeButton={false}
          render={<Link href={`/channels/${channelId}/settings`} />}
        >
          <Settings className="size-4" />
        </Button>

        <div
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            channel.visibility === 'PRIVATE'
              ? 'bg-amber-500/10 text-amber-400'
              : 'bg-emerald-500/10 text-emerald-400'
          }`}
        >
          {channel.visibility === 'PRIVATE' ? (
            <Lock className="size-3" />
          ) : (
            <Globe className="size-3" />
          )}
          {channel.visibility === 'PRIVATE' ? 'Private' : 'Public'}
        </div>
      </div>
    </header>
  );
}
