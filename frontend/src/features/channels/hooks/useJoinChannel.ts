// features/channels/hooks/useJoinChannel.ts
import { useJoinChannelMutation, useLeaveChannelMutation } from '../api/channels.queries';
import { AppApiError } from '@/lib/api';

export function useJoinChannel() {
  const joinMutation = useJoinChannelMutation();
  const leaveMutation = useLeaveChannelMutation();

  return {
    join: (channelId: string) => joinMutation.mutateAsync(channelId),
    leave: (channelId: string) => leaveMutation.mutateAsync(channelId),
    isJoining: joinMutation.isPending,
    isLeaving: leaveMutation.isPending,
    error: (joinMutation.error ?? leaveMutation.error) as AppApiError | null,
  };
}
