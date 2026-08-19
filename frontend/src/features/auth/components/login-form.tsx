/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, LogIn, AlertCircle } from 'lucide-react';

import { FormField } from '@/components';
import { ROUTES } from '@/config/routes';
import { loginSchema, LoginSchemaInput } from '../schemas/login.schema';
import { useLogin } from '../hooks/use-login';

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginSchemaInput) => {
    try {
      await login(data);
      router.replace(ROUTES.dashboard.home);
    } catch (err) {
      // Normalised and handled downstream
    }
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-900/90 p-8 shadow-2xl backdrop-blur-xl transition-all">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20">
          <LogIn className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h1>
        <p className="mt-1 text-xs text-zinc-400">
          Sign in to access your secure dashboard and account settings
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5 text-xs text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Authentication Error</p>
            <p className="mt-0.5 text-red-300/90">{error.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          registration={register('email')}
          error={errors.email?.message}
          autoComplete="email"
        />

        <div>
          <FormField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            registration={register('password')}
            error={errors.password?.message}
            autoComplete="current-password"
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
          <div className="mt-2 text-right">
            <Link
              href={ROUTES.auth.forgotPassword}
              className="text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-600 hover:to-purple-700 hover:shadow-indigo-500/30 active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <LogIn className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 border-t border-zinc-800/80 pt-5 text-center">
        <p className="text-xs text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link
            href={ROUTES.auth.register}
            className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
