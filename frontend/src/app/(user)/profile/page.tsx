'use client';

import React, { useState } from 'react';
import { User, Hash, Shield, LogOut, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { getInitials } from '@/features/users/utils/utils';
import { ProfileTab } from '@/features/users/components/profile-tab';
import { SecurityTab } from '@/features/users/components/security-tab';
import { MOCK_MY_CHANNELS, MOCK_USER } from '@/features/users/mocks/user.mock';
import { ChannelsTab } from '@/features/users/components/channel-tab';

export default function ProfilePage() {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      setLoggingOut(false);
      setLogoutOpen(false);
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
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
          <ProfileTab user={MOCK_USER} />
        </TabsContent>
        <TabsContent value="channels">
          <ChannelsTab initialChannels={MOCK_MY_CHANNELS} />
        </TabsContent>
        <TabsContent value="security">
          <SecurityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
