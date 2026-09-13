import React, { Suspense } from 'react';
import { DashboardView } from '@/features/dashboard/components/dashboard-view';
import { LoadingState } from '@/components';

export default function DashboardPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading dashboard..." />}>
      <DashboardView />
    </Suspense>
  );
}
