import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message = 'Synchronizing secure data structures...',
}: LoadingStateProps) {
  return (
    <div className="animate-in fade-in flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50/50 p-12 text-center duration-200">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-zinc-950 border-t-transparent" />
      <p className="mt-3 text-xs font-medium tracking-tight text-zinc-500">{message}</p>
    </div>
  );
}
