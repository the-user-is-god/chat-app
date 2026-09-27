// features/invitations/api/invitations.queries.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { invitationsApi } from './invitations.api';
import { invitationKeys } from './invitations.keys';
import { channelKeys } from '@/features/channels/api/channels.keys';

/**
 * Mutation hook generating a new invite code for a channel.
 */
export function useCreateInvitationMutation(channelId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data?: { maxUses?: number; expiresAt?: string }) =>
      invitationsApi.create(channelId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.byChannel(channelId) });
    },
  });
}

/**
 * Mutation hook redeeming an invite code to join a channel.
 */
export function useJoinByInvitationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: invitationsApi.joinByCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: channelKeys.mine() });
    },
  });
}

/**
 * Mutation hook revoking an existing invite code.
 */
export function useRevokeInvitationMutation(channelId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: invitationsApi.revoke,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationKeys.byChannel(channelId) });
    },
  });
}
