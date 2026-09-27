// features/messages/api/messages.keys.ts
export const messageKeys = {
  all: ['messages'] as const,
  list: (channelId: string) => [...messageKeys.all, 'list', channelId] as const,
};
