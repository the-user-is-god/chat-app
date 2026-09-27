// features/channels/hooks/useChannels.ts
import { useMyChannelsQuery } from '../api/channels.queries';

export function useChannels() {
  const { data: channels, isLoading, isError, refetch } = useMyChannelsQuery();

  return {
    channels: channels ?? [],
    isLoading,
    isError,
    refetch,
  };
}
