/* eslint-disable @typescript-eslint/no-explicit-any */
// features/messages/api/messages.queries.ts
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi } from './messages.api';
import { messageKeys } from './messages.keys';
import type {
  CursorPaginatedData,
  Message,
  SendMessageInput,
  UpdateMessageInput,
} from '../types/message.types';

/**
 * Infinite query hook paginating a channel's message history via cursor.
 * Pages are fetched oldest-direction-on-scroll-up; adjust getNextPageParam
 * to match whichever edge your backend cursor walks.
 */
export function useMessagesQuery(channelId: string, options?: { enabled?: boolean }) {
  return useInfiniteQuery({
    queryKey: messageKeys.list(channelId),
    queryFn: async ({ pageParam }) => {
      const response = await messagesApi.list(channelId, { cursor: pageParam, limit: 30 });
      return response.data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: CursorPaginatedData<Message>) =>
      lastPage.meta.hasNextPage ? (lastPage.meta.nextCursor ?? undefined) : undefined,
    enabled: options?.enabled ?? !!channelId,
  });
}

/**
 * Mutation hook sending a message, with optimistic append into the infinite cache.
 */
export function useSendMessageMutation(channelId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessageInput) => messagesApi.send(channelId, data),
    onSuccess: (response) => {
      queryClient.setQueryData(messageKeys.list(channelId), (old: any) => {
        if (!old) return old;
        const [firstPage, ...rest] = old.pages;
        return {
          ...old,
          pages: [{ ...firstPage, items: [response.data.message, ...firstPage.items] }, ...rest],
        };
      });
    },
  });
}

/**
 * Mutation hook editing a message in place within the cache.
 */
export function useUpdateMessageMutation(channelId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ messageId, data }: { messageId: string; data: UpdateMessageInput }) =>
      messagesApi.update(messageId, data),
    onSuccess: (response) => {
      queryClient.setQueryData(messageKeys.list(channelId), (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: CursorPaginatedData<Message>) => ({
            ...page,
            items: page.items.map((m) =>
              m.id === response.data.message.id ? response.data.message : m
            ),
          })),
        };
      });
    },
  });
}

/**
 * Mutation hook deleting a message, removing it from the cache immediately.
 */
export function useDeleteMessageMutation(channelId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: string) => messagesApi.remove(messageId),
    onSuccess: (_response, messageId) => {
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
    },
  });
}
