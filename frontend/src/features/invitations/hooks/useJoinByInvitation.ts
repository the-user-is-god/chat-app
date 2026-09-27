// features/invitations/hooks/useJoinByInvitation.ts
import { useJoinByInvitationMutation } from '../api/invitations.queries';
import { AppApiError } from '@/lib/api';

export function useJoinByInvitation() {
  const mutation = useJoinByInvitationMutation();

  return {
    joinWithCode: (code: string) => mutation.mutateAsync({ code }),
    isLoading: mutation.isPending,
    error: mutation.error as AppApiError | null,
  };
}
