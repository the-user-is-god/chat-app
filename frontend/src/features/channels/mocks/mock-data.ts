import { Message } from '@/features/messages/types/message.types';
import { Channel, ChannelDetail, Member, PublicChannel } from '../types/channel.types';
import { Invitation } from '@/features/invitations/types/invitation.types';

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

export const MOCK_PUBLIC_CHANNELS: PublicChannel[] = [
  {
    id: '1',
    name: 'general',
    description: 'General discussion for everyone. Share news, ideas, and updates.',
    memberCount: 1204,
    messageCount: 43200,
    visibility: 'PUBLIC',
    category: 'general',
    isJoined: true,
  },
  {
    id: '2',
    name: 'next-js',
    description: 'Everything about Next.js — tips, tutorials, and announcements.',
    memberCount: 842,
    messageCount: 18900,
    visibility: 'PUBLIC',
    category: 'technology',
    isJoined: false,
  },
  {
    id: '3',
    name: 'design-system',
    description: 'UI/UX discussions, design system patterns, and component libraries.',
    memberCount: 567,
    messageCount: 9800,
    visibility: 'PUBLIC',
    category: 'design',
    isJoined: false,
  },
  {
    id: '4',
    name: 'typescript',
    description: 'TypeScript tips, patterns, and best practices from the community.',
    memberCount: 1100,
    messageCount: 32000,
    visibility: 'PUBLIC',
    category: 'technology',
    isJoined: false,
  },
  {
    id: '5',
    name: 'random',
    description: 'Off-topic conversations, memes, and anything fun.',
    memberCount: 2100,
    messageCount: 88000,
    visibility: 'PUBLIC',
    category: 'general',
    isJoined: true,
  },
  {
    id: '6',
    name: 'announcements',
    description: 'Official announcements and updates from the workspace administrators.',
    memberCount: 3200,
    messageCount: 400,
    visibility: 'PUBLIC',
    category: 'general',
    isJoined: true,
  },
  {
    id: '7',
    name: 'tailwindcss',
    description: 'Tailwind CSS tips, tricks, and showcase of beautiful UIs.',
    memberCount: 780,
    messageCount: 15300,
    visibility: 'PUBLIC',
    category: 'design',
    isJoined: false,
  },
  {
    id: '8',
    name: 'open-source',
    description: 'Share and discover open source projects. Contributions welcome!',
    memberCount: 630,
    messageCount: 7200,
    visibility: 'PUBLIC',
    category: 'technology',
    isJoined: false,
  },
];
