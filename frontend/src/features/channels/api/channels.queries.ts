// features/channels/api/channels.queries.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { channelsApi } from './channels.api';
import { channelKeys } from './channels.keys';
import type { ExploreChannelsParams } from '../types/channel.types';

/**
 * Query hook browsing public/explorable channels.
 */
export function useExploreChannelsQuery(params?: ExploreChannelsParams) {
  return useQuery({
    queryKey: channelKeys.explore(params),
    queryFn: async () => {
      const response = await channelsApi.explore(params);
      return response.data;
    },
  });
}

/**
 * Query hook fetching channels the current user belongs to.
 */
export function useMyChannelsQuery() {
  return useQuery({
    queryKey: channelKeys.mine(),
    queryFn: async () => {
      const response = await channelsApi.getMyChannels();
      return response.data.channels;
    },
  });
}

/**
 * Query hook fetching a single channel's detail.
 */
export function useChannelQuery(channelId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: channelKeys.detail(channelId),
    queryFn: async () => {
      const response = await channelsApi.getById(channelId);
      return response.data.channel;
    },
    enabled: options?.enabled ?? !!channelId,
  });
}

/**
 * Query hook fetching a channel's member roster.
 */
export function useChannelMembersQuery(channelId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: channelKeys.members(channelId),
    queryFn: async () => {
      const response = await channelsApi.getMembers(channelId);
      return response.data.members;
    },
    enabled: options?.enabled ?? !!channelId,
  });
}

/**
 * Query hook checking current user's own membership/role in a channel.
 */
export function useMyMembershipQuery(channelId: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: channelKeys.membership(channelId),
    queryFn: async () => {
      const response = await channelsApi.getMyMembership(channelId);
      return response.data.member;
    },
    enabled: options?.enabled ?? !!channelId,
    retry: false,
  });
}

/**
 * Mutation hook creating a new channel.
 */
export function useCreateChannelMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: channelsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: channelKeys.mine() });
      queryClient.invalidateQueries({ queryKey: channelKeys.all });
    },
  });
}

/**
 * Mutation hook joining a channel.
 */
export function useJoinChannelMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: channelsApi.join,
    onSuccess: (_response, channelId) => {
      queryClient.invalidateQueries({ queryKey: channelKeys.mine() });
      queryClient.invalidateQueries({ queryKey: channelKeys.membership(channelId) });
      queryClient.invalidateQueries({ queryKey: channelKeys.all });
    },
  });
}

/**
 * Mutation hook leaving a channel.
 */
export function useLeaveChannelMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: channelsApi.leave,
    onSuccess: (_response, channelId) => {
      queryClient.invalidateQueries({ queryKey: channelKeys.mine() });
      queryClient.removeQueries({ queryKey: channelKeys.membership(channelId) });
    },
  });
}
