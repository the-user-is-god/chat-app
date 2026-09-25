import { CreateChannelForm, CreateChannelFormErrors } from '../types/channel.types';

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

export function validateCreateChannelForm(form: CreateChannelForm): CreateChannelFormErrors {
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
