import { Channel, ChannelDetail, Invitation, Member, Message } from '../types/channel.types';

export const MOCK_CHANNEL: Channel = {
  id: '42ec89bb',
  name: 'general',
  description: 'General discussion for the team. Share ideas, updates, and more.',
  visibility: 'PUBLIC',
  memberCount: 24,
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: 'u1',
    senderName: 'Alice Chen',
    content: 'Hey everyone! Welcome to the general channel 👋',
    createdAt: '2026-09-14T06:00:00Z',
  },
  {
    id: '2',
    senderId: 'u2',
    senderName: 'Bob Kumar',
    content: "Thanks Alice! Excited to be here. What's the main focus of this workspace?",
    createdAt: '2026-09-14T06:03:00Z',
  },
  {
    id: '3',
    senderId: 'u1',
    senderName: 'Alice Chen',
    content: "We're building a real-time messaging platform. Think Slack but better 😄",
    createdAt: '2026-09-14T06:05:00Z',
  },
  {
    id: '4',
    senderId: 'u3',
    senderName: 'Sam Ray',
    content: 'Sounds awesome! I just joined. The UI looks really clean so far.',
    createdAt: '2026-09-14T06:10:00Z',
  },
  {
    id: '5',
    senderId: 'u2',
    senderName: 'Bob Kumar',
    content: 'Hey this is my first message',
    createdAt: '2026-09-14T07:00:00Z',
  },
  {
    id: '6',
    senderId: 'me',
    senderName: 'You',
    content: 'Welcome Bob! Great to have you here.',
    createdAt: '2026-09-14T07:01:00Z',
    replyTo: { senderName: 'Bob Kumar', content: 'Hey this is my first message' },
  },
];

export const MOCK_CHANNEL_DETAIL: ChannelDetail = {
  id: '42ec89bb-9ef2-4d64-85d5-74b7939d3265',
  name: 'WHO M I',
  description: null,
  visibility: 'PRIVATE',
  memberCount: 5,
  createdAt: '2026-09-01T14:28:35Z',
};

export const MOCK_MEMBERS: Member[] = [
  {
    id: 'm1',
    userId: 'u1',
    name: 'God Channel',
    email: 'abc@gmail.com',
    role: 'OWNER',
    joinedAt: '2026-09-01T14:28:35Z',
  },
  {
    id: 'm2',
    userId: 'u2',
    name: 'Alice Chen',
    email: 'alice@gmail.com',
    role: 'ADMIN',
    joinedAt: '2026-09-02T10:00:00Z',
  },
  {
    id: 'm3',
    userId: 'u3',
    name: 'Bob Kumar',
    email: 'bob@gmail.com',
    role: 'MEMBER',
    joinedAt: '2026-09-03T12:30:00Z',
  },
  {
    id: 'm4',
    userId: 'u4',
    name: 'Sam Ray',
    email: 'sam@gmail.com',
    role: 'VIEWER',
    joinedAt: '2026-09-04T08:00:00Z',
  },
];

export const MOCK_INVITATIONS: Invitation[] = [
  {
    id: 'c3fe88b0',
    code: '02d574cb-4a46-426e-acf8-af37a0735a87',
    maxUses: null,
    uses: 2,
    expiresAt: null,
    isRevoked: true,
    createdAt: '2026-09-01T14:45:28Z',
  },
  {
    id: 'b27c6ba3',
    code: '6d439047-80c5-4f28-b48a-6c39d55a8105',
    maxUses: 3,
    uses: 1,
    expiresAt: null,
    isRevoked: false,
    createdAt: '2026-09-01T14:49:32Z',
  },
];
