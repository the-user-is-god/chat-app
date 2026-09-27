'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Hash, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ChannelHeader } from '@/features/channels/components/channel-header';
import { MessageBubble } from '@/features/channels/components/message-bubble';
import { DateDivider } from '@/features/channels/components/date-divider';
import { MessageComposer } from '@/features/channels/components/message-composer';
import { MembersPanel } from '@/features/channels/components/member-panel';
import { formatDate } from '@/features/channels/utils/utils';
import { useSetHeader } from '@/providers/header-provider';
import { Message } from '@/features/messages/types/message.types';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { useChannelQuery } from '@/features/channels/api/channels.queries';
import { useMessages } from '@/features/messages/hooks/useMessages';
import { toast } from '@/utils/toast';
import { StatusDisplay } from '@/components';

export default function MessagePage() {
  const params = useParams<{ channelId: string }>();
  const channelId = params?.channelId ?? '';

  const { user } = useCurrentUser();
  const { data: channel, isLoading: channelLoading } = useChannelQuery(channelId);
  const {
    messages,
    isLoading: messagesLoading,
    hasOlder,
    fetchOlder,
    isFetchingOlder,
    sendMessage,
    isSending,
  } = useMessages(channelId);

  const [inputValue, setInputValue] = useState('');
  const [replyTarget, setReplyTarget] = useState<Message | null>(null);
  const [membersOpen, setMembersOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useSetHeader({ title: channel ? `#${channel.name}` : 'Loading...' }, [channel?.name]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // fetch older messages  when the top sentinel comes into view
  useEffect(() => {
    const el = topRef.current;
    if (!el || !hasOlder) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingOlder) fetchOlder();
      },
      { threshold: 1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasOlder, isFetchingOlder, fetchOlder]);

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;
    try {
      await sendMessage(trimmed, replyTarget?.id);
      setInputValue('');
      setReplyTarget(null);
    } catch {
      toast.error('Failed to send message');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape' && replyTarget) setReplyTarget(null);
  };

  if (channelLoading || !channel) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <StatusDisplay variant="loading" title="Loading channel…" description="" />
      </div>
    );
  }

  const grouped: { date: string; messages: Message[] }[] = [];
  messages.forEach((msg) => {
    const dateLabel = formatDate(msg.createdAt);
    const last = grouped[grouped.length - 1];
    if (last && last.date === dateLabel) last.messages.push(msg);
    else grouped.push({ date: dateLabel, messages: [msg] });
  });

  return (
    <div className="relative flex flex-col bg-zinc-950">
      <ChannelHeader
        channel={channel}
        channelId={channelId}
        onToggleMembers={() => setMembersOpen((v) => !v)}
      />

      <div className="flex">
        <div className="flex flex-1 flex-col">
          <div className="py-4">
            <div ref={topRef} className="flex justify-center py-2">
              {isFetchingOlder && <Loader2 className="size-4 animate-spin text-zinc-600" />}
            </div>

            <div className="mb-4 px-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-800">
                <Hash className="size-6 text-zinc-300" />
              </div>
              <h3 className="mt-2 text-xl font-bold text-zinc-100">Welcome to #{channel.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">
                This is the beginning of the #{channel.name} channel. {channel.description}
              </p>
            </div>
            <Separator className="mb-4 bg-zinc-800" />

            {messagesLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="size-5 animate-spin text-zinc-600" />
              </div>
            ) : (
              grouped.map((group) => (
                <div key={group.date}>
                  <DateDivider label={group.date} />
                  {group.messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      isOwn={msg.senderId === user?.id}
                      onReply={setReplyTarget}
                    />
                  ))}
                </div>
              ))
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {membersOpen && <MembersPanel onClose={() => setMembersOpen(false)} />}
      </div>

      <MessageComposer
        channelName={channel.name}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onKeyDown={handleKeyDown}
        onSend={handleSend}
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
      />
    </div>
  );
}
