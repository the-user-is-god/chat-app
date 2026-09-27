// features/invitations/api/invitations.keys.ts
export const invitationKeys = {
  all: ['invitations'] as const,
  byChannel: (channelId: string) => [...invitationKeys.all, 'channel', channelId] as const,
};
