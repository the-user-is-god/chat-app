/* eslint-disable @typescript-eslint/no-explicit-any */
// features/messages/hooks/useMessageSocket.ts
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getSocket } from '@/lib/socket/socket';
import { messageKeys } from '../api/messages.keys';
import type { CursorPaginatedData, Message } from '../types/message.types';

/**
 * Joins a channel's socket room and syncs realtime events directly
 * into the React Query cache backing useMessagesQuery, so the UI
 * updates without a refetch. Adjust event names to match your backend emitter.
 */
export function useMessageSocket(channelId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!channelId) return;

    const socket = getSocket();
    if (!socket.connected) socket.connect();

    socket.emit('channel:join', { channelId });

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData(messageKeys.list(channelId), (old: any) => {
        if (!old) return old;
        const [firstPage, ...rest] = old.pages;
        if (firstPage.items.some((m: Message) => m.id === message.id)) return old;
        return {
          ...old,
          pages: [{ ...firstPage, items: [message, ...firstPage.items] }, ...rest],
        };
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

    socket.on('message:new', handleNewMessage);
    socket.on('message:updated', handleUpdatedMessage);
    socket.on('message:deleted', handleDeletedMessage);

    return () => {
      socket.emit('channel:leave', { channelId });
      socket.off('message:new', handleNewMessage);
      socket.off('message:updated', handleUpdatedMessage);
      socket.off('message:deleted', handleDeletedMessage);
    };
  }, [channelId, queryClient]);
}
