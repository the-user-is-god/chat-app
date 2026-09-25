import { MyChannel, User } from '../types';

export const MOCK_USER: User = {
  id: '897d1e54-0556-43e7-bd8f-ae055d4458e5',
  name: 'God Channel',
  email: 'abc@gmail.com',
  role: 'USER',
  isVerified: true,
  isBanned: false,
  avatar: null,
  joinedAt: '2026-08-01T00:00:00Z',
};

export const MOCK_MY_CHANNELS: MyChannel[] = [
  {
    id: '42ec89bb',
    name: 'WHO M I',
    visibility: 'PRIVATE',
    memberCount: 5,
    createdAt: '2026-09-01T14:28:35Z',
  },
  {
    id: '11111111',
    name: 'dev-talk',
    visibility: 'PUBLIC',
    memberCount: 84,
    createdAt: '2026-08-12T09:00:00Z',
  },
];
