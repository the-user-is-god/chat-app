'use client';

import React, { useState } from 'react';
import { Reply, MoreVertical, Copy, Trash2, Edit3, Pin } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Message } from '../types/channel.types';
import { formatTime, getInitials } from '../utils/utils';

export function MessageBubble({
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
      <Avatar className="mt-1 size-8 shrink-0">
        <AvatarFallback
          className={`text-xs font-semibold ${isOwn ? 'bg-indigo-600 text-white' : 'bg-zinc-700 text-zinc-300'}`}
        >
          {getInitials(message.senderName)}
        </AvatarFallback>
      </Avatar>

      <div className={`flex max-w-[75%] flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className={`mb-0.5 flex items-baseline gap-2 ${isOwn ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm font-semibold text-zinc-200">{message.senderName}</span>
          <span className="text-[11px] text-zinc-500">{formatTime(message.createdAt)}</span>
          {message.isEdited && <span className="text-[11px] text-zinc-600 italic">(edited)</span>}
        </div>

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
