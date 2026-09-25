'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Users, Globe, Hash, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatCount, getChannelInitials } from '../utils/utils';
import { PublicChannel } from '../types/channel.types';

export function ChannelCard({ channel }: { channel: PublicChannel }) {
  const [joined, setJoined] = useState(channel.isJoined);

  return (
    <Card className="group border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700 hover:shadow-lg hover:shadow-indigo-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-white shadow-sm">
            <span className="text-xs font-bold">{getChannelInitials(channel.name)}</span>
          </div>

          {joined ? (
            <Button
              size="sm"
              variant="outline"
              className="border-zinc-700 text-zinc-400"
              nativeButton={false}
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
