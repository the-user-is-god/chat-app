'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Settings, Hash, Lock, Info, Users, Link2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { DetailsTab } from '@/features/channels/components/details-tab';
import { MembersTab } from '@/features/channels/components/members-tab';
import { InvitationsTab } from '@/features/channels/components/invitations-tab';
import {
  MOCK_CHANNEL_DETAIL,
  MOCK_INVITATIONS,
  MOCK_MEMBERS,
} from '@/features/channels/mocks/mock-data';

export default function ChannelSettingsPage() {
  const params = useParams<{ channelId: string }>();
  const channelId = params?.channelId ?? '';
  const isPrivate = MOCK_CHANNEL_DETAIL.visibility === 'PRIVATE';

  return (
    <div className="mx-auto w-full px-4 py-6 sm:px-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 gap-1.5 text-zinc-400 hover:text-zinc-200"
        nativeButton={false}
        render={<Link href={`/channels/${channelId}/message`} />}
      >
        <ArrowLeft className="size-4" />
        Back to Channel
      </Button>

      <div className="mb-6 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-md shadow-indigo-950">
          {MOCK_CHANNEL_DETAIL.name[0].toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-zinc-100">
              {isPrivate ? (
                <Lock className="mr-1 inline size-4 text-amber-400" />
              ) : (
                <Hash className="mr-1 inline size-4 text-zinc-400" />
              )}
              {MOCK_CHANNEL_DETAIL.name}
            </h1>
            <Badge variant={isPrivate ? 'warning' : 'success'} className="text-[10px]">
              {isPrivate ? 'Private' : 'Public'}
            </Badge>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-zinc-500">
            <Settings className="size-3.5" />
            Channel Settings
          </p>
        </div>
      </div>

      <Separator className="mb-6 bg-zinc-800" />

      <Tabs defaultValue="details">
        <TabsList className="mb-6 h-auto flex-wrap gap-1 border border-zinc-800 bg-zinc-900 p-1">
          <TabsTrigger
            value="details"
            className="gap-1.5 text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            <Info className="size-3.5" /> Details
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="gap-1.5 text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            <Users className="size-3.5" /> Members
            <span className="ml-1 rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">
              {MOCK_MEMBERS.length}
            </span>
          </TabsTrigger>
          {isPrivate && (
            <TabsTrigger
              value="invitations"
              className="gap-1.5 text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Link2 className="size-3.5" /> Invitations
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="details">
          <DetailsTab channel={MOCK_CHANNEL_DETAIL} />
        </TabsContent>
        <TabsContent value="members">
          <MembersTab initialMembers={MOCK_MEMBERS} />
        </TabsContent>
        {isPrivate && (
          <TabsContent value="invitations">
            <InvitationsTab isPrivate={isPrivate} initialInvitations={MOCK_INVITATIONS} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
