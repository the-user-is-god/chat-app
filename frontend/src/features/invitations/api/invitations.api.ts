// features/invitations/api/invitations.api.ts
import { api, ApiResponse } from '@/lib/api';
import type {
  CreateInvitationInput,
  Invitation,
  JoinByInvitationInput,
} from '../types/invitation.types';
import type { Channel } from '@/features/channels/types/channel.types';

/**
 * Pure API implementation matching your backend v1 invitation endpoints.
 */
export const invitationsApi = {
  create: async (
    channelId: string,
    data?: CreateInvitationInput
  ): Promise<ApiResponse<{ invitation: Invitation }>> => {
    return api.post(`/channels/${channelId}/invitations`, data);
  },

  joinByCode: async (data: JoinByInvitationInput): Promise<ApiResponse<{ channel: Channel }>> => {
    return api.post('/invitations/join', data);
  },

  revoke: async (inviteId: string): Promise<ApiResponse<{ invitation: Invitation }>> => {
    return api.patch(`/invitations/${inviteId}/revoke`);
  },
};
