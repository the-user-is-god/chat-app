// features/invitations/hooks/useCreateInvitation.ts
import { useCreateInvitationMutation } from '../api/invitations.queries';
import { AppApiError } from '@/lib/api';

export function useCreateInvitation(channelId: string) {
  const mutation = useCreateInvitationMutation(channelId);

  return {
    createInvitation: (data?: { maxUses?: number; expiresAt?: string }) =>
      mutation.mutateAsync(data),
    isLoading: mutation.isPending,
    error: mutation.error as AppApiError | null,
  };
}
