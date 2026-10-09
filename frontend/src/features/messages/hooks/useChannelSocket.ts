/* eslint-disable @typescript-eslint/no-explicit-any */
// features/messages/hooks/useChannelSocket.ts
import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getSocket } from '@/lib/socket/socket';
import { messageKeys } from '../api/messages.keys';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import type { CursorPaginatedData, Message } from '../types/message.types';

interface IncomingMessage extends Message {
  clientId?: string;
}

/**
 * Owns the realtime lifecycle for a single channel: joins/leaves the socket
 * room, syncs message events straight into the React Query cache, and
 * exposes emit-based send/edit/delete so messages travel over the socket
 * instead of REST. Pairs with useMessagesQuery, which still owns initial
 * history + cursor pagination via REST.
 */
export function useChannelSocket(channelId: string) {
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();

  useEffect(() => {
    if (!channelId) return;
    const socket = getSocket();
    if (!socket.connected) socket.connect();

    socket.emit('channel:join', { channelId });

    const upsertInFirstPage = (updater: (items: Message[]) => Message[]) => {
      queryClient.setQueryData(messageKeys.list(channelId), (old: any) => {
        if (!old) return old;
        const [firstPage, ...rest] = old.pages;
        return { ...old, pages: [{ ...firstPage, items: updater(firstPage.items) }, ...rest] };
      });
    };

    const handleNewMessage = (message: IncomingMessage) => {
      upsertInFirstPage((items) => {
        const placeholderIndex = message.clientId
          ? items.findIndex((m) => m.id === message.clientId)
          : -1;
        const realIndex = items.findIndex((m) => m.id === message.id);

        if (placeholderIndex !== -1) {
          const next = [...items];
          next[placeholderIndex] = message;
          return next;
        }
        if (realIndex !== -1) return items; // already have it, ignore duplicate broadcast
        return [message, ...items];
      });
    };

    const handleUpdatedMessage = (message: Message) => {
      queryClient.setQueryData(messageKeys.list(channelId), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: CursorPaginatedData<Message>) => ({
            ...page,
            items: page.items.map((m) => (m.id === message.id ? message : m)),
          })),
        };
      });
    };

    const handleDeletedMessage = ({ messageId }: { messageId: string }) => {
      queryClient.setQueryData(messageKeys.list(channelId), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: CursorPaginatedData<Message>) => ({
            ...page,
            items: page.items.filter((m) => m.id !== messageId),
          })),
        };
      });
    };

    const handleError = (error: { message: string; clientId?: string }) => {
      // Drop the failed optimistic placeholder so it doesn't sit there forever
      if (error.clientId) {
        upsertInFirstPage((items) => items.filter((m) => m.id !== error.clientId));
      }
      toast.error(error.message || 'Something went wrong');
    };

    socket.on('message:new', handleNewMessage);
    socket.on('message:updated', handleUpdatedMessage);
    socket.on('message:deleted', handleDeletedMessage);
    socket.on('message:error', handleError);
    socket.on('channel:error', handleError);

    return () => {
      socket.emit('channel:leave', { channelId });
      socket.off('message:new', handleNewMessage);
      socket.off('message:updated', handleUpdatedMessage);
      socket.off('message:deleted', handleDeletedMessage);
      socket.off('message:error', handleError);
      socket.off('channel:error', handleError);
    };
  }, [channelId, queryClient]);

  const sendMessage = useCallback(
    (content: string, replyToId?: string, replyPreview?: Message['replyTo']) => {
      const socket = getSocket();
      const clientId = crypto.randomUUID();

      const optimisticMessage: Message = {
        id: clientId,
        senderId: user?.id ?? '',
        senderName: user?.name ?? 'You',
        content,
        createdAt: new Date().toISOString(),
        replyTo: replyPreview ?? null,
      };

      queryClient.setQueryData(messageKeys.list(channelId), (old: any) => {
        if (!old) return old;
        const [firstPage, ...rest] = old.pages;
        return {
          ...old,
          pages: [{ ...firstPage, items: [optimisticMessage, ...firstPage.items] }, ...rest],
        };
      });

      socket.emit('message:send', { channelId, content, replyToId, clientId });
    },
    [channelId, queryClient, user]
  );

  const editMessage = useCallback((messageId: string, content: string) => {
    getSocket().emit('message:edit', { messageId, content });
  }, []);

  const deleteMessage = useCallback((messageId: string) => {
    getSocket().emit('message:delete', { messageId });
  }, []);

  return { sendMessage, editMessage, deleteMessage };
}
