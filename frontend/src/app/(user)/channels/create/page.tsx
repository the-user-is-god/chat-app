'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Lock, Globe, Hash, Info, Loader2, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSetHeader } from '@/providers/header-provider';
import { VisibilityOption } from '@/features/channels/components/visibility-option';
import { slugify, validateCreateChannelForm } from '@/features/channels/utils/utils';
import {
  CreateChannelInput,
  CreateChannelFormErrors,
  Visibility,
} from '@/features/channels/types/channel.types';

export default function CreateChannelPage() {
  const [form, setForm] = useState<CreateChannelInput>({
    name: '',
    description: '',
    visibility: 'PUBLIC',
  });
  const [errors, setErrors] = useState<CreateChannelFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const nameSlug = slugify(form.name);

  useSetHeader({ title: 'Create a Channel' });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = slugify(e.target.value);
    setForm((f) => ({ ...f, name: slug }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCreateChannelForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1400);
  };

  if (status === 'success') {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-emerald-500/10">
          <Check className="size-10 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-100">Channel Created!</h2>
        <p className="mt-2 text-sm text-zinc-500">
          <span className="font-semibold text-zinc-200">#{form.name}</span> is ready. Invite your
          friends or start chatting now.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            className="bg-indigo-600 hover:bg-indigo-500"
            nativeButton={false}
            render={<Link href="/channels/new/message" />}
          >
            <Hash className="size-4" />
            Open Channel
          </Button>
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300"
            onClick={() => {
              setStatus('idle');
              setForm({ name: '', description: '', visibility: 'PUBLIC' });
            }}
          >
            Create Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-4 sm:px-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 gap-1.5 text-zinc-400 hover:text-zinc-200"
        nativeButton={false}
        render={<Link href="/explore" />}
      >
        <ArrowLeft className="size-4" />
        Back to Explore
      </Button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Create a Channel</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Channels are where your community gathers. Make it count.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex w-full flex-wrap gap-6">
          <div className="flex flex-col gap-6">
            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base text-zinc-100">
                  <Hash className="size-4 text-indigo-400" />
                  Channel Name
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Choose a short, descriptive name. Use lowercase letters, numbers, and hyphens.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500">
                    #
                  </span>
                  <Input
                    value={form.name}
                    onChange={handleNameChange}
                    placeholder="e.g. my-awesome-channel"
                    maxLength={32}
                    aria-invalid={!!errors.name}
                    className={`border-zinc-700 bg-zinc-950 pl-7 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 ${
                      errors.name ? 'border-red-500/60' : ''
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="flex items-center gap-1 text-xs text-red-400">
                    <Info className="size-3.5" />
                    {errors.name}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs text-zinc-600">
                  <span>Preview: {nameSlug ? `#${nameSlug}` : '#channel-name'}</span>
                  <span>{form.name.length}/32</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base text-zinc-100">
                  <Info className="size-4 text-indigo-400" />
                  Description <span className="text-sm font-normal text-zinc-600">(optional)</span>
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Let people know what this channel is about. Keep it concise.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="This channel is for discussing..."
                  maxLength={280}
                  rows={3}
                  className="resize-none border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
                />
                <p className="mt-1.5 text-right text-xs text-zinc-600">
                  {form.description.length}/280
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-6">
            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-base text-zinc-100">
                  <Globe className="size-4 text-indigo-400" />
                  Visibility
                </CardTitle>
                <CardDescription className="text-xs text-zinc-500">
                  Choose who can see and join your channel.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {(['PUBLIC', 'PRIVATE'] as Visibility[]).map((v) => (
                    <VisibilityOption
                      key={v}
                      value={v}
                      selected={form.visibility === v}
                      onSelect={() => setForm((f) => ({ ...f, visibility: v }))}
                    />
                  ))}
                </div>

                {form.visibility === 'PRIVATE' && (
                  <div className="mt-3 flex gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                    <Lock className="mt-0.5 size-4 shrink-0 text-amber-400" />
                    <p className="text-xs text-amber-300">
                      Private channels require an invitation link to join. You can generate invite
                      links in the channel settings after creation.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-zinc-100">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 rounded-lg bg-zinc-950 p-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white">
                    {form.name ? form.name[0].toUpperCase() : '#'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {form.visibility === 'PRIVATE' ? (
                        <Lock className="size-3.5 text-amber-400" />
                      ) : (
                        <Hash className="size-3.5 text-zinc-400" />
                      )}
                      <span className="text-sm font-semibold text-zinc-100">
                        {form.name || 'channel-name'}
                      </span>
                      <Badge
                        variant={form.visibility === 'PUBLIC' ? 'success' : 'warning'}
                        className="text-[10px]"
                      >
                        {form.visibility === 'PUBLIC' ? 'Public' : 'Private'}
                      </Badge>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-zinc-500">
                      {form.description || 'No description set.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Separator className="bg-zinc-800" />

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="border-zinc-700 text-zinc-400"
            nativeButton={false}
            render={<Link href="/explore" />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating…
              </>
            ) : (
              <>
                <Hash className="size-4" />
                Create Channel
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
