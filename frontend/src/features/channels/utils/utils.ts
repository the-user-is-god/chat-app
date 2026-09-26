import { ChannelRole, CreateChannelInput, CreateChannelFormErrors } from '../types/channel.types';

// utility functions for message
export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return 'Today';
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// utiluty function for create channel
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 32);
}

export function validateCreateChannelForm(form: CreateChannelInput): CreateChannelFormErrors {
  const errors: CreateChannelFormErrors = {};
  if (!form.name.trim()) {
    errors.name = 'Channel name is required.';
  } else if (form.name.length < 2) {
    errors.name = 'Channel name must be at least 2 characters.';
  } else if (!/^[a-z0-9-]+$/.test(form.name)) {
    errors.name = 'Only lowercase letters, numbers, and hyphens are allowed.';
  }
  return errors;
}

// settings

export function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
}

export function truncateCode(code: string) {
  return `${code.slice(0, 8)}…`;
}

export const ROLE_STYLES: Record<ChannelRole, string> = {
  OWNER: 'bg-amber-500/15 text-amber-400',
  ADMIN: 'bg-indigo-500/15 text-indigo-400',
  MODERATOR: 'bg-cyan-500/15 text-cyan-400',
  MEMBER: 'bg-zinc-700/40 text-zinc-400',
  VIEWER: 'bg-zinc-800/60 text-zinc-600',
};

// export const ROLE_ICON: Record<ChannelRole, React.ReactNode> = {
//   OWNER: <Crown className="size-3" />,
//   ADMIN: <Shield className="size-3" />,
//   MODERATOR: <Shield className="size-3" />,
//   MEMBER: <Users className="size-3" />,
//   VIEWER: <Users className="size-3" />,
// };

// formatShortDate, truncateCode, ROLE_STYLES, ROLE_ICON stay as-is

export function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// Distinct from getInitials (splits on ' ' for people's names) —
// this splits on '-' for channel slugs like "next-js" → "NJ"
export function getChannelInitials(name: string) {
  return name
    .split('-')
    .map((p) => p[0].toUpperCase())
    .join('')
    .slice(0, 2);
}
