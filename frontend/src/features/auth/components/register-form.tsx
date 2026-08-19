/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Eye,
  EyeOff,
  Loader2,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Mail,
  RefreshCw,
} from 'lucide-react';

import { FormField } from '@/components';
import { ROUTES } from '@/config/routes';
import { registerSchema, RegisterSchemaInput } from '../schemas/register.schema';
import { useRegister } from '../hooks/use-register';
import { authApi } from '../api/auth.api';
import { toast } from '@/utils/toast';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { registerUser, isLoading, error, isSuccess } = useRegister();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterSchemaInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  });

  const onSubmit = async (data: RegisterSchemaInput) => {
    try {
      await registerUser(data);
    } catch (err) {
      // Handled downstream by normalizer
    }
  };

  if (isSuccess) {
    return (
      <div className="animate-in fade-in zoom-in-95 w-full rounded-2xl border border-emerald-500/20 bg-zinc-900/90 p-8 text-center shadow-2xl backdrop-blur-xl duration-200">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
          <CheckCircle2 className="h-7 w-7" />
        </div>

        <h2 className="text-xl font-bold tracking-tight text-white">Verification Issued</h2>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          We have generated your account verification link. Please inspect your email inbox to
          activate your account.
        </p>

        <div className="mt-6 border-t border-zinc-800/80 pt-5">
          <p className="text-[11px] text-zinc-500">Didn&apos;t receive our verification email?</p>
          <button
            type="button"
            disabled={isResending}
            onClick={async () => {
              try {
                setIsResending(true);
                await authApi.resendVerification({ email: getValues('email') });
                toast.success('Token Re-Issued', 'A fresh validation email has been fired.');
              } catch (err) {
                toast.error(err);
              } finally {
                setIsResending(false);
              }
            }}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 transition-colors hover:text-indigo-300 hover:underline disabled:opacity-50"
          >
            {isResending ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                <span>Resending...</span>
              </>
            ) : (
              <>
                <Mail className="h-3.5 w-3.5" />
                <span>Resend Verification Link</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 pt-2">
          <Link
            href={ROUTES.auth.login}
            className="text-xs text-zinc-400 hover:text-zinc-200 hover:underline"
          >
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl transition-all">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
          <UserPlus className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Create Account</h1>
        <p className="mt-1 text-xs text-zinc-400">
          Join our platform by filling in your basic account details
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Registration Error</p>
            <p className="mt-0.5 text-red-300/90">{error.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Full Name"
          type="text"
          placeholder="John Doe"
          registration={register('name')}
          error={errors.name?.message}
          autoComplete="name"
        />

        <FormField
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          registration={register('email')}
          error={errors.email?.message}
          autoComplete="email"
        />

        <FormField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          registration={register('password')}
          error={errors.password?.message}
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

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Register</span>
              <UserPlus className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-zinc-800/80 pt-5 text-center">
        <p className="text-xs text-zinc-400">
          Already have an account?{' '}
          <Link
            href={ROUTES.auth.login}
            className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
