'use client';

import React from 'react';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';

export default function DashboardPage() {
  const { user } = useCurrentUser();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
      Hello World, I am coming, Myself {user?.name}
    </div>
  );
}
