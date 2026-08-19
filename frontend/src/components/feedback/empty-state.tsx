import React from 'react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No operational entities discovered',
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-white p-12 text-center">
      <h4 className="text-xs font-bold tracking-tight text-zinc-900">{title}</h4>
      {description && <p className="mt-1 max-w-xs text-xs text-zinc-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
