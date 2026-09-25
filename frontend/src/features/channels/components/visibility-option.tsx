'use client';

import { Lock, Globe, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Visibility } from '../types/channel.types';

export function VisibilityOption({
  value,
  selected,
  onSelect,
}: {
  value: Visibility;
  selected: boolean;
  onSelect: () => void;
}) {
  const isPublic = value === 'PUBLIC';
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-1 flex-col gap-2 rounded-xl border p-4 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 ${
        selected
          ? 'border-indigo-500 bg-indigo-500/10'
          : 'border-zinc-700 bg-zinc-900 hover:border-zinc-600'
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex size-9 items-center justify-center rounded-lg ${
            isPublic ? 'bg-emerald-500/15' : 'bg-amber-500/15'
          }`}
        >
          {isPublic ? (
            <Globe className="size-5 text-emerald-500" />
          ) : (
            <Lock className="size-5 text-amber-500" />
          )}
        </div>
        <div
          className={`flex size-5 items-center justify-center rounded-full border-2 transition-colors ${
            selected ? 'border-indigo-500 bg-indigo-500' : 'border-zinc-600'
          }`}
        >
          {selected && <Check className="size-3 text-white" />}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-zinc-100">{isPublic ? 'Public' : 'Private'}</p>
        <p className="mt-0.5 text-xs text-zinc-500">
          {isPublic
            ? 'Anyone can find and join this channel. Perfect for open communities.'
            : 'Only invited members can join. Ideal for team or sensitive discussions.'}
        </p>
      </div>
      {selected && (
        <Badge variant={isPublic ? 'success' : 'warning'} className="self-start text-[11px]">
          {isPublic ? 'Public' : 'Private'} selected
        </Badge>
      )}
    </button>
  );
}
