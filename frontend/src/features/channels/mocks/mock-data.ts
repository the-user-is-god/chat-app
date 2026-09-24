import { Channel, Message } from '../types/channel.types';

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
