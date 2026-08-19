import React from 'react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Network synchronization breakdown',
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50/30 p-8 text-center">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600">
        !
      </div>
      <h4 className="mt-3 text-xs font-bold tracking-tight text-zinc-900">{title}</h4>
      {message && <p className="mt-1 max-w-xs text-xs text-zinc-500">{message}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-semibold shadow-sm transition-colors hover:bg-zinc-50"
        >
          Re-evaluate Connection
        </button>
      )}
    </div>
  );
}
