'use client';

import { Paperclip, Smile, AtSign, Send, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Message } from '@/features/messages/types/message.types';

export function MessageComposer({
  channelName,
  inputValue,
  onInputChange,
  onKeyDown,
  onSend,
  replyTarget,
  onCancelReply,
}: {
  channelName: string;
  inputValue: string;
  onInputChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
  replyTarget: Message | null;
  onCancelReply: () => void;
}) {
  return (
    <div className="sticky bottom-0 -mx-4 -mb-4 shrink-0 border-t border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 sm:-mx-6 sm:-mb-6 sm:px-6 lg:-mx-8 lg:-mb-8 lg:px-8">
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
            onClick={onCancelReply}
            className="ml-2 shrink-0 text-zinc-500 hover:text-zinc-200"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 transition-all focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20">
        <button className="shrink-0 text-zinc-500 hover:text-zinc-200">
          <Paperclip className="size-4" />
        </button>

        <Input
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`Message #${channelName}`}
          className="h-10 flex-1 border-0 bg-transparent p-2 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-0 focus-visible:ring-0"
        />

        <div className="flex shrink-0 items-center gap-1">
          <button className="text-zinc-500 hover:text-zinc-200">
            <Smile className="size-4" />
          </button>
          <button className="text-zinc-500 hover:text-zinc-200">
            <AtSign className="size-4" />
          </button>
          <Button
            size="icon-sm"
            disabled={!inputValue.trim()}
            onClick={onSend}
            className="ml-1 shrink-0 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40"
          >
            <Send className="size-3.5" />
          </Button>
        </div>
      </div>

      <p className="mt-1 text-center text-[11px] text-zinc-700">
        Press <kbd className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-[10px]">Enter</kbd> to
        send, <kbd className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-[10px]">Esc</kbd> to
        cancel reply
      </p>
    </div>
  );
}
