'use client';

import React, { useState } from 'react';
import {
  User,
  Mail,
  Camera,
  Hash,
  LogOut,
  Shield,
  Lock,
  Eye,
  EyeOff,
  Check,
  Loader2,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
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

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  id: '897d1e54-0556-43e7-bd8f-ae055d4458e5',
  name: 'God Channel',
  email: 'abc@gmail.com',
  role: 'USER' as const,
  isVerified: true,
  isBanned: false,
  avatar: null as string | null,
  joinedAt: '2026-08-01T00:00:00Z',
};

const MOCK_MY_CHANNELS = [
  {
    id: '42ec89bb',
    name: 'WHO M I',
    visibility: 'PRIVATE' as const,
    memberCount: 5,
    createdAt: '2026-09-01T14:28:35Z',
  },
  {
    id: '11111111',
    name: 'dev-talk',
    visibility: 'PUBLIC' as const,
    memberCount: 84,
    createdAt: '2026-08-12T09:00:00Z',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const [name, setName] = useState(MOCK_USER.name);
  const [email] = useState(MOCK_USER.email);
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
      {/* Avatar */}
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
                  {getInitials(MOCK_USER.name)}
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

      {/* Personal Info */}
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

      {/* Account Info */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-zinc-100">Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Member since', value: formatDate(MOCK_USER.joinedAt) },
            { label: 'Role', value: MOCK_USER.role },
            { label: 'Verification', value: MOCK_USER.isVerified ? 'Verified' : 'Unverified' },
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

// ─── Channels Tab ─────────────────────────────────────────────────────────────

function ChannelsTab() {
  const [channels] = useState(MOCK_MY_CHANNELS);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          You own <span className="font-semibold text-zinc-200">{channels.length}</span> channel
          {channels.length !== 1 ? 's' : ''}.
        </p>
        <Button
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-500"
          nativeButton={false}
          render={<Link href="/channels/create" />}
        >
          <Hash className="size-3.5" />
          New Channel
        </Button>
      </div>

      {channels.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-800 py-16 text-center">
          <Hash className="mb-3 size-10 text-zinc-700" />
          <h3 className="text-sm font-semibold text-zinc-400">No channels yet</h3>
          <p className="mt-1 text-xs text-zinc-600">Create your first channel to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {channels.map((ch) => (
            <Card key={ch.id} className="border-zinc-800 bg-zinc-900">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 text-xs font-bold text-white">
                  {ch.name[0].toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    {ch.visibility === 'PRIVATE' ? (
                      <Lock className="size-3.5 text-amber-400" />
                    ) : (
                      <Hash className="size-3.5 text-zinc-500" />
                    )}
                    <span className="text-sm font-semibold text-zinc-100">{ch.name}</span>
                    <Badge
                      variant={ch.visibility === 'PUBLIC' ? 'success' : 'warning'}
                      className="text-[10px]"
                    >
                      {ch.visibility}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-600">
                    {ch.memberCount} members · Created {formatDate(ch.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-zinc-500 hover:text-zinc-200"
                    nativeButton={false}
                    render={<Link href={`/channels/${ch.id}/message`} />}
                  >
                    <Hash className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="text-zinc-500 hover:text-zinc-200"
                    nativeButton={false}
                    render={<Link href={`/channels/${ch.id}/settings`} />}
                  >
                    <Settings className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────────────────────

function SecurityTab() {
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

      {/* Sessions */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      setLoggingOut(false);
      setLogoutOpen(false);
      // Router push to login would go here
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
      {/* ── Hero ── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="size-16 rounded-2xl">
              <AvatarFallback className="rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 text-2xl font-bold text-white">
                {getInitials(MOCK_USER.name)}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -right-1 -bottom-1 size-4 rounded-full bg-emerald-500 ring-2 ring-zinc-950" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-100">{MOCK_USER.name}</h1>
            <p className="text-sm text-zinc-500">{MOCK_USER.email}</p>
            <div className="mt-1 flex items-center gap-1.5">
              <Badge variant="info" className="text-[10px]">
                {MOCK_USER.role}
              </Badge>
              {MOCK_USER.isVerified && (
                <Badge variant="success" className="text-[10px]">
                  <Check className="size-2.5" /> Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Logout button */}
        <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm" className="shrink-0 gap-1.5">
              <LogOut className="size-4" />
              Sign Out
            </Button>
          </DialogTrigger>
          <DialogContent className="border-zinc-800 bg-zinc-900">
            <DialogHeader>
              <DialogTitle className="text-zinc-100">Sign out?</DialogTitle>
              <DialogDescription className="text-zinc-500">
                You will be logged out of this session. Any unsaved changes will be lost.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="border-zinc-700 text-zinc-400">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleLogout} disabled={loggingOut}>
                {loggingOut ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Signing out…
                  </>
                ) : (
                  <>
                    <LogOut className="size-4" />
                    Sign Out
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Separator className="mb-6 bg-zinc-800" />

      {/* ── Tabs ── */}
      <Tabs defaultValue="profile">
        <TabsList className="mb-6 h-auto border border-zinc-800 bg-zinc-900 p-1">
          <TabsTrigger
            value="profile"
            className="gap-1.5 text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            <User className="size-3.5" /> Profile
          </TabsTrigger>
          <TabsTrigger
            value="channels"
            className="gap-1.5 text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            <Hash className="size-3.5" /> My Channels
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="gap-1.5 text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            <Shield className="size-3.5" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="channels">
          <ChannelsTab />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
