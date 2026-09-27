// features/channels/hooks/useCreateChannel.ts
import { useCreateChannelMutation } from '../api/channels.queries';
import { AppApiError } from '@/lib/api';
import { CreateChannelSchemaInput } from '../schemas/create-channel.schema';

export function useCreateChannel() {
  const mutation = useCreateChannelMutation();

  return {
    createChannel: async (data: CreateChannelSchemaInput) => {
      return mutation.mutateAsync(data);
    },
    isLoading: mutation.isPending,
    error: mutation.error as AppApiError | null,
  };
}
