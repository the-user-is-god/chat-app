// features/channels/api/channels.keys.ts
/**
 * Standardized Query Key Factory.
 * Prevents magic strings inside cache invalidations across the boilerplate.
 */
export const channelKeys = {
  all: ['channels'] as const,
  explore: (params?: unknown) => [...channelKeys.all, 'explore', params] as const,
  mine: () => [...channelKeys.all, 'mine'] as const,
  detail: (channelId: string) => [...channelKeys.all, 'detail', channelId] as const,
  members: (channelId: string) => [...channelKeys.all, 'members', channelId] as const,
  membership: (channelId: string) => [...channelKeys.all, 'membership', channelId] as const,
};
