'use client';

import React, { useState } from 'react';
import { Trash2, Loader2, Check, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Hash } from 'lucide-react';
import { formatShortDate } from '../utils/utils';
import { ChannelDetail } from '../types/channel.types';

export function DetailsTab({ channel }: { channel: ChannelDetail }) {
  const [name, setName] = useState(channel.name);
  const [description, setDescription] = useState(channel.description ?? '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setDeleteOpen(false);
    }, 1400);
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base text-zinc-100">
            <Info className="size-4 text-indigo-400" />
            Channel Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">Channel Name</label>
              <div className="relative">
                <Hash className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-600" />
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-zinc-700 bg-zinc-950 pl-9 text-zinc-100 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400">
                Description <span className="font-normal text-zinc-600">(optional)</span>
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this channel about?"
                rows={3}
                maxLength={280}
                className="resize-none border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
              />
              <p className="text-right text-xs text-zinc-600">{description.length}/280</p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-500">
                {saving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Saving…
                  </>
                ) : saved ? (
                  <>
                    <Check className="size-4" /> Saved
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-zinc-100">Channel Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Channel ID', value: channel.id },
            { label: 'Visibility', value: channel.visibility },
            { label: 'Members', value: String(channel.memberCount) },
            { label: 'Created', value: formatShortDate(channel.createdAt) },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">{label}</span>
              <span className="font-mono text-xs text-zinc-300">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-red-900/30 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base text-red-400">
            <AlertTriangle className="size-4" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            These actions are permanent and cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-lg border border-red-900/30 bg-red-950/10 p-4">
            <div>
              <p className="text-sm font-semibold text-zinc-200">Delete Channel</p>
              <p className="text-xs text-zinc-500">
                Permanently delete this channel and all its messages.
              </p>
            </div>
            <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="size-3.5" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent className="border-zinc-800 bg-zinc-900">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-zinc-100">
                    <AlertTriangle className="size-5 text-red-400" />
                    Delete Channel
                  </DialogTitle>
                  <DialogDescription className="text-zinc-500">
                    This will permanently delete{' '}
                    <span className="font-semibold text-zinc-300">#{channel.name}</span> and all its
                    messages. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <p className="text-xs text-zinc-400">
                    Type <span className="font-mono font-bold text-zinc-200">{channel.name}</span>{' '}
                    to confirm:
                  </p>
                  <Input
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder={channel.name}
                    className="border-red-900/50 bg-zinc-950 text-zinc-100"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline" className="border-zinc-700 text-zinc-400">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    disabled={deleteConfirm !== channel.name || deleting}
                    onClick={handleDelete}
                  >
                    {deleting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" /> Deleting…
                      </>
                    ) : (
                      <>
                        <Trash2 className="size-4" /> Delete Channel
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
