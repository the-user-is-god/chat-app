'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Hash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ChannelHeader } from '@/features/channels/components/channel-header';
import { MessageBubble } from '@/features/channels/components/message-bubble';
import { DateDivider } from '@/features/channels/components/date-divider';
import { MessageComposer } from '@/features/channels/components/message-composer';
import { MembersPanel } from '@/features/channels/components/member-panel';
import { MOCK_CHANNEL, MOCK_MESSAGES } from '@/features/channels/mocks/mock-data';
import { Message } from '@/features/channels/types/channel.types';
import { formatDate } from '@/features/channels/utils/utils';
import { useSetHeader } from '@/providers/header-provider';

export default function MessagePage() {
  const params = useParams<{ channelId: string }>();
  const channelId = params?.channelId ?? '';

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [replyTarget, setReplyTarget] = useState<Message | null>(null);
  const [membersOpen, setMembersOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useSetHeader({ title: `#${MOCK_CHANNEL.name}` }, [MOCK_CHANNEL.name]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        senderId: 'me',
        senderName: 'You',
        content: trimmed,
        createdAt: new Date().toISOString(),
        replyTo: replyTarget
          ? { senderName: replyTarget.senderName, content: replyTarget.content }
          : null,
      },
    ]);
    setInputValue('');
    setReplyTarget(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape' && replyTarget) setReplyTarget(null);
  };

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
        channel={MOCK_CHANNEL}
        channelId={channelId}
        onToggleMembers={() => setMembersOpen((v) => !v)}
      />

      <div className="flex">
        <div className="flex flex-1 flex-col">
          <div className="py-4">
            <div className="mb-4 px-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-zinc-800">
                <Hash className="size-6 text-zinc-300" />
              </div>
              <h3 className="mt-2 text-xl font-bold text-zinc-100">
                Welcome to #{MOCK_CHANNEL.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-500">
                This is the beginning of the #{MOCK_CHANNEL.name} channel.{' '}
                {MOCK_CHANNEL.description}
              </p>
            </div>
            <Separator className="mb-4 bg-zinc-800" />

            {grouped.map((group) => (
              <div key={group.date}>
                <DateDivider label={group.date} />
                {group.messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwn={msg.senderId === 'me'}
                    onReply={setReplyTarget}
                  />
                ))}
              </div>
            ))}

            <div className="px-4 py-1">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <div className="flex gap-0.5">
                  <span className="inline-block size-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:0ms]" />
                  <span className="inline-block size-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:150ms]" />
                  <span className="inline-block size-1.5 animate-bounce rounded-full bg-zinc-500 [animation-delay:300ms]" />
                </div>
                <span>Alice is typing…</span>
              </div>
            </div>

            <div ref={bottomRef} />
          </div>
        </div>

        {membersOpen && <MembersPanel onClose={() => setMembersOpen(false)} />}
      </div>

      <MessageComposer
        channelName={MOCK_CHANNEL.name}
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
