// features/channels/api/channels.api.ts
import { api, ApiResponse, PaginatedData } from '@/lib/api';
import type {
  Channel,
  ChannelDetail,
  CreateChannelInput,
  ExploreChannelsParams,
  Member,
  PublicChannel,
} from '../types/channel.types';

export const channelsApi = {
  create: async (data: CreateChannelInput): Promise<ApiResponse<{ channel: ChannelDetail }>> => {
    return api.post('/channels', data);
  },

  explore: async (
    params?: ExploreChannelsParams
  ): Promise<ApiResponse<PaginatedData<PublicChannel>>> => {
    return api.get('/channels', { params });
  },

  getMyChannels: async (): Promise<ApiResponse<{ channels: Channel[] }>> => {
    return api.get('/channels/me');
  },

  getById: async (channelId: string): Promise<ApiResponse<{ channel: ChannelDetail }>> => {
    return api.get(`/channels/${channelId}`);
  },

  getMembers: async (channelId: string): Promise<ApiResponse<{ members: Member[] }>> => {
    return api.get(`/channels/${channelId}/members`);
  },

  getMyMembership: async (channelId: string): Promise<ApiResponse<{ member: Member }>> => {
    return api.get(`/channels/${channelId}/members/me`);
  },

  join: async (channelId: string): Promise<ApiResponse<{ member: Member }>> => {
    return api.post(`/channels/${channelId}/members/join`);
  },

  leave: async (channelId: string): Promise<ApiResponse<void>> => {
    return api.delete(`/channels/${channelId}/members/leave`);
  },
};
