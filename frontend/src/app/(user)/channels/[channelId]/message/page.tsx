'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Hash,
  Send,
  Settings,
  Smile,
  Paperclip,
  AtSign,
  MoreVertical,
  Reply,
  Copy,
  Trash2,
  Edit3,
  Pin,
  Users,
  Lock,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CHANNEL: {
  id: string;
  name: string;
  description: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  memberCount: number;
} = {
  id: '42ec89bb',
  name: 'general',
  description: 'General discussion for the team. Share ideas, updates, and more.',
  visibility: 'PUBLIC',
  memberCount: 24,
};

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
  isEdited?: boolean;
  replyTo?: { senderName: string; content: string } | null;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'u1',
    senderName: 'Alice Chen',
    content: 'Hey everyone! Welcome to the general channel 👋',
    createdAt: '2026-09-14T06:00:00Z',
  },
  {
    id: '2',
    senderId: 'u2',
    senderName: 'Bob Kumar',
    content: "Thanks Alice! Excited to be here. What's the main focus of this workspace?",
    createdAt: '2026-09-14T06:03:00Z',
  },
  {
    id: '3',
    senderId: 'u1',
    senderName: 'Alice Chen',
    content: "We're building a real-time messaging platform. Think Slack but better 😄",
    createdAt: '2026-09-14T06:05:00Z',
  },
  {
    id: '4',
    senderId: 'u3',
    senderName: 'Sam Ray',
    content: 'Sounds awesome! I just joined. The UI looks really clean so far.',
    createdAt: '2026-09-14T06:10:00Z',
  },
  {
    id: '5',
    senderId: 'u2',
    senderName: 'Bob Kumar',
    content: 'Hey this is my first message',
    createdAt: '2026-09-14T07:00:00Z',
  },
  {
    id: '6',
    senderId: 'me',
    senderName: 'You',
    content: 'Welcome Bob! Great to have you here.',
    createdAt: '2026-09-14T07:01:00Z',
    replyTo: { senderName: 'Bob Kumar', content: 'Hey this is my first message' },
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({
  message,
  isOwn,
  onReply,
}: {
  message: Message;
  isOwn: boolean;
  onReply: (msg: Message) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group flex gap-3 px-4 py-1 hover:bg-zinc-900/60 ${isOwn ? 'flex-row-reverse' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Avatar */}
      <Avatar className="mt-1 size-8 shrink-0">
        <AvatarFallback
          className={`text-xs font-semibold ${isOwn ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300'}`}
        >
          {getInitials(message.senderName)}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className={`flex max-w-[75%] flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        {/* Header */}
        <div className={`mb-0.5 flex items-baseline gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm font-semibold text-zinc-200">{message.senderName}</span>
          <span className="text-[11px] text-zinc-500">{formatTime(message.createdAt)}</span>
          {message.isEdited && <span className="text-[11px] text-zinc-600 italic">(edited)</span>}
        </div>

        {/* Reply quote */}
        {message.replyTo && (
          <div
            className={`mb-1 flex items-start gap-1.5 rounded-md border-l-2 border-indigo-500 bg-zinc-800/70 px-2 py-1 ${isOwn ? 'ml-auto' : ''}`}
          >
            <Reply className="mt-0.5 size-3 shrink-0 text-indigo-400" />
            <div className="min-w-0">
              <span className="text-xs font-semibold text-indigo-400">
                {message.replyTo.senderName}
              </span>
              <p className="truncate text-xs text-zinc-400">{message.replyTo.content}</p>
            </div>
          </div>
        )}

        {/* Bubble */}
        <div
          className={`relative rounded-2xl px-3 py-2 text-sm leading-relaxed ${
            isOwn
              ? 'rounded-tr-sm bg-indigo-600 text-white'
              : 'rounded-tl-sm bg-zinc-800 text-zinc-100'
          }`}
        >
          {message.content}
        </div>
      </div>

      {/* Action toolbar on hover */}
      {hovered && (
        <div
          className={`mt-1 flex shrink-0 items-center gap-0.5 self-start ${isOwn ? 'order-first' : ''}`}
        >
          <TooltipProvider delay={200}>
            <Tooltip>
              <TooltipTrigger
                className="flex size-6 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
                onClick={() => onReply(message)}
              >
                <Reply className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent>Reply</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex size-6 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200">
              <MoreVertical className="size-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isOwn ? 'end' : 'start'} className="w-40">
              <DropdownMenuItem className="gap-2 text-xs" onClick={() => onReply(message)}>
                <Reply className="size-3.5" /> Reply
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-xs">
                <Copy className="size-3.5" /> Copy text
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-xs">
                <Pin className="size-3.5" /> Pin message
              </DropdownMenuItem>
              {isOwn && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="gap-2 text-xs">
                    <Edit3 className="size-3.5" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-xs text-red-400 focus:text-red-400">
                    <Trash2 className="size-3.5" /> Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

// ─── Date Divider ─────────────────────────────────────────────────────────────

function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2">
      <div className="h-px flex-1 bg-zinc-800" />
      <span className="text-xs font-medium text-zinc-500">{label}</span>
      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MessagePage() {
  const params = useParams<{ channelId: string }>();
  const channelId = params?.channelId ?? '';

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [replyTarget, setReplyTarget] = useState<Message | null>(null);
  const [membersOpen, setMembersOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    const newMsg: Message = {
      id: String(Date.now()),
      senderId: 'me',
      senderName: 'You',
      content: trimmed,
      createdAt: new Date().toISOString(),
      replyTo: replyTarget
        ? { senderName: replyTarget.senderName, content: replyTarget.content }
        : null,
    };
    setMessages((prev) => [...prev, newMsg]);
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

  // Group by date
  const grouped: { date: string; messages: Message[] }[] = [];
  messages.forEach((msg) => {
    const dateLabel = formatDate(msg.createdAt);
    const last = grouped[grouped.length - 1];
    if (last && last.date === dateLabel) last.messages.push(msg);
    else grouped.push({ date: dateLabel, messages: [msg] });
  });

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col bg-zinc-950">
      {/* ── Channel Header ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-800">
            {MOCK_CHANNEL.visibility === 'PRIVATE' ? (
              <Lock className="size-4 text-zinc-400" />
            ) : (
              <Hash className="size-4 text-zinc-400" />
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-100">{MOCK_CHANNEL.name}</h2>
            {MOCK_CHANNEL.description && (
              <p className="max-w-xs truncate text-xs text-zinc-500">{MOCK_CHANNEL.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-zinc-400 hover:text-zinc-200"
            onClick={() => setMembersOpen((v) => !v)}
          >
            <Users className="size-4" />
            <span className="text-xs">{MOCK_CHANNEL.memberCount}</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-zinc-200"
            render={<Link href={`/channels/${channelId}/settings`} />}
          >
            <Settings className="size-4" />
          </Button>

          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
              MOCK_CHANNEL.visibility === 'PRIVATE'
                ? 'bg-amber-500/10 text-amber-400'
                : 'bg-emerald-500/10 text-emerald-400'
            }`}
          >
            {MOCK_CHANNEL.visibility === 'PRIVATE' ? (
              <Lock className="size-3" />
            ) : (
              <Globe className="size-3" />
            )}
            {MOCK_CHANNEL.visibility === 'PRIVATE' ? 'Private' : 'Public'}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto py-4">
            {/* Channel intro */}
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

            {/* Typing indicator */}
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

          {/* ── Composer ── */}
          <div className="shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4">
            {replyTarget && (
              <div className="mb-2 flex items-center justify-between rounded-lg bg-zinc-800/80 px-3 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <Reply className="size-4 shrink-0 text-indigo-400" />
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-indigo-400">
                      Replying to {replyTarget.senderName}
                    </span>
                    <p className="truncate text-xs text-zinc-400">{replyTarget.content}</p>
                  </div>
                </div>
                <button
                  onClick={() => setReplyTarget(null)}
                  className="ml-2 shrink-0 text-zinc-500 transition-colors hover:text-zinc-200"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 transition-all focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20">
              <button className="shrink-0 text-zinc-500 transition-colors hover:text-zinc-200">
                <Paperclip className="size-4" />
              </button>

              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message #${MOCK_CHANNEL.name}`}
                className="h-10 flex-1 border-0 bg-transparent p-2 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-0 focus-visible:ring-0"
              />

              <div className="flex shrink-0 items-center gap-1">
                <button className="text-zinc-500 transition-colors hover:text-zinc-200">
                  <Smile className="size-4" />
                </button>
                <button className="text-zinc-500 transition-colors hover:text-zinc-200">
                  <AtSign className="size-4" />
                </button>

                <Button
                  size="icon-sm"
                  disabled={!inputValue.trim()}
                  onClick={handleSend}
                  className="ml-1 shrink-0 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40"
                >
                  <Send className="size-3.5" />
                </Button>
              </div>
            </div>

            <p className="mt-1 text-center text-[11px] text-zinc-700">
              Press{' '}
              <kbd className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to
              send, <kbd className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-[10px]">Esc</kbd>{' '}
              to cancel reply
            </p>
          </div>
        </div>

        {/* ── Members Panel ── */}
        {membersOpen && (
          <aside className="hidden w-64 shrink-0 flex-col border-l border-zinc-800 bg-zinc-950 lg:flex">
            <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
              <span className="text-sm font-semibold text-zinc-200">Members</span>
              <button
                onClick={() => setMembersOpen(false)}
                className="text-zinc-500 transition-colors hover:text-zinc-200"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <p className="mb-2 text-[11px] font-semibold tracking-wider text-zinc-600 uppercase">
                Online — 3
              </p>
              {['Alice Chen', 'Bob Kumar', 'Sam Ray'].map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-800"
                >
                  <div className="relative">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-zinc-700 text-xs text-zinc-300">
                        {getInitials(name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute right-0 bottom-0 size-2 rounded-full bg-emerald-500 ring-1 ring-zinc-950" />
                  </div>
                  <span className="text-sm text-zinc-300">{name}</span>
                </div>
              ))}

              <p className="mt-4 mb-2 text-[11px] font-semibold tracking-wider text-zinc-600 uppercase">
                Offline — 21
              </p>
              {['Charlie Dev', 'Dana Wu', 'Eve Smith'].map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-800"
                >
                  <div className="relative">
                    <Avatar className="size-7">
                      <AvatarFallback className="bg-zinc-800 text-xs text-zinc-500">
                        {getInitials(name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute right-0 bottom-0 size-2 rounded-full bg-zinc-600 ring-1 ring-zinc-950" />
                  </div>
                  <span className="text-sm text-zinc-500">{name}</span>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
