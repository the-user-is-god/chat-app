// features/messages/api/messages.api.ts
import { api, ApiResponse } from '@/lib/api';
import type {
  CursorPaginatedData,
  GetMessagesParams,
  Message,
  SendMessageInput,
  UpdateMessageInput,
} from '../types/message.types';

/**
 * Pure API implementation matching your backend v1 message endpoints.
 */
export const messagesApi = {
  list: async (
    channelId: string,
    params?: GetMessagesParams
  ): Promise<ApiResponse<CursorPaginatedData<Message>>> => {
    return api.get(`/channels/${channelId}/messages`, { params });
  },

  send: async (
    channelId: string,
    data: SendMessageInput
  ): Promise<ApiResponse<{ message: Message }>> => {
    return api.post(`/channels/${channelId}/messages`, data);
  },

  update: async (
    messageId: string,
    data: UpdateMessageInput
  ): Promise<ApiResponse<{ message: Message }>> => {
    return api.patch(`/messages/${messageId}`, data);
  },

  remove: async (messageId: string): Promise<ApiResponse<void>> => {
    return api.delete(`/messages/${messageId}`);
  },
};
