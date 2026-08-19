import React from 'react';

interface StatusDisplayProps {
  variant: 'loading' | 'error' | 'empty';
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

/**
 * Centrally managed status visual layout.
 * Ensures consistent look and feel across tables, charts, and content panels.
 */
export function StatusDisplay({ variant, title, description, action }: StatusDisplayProps) {
  const defaults = {
    loading: {
      title: 'Loading...',
      description: 'Fetching fresh data from our servers.',
    },
    error: {
      title: 'Something went wrong',
      description: 'We failed to retrieve this content. Please try again.',
    },
    empty: {
      title: 'No results found',
      description: 'There is nothing to display here right now.',
    },
  };

  const current = defaults[variant];

  return (
    <div className="bg-card/50 flex min-h-60 flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center">
      {variant === 'loading' && (
        <div className="border-primary mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      )}

      <h3 className="text-foreground text-lg font-semibold tracking-tight">
        {title || current.title}
      </h3>

      <p className="text-muted-foreground mt-1 max-w-sm text-sm">
        {description || current.description}
      </p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
