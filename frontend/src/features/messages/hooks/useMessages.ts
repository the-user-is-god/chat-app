// features/messages/hooks/useMessages.ts
import { useMemo } from 'react';
import { useMessagesQuery, useSendMessageMutation } from '../api/messages.queries';
import { useMessageSocket } from './useMessageSocket';
import { AppApiError } from '@/lib/api';

export function useMessages(channelId: string) {
  useMessageSocket(channelId);

  const query = useMessagesQuery(channelId);
  const sendMutation = useSendMessageMutation(channelId);

  const messages = useMemo(
    () => query.data?.pages.flatMap((page) => page.items) ?? [],
    [query.data]
  );

  return {
    messages,
    isLoading: query.isLoading,
    isError: query.isError,
    fetchOlder: query.fetchNextPage,
    hasOlder: query.hasNextPage,
    isFetchingOlder: query.isFetchingNextPage,
    sendMessage: (content: string, replyToId?: string) =>
      sendMutation.mutateAsync({ content, replyToId }),
    isSending: sendMutation.isPending,
    error: sendMutation.error as AppApiError | null,
  };
}
