import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';
import { Suspense } from 'react';
import { LoadingState } from '@/components';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading password reset configuration..." />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
