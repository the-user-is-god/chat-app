'use client';

import React, { useState } from 'react';
import { User, Mail, Camera, Shield, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { User as UserType } from '../types';
import { getInitials, formatDate } from '../utils/utils';

export function ProfileTab({ user }: { user: UserType }) {
  const [name, setName] = useState(user.name);
  const [email] = useState(user.email);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-zinc-100">Profile Picture</CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Upload a photo or use your initials as avatar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="size-20 rounded-2xl">
                <AvatarFallback className="rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 text-xl font-bold text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <button className="absolute -right-1 -bottom-1 flex size-7 items-center justify-center rounded-full bg-indigo-600 text-white ring-2 ring-zinc-900 transition-transform hover:scale-105">
                <Camera className="size-3.5" />
              </button>
            </div>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300">
                <Camera className="size-3.5" />
                Upload Photo
              </Button>
              <p className="text-xs text-zinc-600">JPG, PNG up to 4 MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-zinc-100">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Display Name</label>
            <div className="relative">
              <User className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-600" />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-zinc-700 bg-zinc-950 pl-9 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-600" />
              <Input
                value={email}
                disabled
                className="cursor-not-allowed border-zinc-700 bg-zinc-950 pl-9 text-zinc-500"
              />
            </div>
            <p className="flex items-center gap-1 text-xs text-zinc-600">
              <Shield className="size-3" />
              Email cannot be changed for security reasons.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-500"
            >
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Saving…
                </>
              ) : saved ? (
                <>
                  <Check className="size-4" /> Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-zinc-100">Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Member since', value: formatDate(user.joinedAt) },
            { label: 'Role', value: user.role },
            { label: 'Verification', value: user.isVerified ? 'Verified' : 'Unverified' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">{label}</span>
              <span className="text-sm font-medium text-zinc-200">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
