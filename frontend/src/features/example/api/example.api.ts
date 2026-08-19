import { api, ApiResponse } from '@/lib/api';
import type { ExampleItem, CreateExampleInput } from '../types';

export const exampleApi = {
  list: async (): Promise<ApiResponse<ExampleItem[]>> => {
    return api.get('/examples');
  },
  create: async (data: CreateExampleInput): Promise<ApiResponse<ExampleItem>> => {
    return api.post('/examples', data);
  },
};
