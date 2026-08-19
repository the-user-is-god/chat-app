'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

import { FormField } from '@/components';
import { ROUTES } from '@/config/routes';
import { useResetPasswordMutation } from '../api/auth.queries';
import { resetPasswordSchema, ResetPasswordSchemaInput } from '../schemas/reset-password.schema';
import { useParams } from 'next/navigation';

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const params = useParams();
  const token = (params.token as string) || '';
  const mutation = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const onSubmit = (data: ResetPasswordSchemaInput) => {
    if (!token) {
      alert('Missing active validation token parameter in URL.');
      return;
    }
    mutation.mutate({ token, data: { newPassword: data.newPassword } });
  };

  if (mutation.isSuccess) {
    return (
      <div className="animate-in fade-in zoom-in-95 w-full rounded-2xl border border-emerald-500/20 bg-zinc-900/90 p-8 text-center shadow-2xl backdrop-blur-xl duration-200">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">Password Updated</h2>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          Your account security credentials have been successfully updated. You may now sign in with
          your new password.
        </p>

        <div className="mt-6 border-t border-zinc-800/80 pt-5">
          <Link
            href={ROUTES.auth.login}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700"
          >
            <span>Proceed to Sign In</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl transition-all">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
          <Lock className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Set New Password</h1>
        <p className="mt-1 text-xs text-zinc-400">
          Please enter and confirm your new secure account password below
        </p>
      </div>

      {mutation.isError && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Reset Password Error</p>
            <p className="mt-0.5 text-red-300/90">
              {(mutation.error as Error)?.message || 'Failed to apply new password.'}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="New Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          registration={register('newPassword')}
          error={errors.newPassword?.message}
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-zinc-400 transition-colors hover:text-zinc-200"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <FormField
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="••••••••"
          registration={register('confirmPassword')}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-zinc-400 transition-colors hover:text-zinc-200"
              tabIndex={-1}
              aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-50"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Updating Password...</span>
            </>
          ) : (
            <>
              <span>Apply New Password</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-zinc-800/80 pt-5 text-center">
        <Link
          href={ROUTES.auth.login}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>
    </div>
  );
}
