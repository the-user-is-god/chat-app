'use client';

import React, { useState } from 'react';
import { Lock, Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function SecurityTab() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1200);
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base text-zinc-100">
            <Lock className="size-4 text-indigo-400" />
            Change Password
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Use a strong password with at least 8 characters, numbers, and symbols.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            {[
              {
                label: 'Current Password',
                show: showCurrent,
                toggle: () => setShowCurrent(!showCurrent),
                name: 'current',
              },
              {
                label: 'New Password',
                show: showNew,
                toggle: () => setShowNew(!showNew),
                name: 'new',
              },
              {
                label: 'Confirm New Password',
                show: showConfirm,
                toggle: () => setShowConfirm(!showConfirm),
                name: 'confirm',
              },
            ].map(({ label, show, toggle, name }) => (
              <div key={name} className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-400">{label}</label>
                <div className="relative">
                  <Input
                    type={show ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="border-zinc-700 bg-zinc-950 pr-9 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
                  />
                  <button
                    type="button"
                    onClick={toggle}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-600 transition-colors hover:text-zinc-300"
                  >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-500">
                {saving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Updating…
                  </>
                ) : (
                  'Update Password'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base text-zinc-100">
            <Shield className="size-4 text-indigo-400" />
            Active Sessions
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Manage where you are logged in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { device: 'Chrome on Linux', ip: '192.168.1.5', current: true, time: 'Now' },
            { device: 'Safari on iPhone', ip: '10.0.0.3', current: false, time: '2 days ago' },
          ].map((s) => (
            <div
              key={s.device}
              className="flex items-center justify-between rounded-lg bg-zinc-950 px-3 py-2.5"
            >
              <div>
                <p className="flex items-center gap-1.5 text-sm font-medium text-zinc-200">
                  {s.device}
                  {s.current && (
                    <Badge variant="success" className="text-[10px]">
                      Current
                    </Badge>
                  )}
                </p>
                <p className="text-xs text-zinc-600">
                  {s.ip} · {s.time}
                </p>
              </div>
              {!s.current && (
                <Button size="xs" variant="destructive" className="text-xs">
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
