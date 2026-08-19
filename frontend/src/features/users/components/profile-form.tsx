/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, UpdateProfileSchemaInput } from '../schemas/users.schema';
import { useUsers } from '../hooks/use-users';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';

export function ProfileForm() {
  const { user } = useCurrentUser();
  const { updateProfile, isUpdating, updateError } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileSchemaInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user?.name || '' },
  });

  const onSubmit = async (data: UpdateProfileSchemaInput) => {
    try {
      await updateProfile(data);
      alert('Profile parameters updated securely!');
    } catch (err) {}
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-xl border bg-white p-5 shadow-sm"
    >
      <h3 className="text-sm font-bold tracking-tight text-zinc-900">
        Live Profile Engine (PATCH)
      </h3>

      {updateError && (
        <div className="rounded-md border border-red-100 bg-red-50 p-3 text-xs text-red-600">
          {updateError.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isUpdating}
        className="w-full rounded-lg bg-zinc-950 p-2.5 text-xs font-semibold text-white transition-colors disabled:bg-zinc-300"
      >
        {isUpdating ? 'Saving Profile Configuration...' : 'Commit Changes'}
      </button>
    </form>
  );
}
