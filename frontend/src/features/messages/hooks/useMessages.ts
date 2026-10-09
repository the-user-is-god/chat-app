// features/messages/hooks/useMessages.ts
import { useMemo } from 'react';
import { useMessagesQuery } from '../api/messages.queries';
import { useChannelSocket } from './useChannelSocket';
import { useTypingIndicator } from './useTypingIndicator';

export function useMessages(channelId: string) {
  const query = useMessagesQuery(channelId);
  const { sendMessage, editMessage, deleteMessage } = useChannelSocket(channelId);
  const { typingUsers, notifyTyping, stopTyping } = useTypingIndicator(channelId);

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

    sendMessage,
    editMessage,
    deleteMessage,
    typingUsers,
    notifyTyping,
    stopTyping,
  };
}
