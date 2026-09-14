'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Settings,
  Hash,
  Lock,
  Globe,
  Users,
  Link2,
  Copy,
  Plus,
  Trash2,
  ArrowLeft,
  Shield,
  Crown,
  UserMinus,
  ChevronDown,
  Check,
  Loader2,
  RotateCcw,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// ─── Mock Data ────────────────────────────────────────────────────────────────

type ChannelRole = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER' | 'VIEWER';

interface Member {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: ChannelRole;
  joinedAt: string;
}

interface Invitation {
  id: string;
  code: string;
  maxUses: number | null;
  uses: number;
  expiresAt: string | null;
  isRevoked: boolean;
  createdAt: string;
}

const MOCK_CHANNEL = {
  id: '42ec89bb-9ef2-4d64-85d5-74b7939d3265',
  name: 'WHO M I',
  description: null as string | null,
  visibility: 'PRIVATE' as const,
  memberCount: 5,
  createdAt: '2026-09-01T14:28:35Z',
};

const MOCK_MEMBERS: Member[] = [
  {
    id: 'm1',
    userId: 'u1',
    name: 'God Channel',
    email: 'abc@gmail.com',
    role: 'OWNER',
    joinedAt: '2026-09-01T14:28:35Z',
  },
  {
    id: 'm2',
    userId: 'u2',
    name: 'Alice Chen',
    email: 'alice@gmail.com',
    role: 'ADMIN',
    joinedAt: '2026-09-02T10:00:00Z',
  },
  {
    id: 'm3',
    userId: 'u3',
    name: 'Bob Kumar',
    email: 'bob@gmail.com',
    role: 'MEMBER',
    joinedAt: '2026-09-03T12:30:00Z',
  },
  {
    id: 'm4',
    userId: 'u4',
    name: 'Sam Ray',
    email: 'sam@gmail.com',
    role: 'VIEWER',
    joinedAt: '2026-09-04T08:00:00Z',
  },
];

const MOCK_INVITATIONS: Invitation[] = [
  {
    id: 'c3fe88b0',
    code: '02d574cb-4a46-426e-acf8-af37a0735a87',
    maxUses: null,
    uses: 2,
    expiresAt: null,
    isRevoked: true,
    createdAt: '2026-09-01T14:45:28Z',
  },
  {
    id: 'b27c6ba3',
    code: '6d439047-80c5-4f28-b48a-6c39d55a8105',
    maxUses: 3,
    uses: 1,
    expiresAt: null,
    isRevoked: false,
    createdAt: '2026-09-01T14:49:32Z',
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
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
}

function truncateCode(code: string) {
  return `${code.slice(0, 8)}…`;
}

const ROLE_STYLES: Record<ChannelRole, string> = {
  OWNER: 'bg-amber-500/15 text-amber-400',
  ADMIN: 'bg-indigo-500/15 text-indigo-400',
  MODERATOR: 'bg-cyan-500/15 text-cyan-400',
  MEMBER: 'bg-zinc-700/40 text-zinc-400',
  VIEWER: 'bg-zinc-800/60 text-zinc-600',
};

const ROLE_ICON: Record<ChannelRole, React.ReactNode> = {
  OWNER: <Crown className="size-3" />,
  ADMIN: <Shield className="size-3" />,
  MODERATOR: <Shield className="size-3" />,
  MEMBER: <Users className="size-3" />,
  VIEWER: <Users className="size-3" />,
};

// ─── Details Tab ──────────────────────────────────────────────────────────────

function DetailsTab() {
  const [name, setName] = useState(MOCK_CHANNEL.name);
  const [description, setDescription] = useState(MOCK_CHANNEL.description ?? '');
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
      {/* Basic Info */}
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

      {/* Channel Info */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-zinc-100">Channel Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: 'Channel ID', value: MOCK_CHANNEL.id },
            { label: 'Visibility', value: MOCK_CHANNEL.visibility },
            { label: 'Members', value: String(MOCK_CHANNEL.memberCount) },
            { label: 'Created', value: formatDate(MOCK_CHANNEL.createdAt) },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">{label}</span>
              <span className="font-mono text-xs text-zinc-300">{value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
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
                    <span className="font-semibold text-zinc-300">#{MOCK_CHANNEL.name}</span> and
                    all its messages. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <p className="text-xs text-zinc-400">
                    Type{' '}
                    <span className="font-mono font-bold text-zinc-200">{MOCK_CHANNEL.name}</span>{' '}
                    to confirm:
                  </p>
                  <Input
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    placeholder={MOCK_CHANNEL.name}
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
                    disabled={deleteConfirm !== MOCK_CHANNEL.name || deleting}
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

// ─── Members Tab ──────────────────────────────────────────────────────────────

function MembersTab() {
  const [members, setMembers] = useState(MOCK_MEMBERS);
  const [search, setSearch] = useState('');

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id));

  const ROLES: ChannelRole[] = ['ADMIN', 'MODERATOR', 'MEMBER', 'VIEWER'];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Users className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-600" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members…"
            className="border-zinc-700 bg-zinc-900 pl-9 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
          />
        </div>
        <Badge variant="secondary" className="shrink-0">
          {members.length} member{members.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-2">
        {filtered.map((member) => {
          const isOwner = member.role === 'OWNER';
          return (
            <Card key={member.id} className="border-zinc-800 bg-zinc-900">
              <CardContent className="flex items-center gap-3 p-3">
                <Avatar className="size-9 shrink-0">
                  <AvatarFallback className="bg-zinc-700 text-xs font-semibold text-zinc-300">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-semibold text-zinc-100">{member.name}</span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${ROLE_STYLES[member.role]}`}
                    >
                      {ROLE_ICON[member.role]}
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600">
                    {member.email} · Joined {formatDate(member.joinedAt)}
                  </p>
                </div>

                {!isOwner && (
                  <div className="flex shrink-0 items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-xs text-zinc-500 hover:text-zinc-200"
                        >
                          Change Role
                          <ChevronDown className="size-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        {ROLES.map((r) => (
                          <DropdownMenuItem
                            key={r}
                            className="flex items-center justify-between text-xs"
                          >
                            {r}
                            {member.role === r && <Check className="size-3 text-indigo-400" />}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <TooltipProvider delay={200}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-zinc-600 hover:text-red-400"
                            onClick={() => handleRemove(member.id)}
                          >
                            <UserMinus className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Remove member</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-600">
            No members match your search.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Invitations Tab ──────────────────────────────────────────────────────────

function InvitationsTab({ isPrivate }: { isPrivate: boolean }) {
  const [invitations, setInvitations] = useState(MOCK_INVITATIONS);
  const [creating, setCreating] = useState(false);
  const [maxUses, setMaxUses] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const BASE_URL = 'http://localhost:3000/join/';

  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => {
      const newInv: Invitation = {
        id: String(Date.now()),
        code: crypto.randomUUID(),
        maxUses: maxUses ? parseInt(maxUses) : null,
        uses: 0,
        expiresAt: null,
        isRevoked: false,
        createdAt: new Date().toISOString(),
      };
      setInvitations((prev) => [newInv, ...prev]);
      setCreating(false);
      setMaxUses('');
    }, 800);
  };

  const handleRevoke = (id: string) =>
    setInvitations((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, isRevoked: true } : inv))
    );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(`${BASE_URL}${code}`);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!isPrivate) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-800 py-16 text-center">
        <Globe className="mb-3 size-10 text-zinc-700" />
        <h3 className="text-sm font-semibold text-zinc-400">Invite Links Not Required</h3>
        <p className="mt-1 text-xs text-zinc-600">
          This is a public channel. Anyone can join without an invitation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create section */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base text-zinc-100">
            <Plus className="size-4 text-indigo-400" />
            Create Invitation Link
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Generate a link to share with people you want to invite.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-400">
              Max Uses{' '}
              <span className="font-normal text-zinc-600">(leave empty for unlimited)</span>
            </label>
            <Input
              type="number"
              min="1"
              value={maxUses}
              onChange={(e) => setMaxUses(e.target.value)}
              placeholder="e.g. 5"
              className="w-40 border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-700 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
            />
          </div>
          <Button
            onClick={handleCreate}
            disabled={creating}
            className="bg-indigo-600 hover:bg-indigo-500"
          >
            {creating ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Creating…
              </>
            ) : (
              <>
                <Link2 className="size-4" /> Generate Link
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Invitations list */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-zinc-300">
          All Invitations ({invitations.length})
        </h3>

        {invitations.map((inv) => (
          <Card
            key={inv.id}
            className={`border-zinc-800 bg-zinc-900 ${inv.isRevoked ? 'opacity-50' : ''}`}
          >
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-sm text-zinc-200">{truncateCode(inv.code)}</span>
                  <Badge
                    variant={inv.isRevoked ? 'destructive' : 'success'}
                    className="text-[10px]"
                  >
                    {inv.isRevoked ? 'Revoked' : 'Active'}
                  </Badge>
                  {inv.maxUses && (
                    <Badge variant="secondary" className="text-[10px]">
                      {inv.uses}/{inv.maxUses} uses
                    </Badge>
                  )}
                  {!inv.maxUses && (
                    <Badge variant="secondary" className="text-[10px]">
                      {inv.uses} uses · Unlimited
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-zinc-600">Created {formatDate(inv.createdAt)}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {!inv.isRevoked && (
                  <>
                    <TooltipProvider delay={200}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-zinc-700 text-zinc-400 hover:text-zinc-200"
                            onClick={() => handleCopy(inv.code)}
                          >
                            {copied === inv.code ? (
                              <>
                                <Check className="size-3.5 text-emerald-400" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="size-3.5" /> Copy
                              </>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy invite link</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-600 hover:text-red-400"
                      onClick={() => handleRevoke(inv.id)}
                    >
                      <RotateCcw className="size-3.5" />
                      Revoke
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {invitations.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-600">
            No invitation links yet. Create one above.
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChannelSettingsPage() {
  const params = useParams<{ channelId: string }>();
  const channelId = params?.channelId ?? '';
  const isPrivate = MOCK_CHANNEL.visibility === 'PRIVATE';

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
      {/* ── Back + Header ── */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 gap-1.5 text-zinc-400 hover:text-zinc-200"
        render={<Link href={`/channels/${channelId}/message`} />}
      >
        <ArrowLeft className="size-4" />
        Back to Channel
      </Button>

      <div className="mb-6 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-sm font-bold text-white shadow-md shadow-indigo-950">
          {MOCK_CHANNEL.name[0].toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-zinc-100">
              {isPrivate ? (
                <Lock className="mr-1 inline size-4 text-amber-400" />
              ) : (
                <Hash className="mr-1 inline size-4 text-zinc-400" />
              )}
              {MOCK_CHANNEL.name}
            </h1>
            <Badge variant={isPrivate ? 'warning' : 'success'} className="text-[10px]">
              {isPrivate ? 'Private' : 'Public'}
            </Badge>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-sm text-zinc-500">
            <Settings className="size-3.5" />
            Channel Settings
          </p>
        </div>
      </div>

      <Separator className="mb-6 bg-zinc-800" />

      {/* ── Tabs ── */}
      <Tabs defaultValue="details">
        <TabsList className="mb-6 h-auto flex-wrap gap-1 border border-zinc-800 bg-zinc-900 p-1">
          <TabsTrigger
            value="details"
            className="gap-1.5 text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            <Info className="size-3.5" /> Details
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="gap-1.5 text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
          >
            <Users className="size-3.5" /> Members
            <span className="ml-1 rounded-full bg-zinc-800 px-1.5 py-0.5 text-[10px] text-zinc-400">
              {MOCK_MEMBERS.length}
            </span>
          </TabsTrigger>
          {isPrivate && (
            <TabsTrigger
              value="invitations"
              className="gap-1.5 text-zinc-400 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Link2 className="size-3.5" /> Invitations
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="details">
          <DetailsTab />
        </TabsContent>
        <TabsContent value="members">
          <MembersTab />
        </TabsContent>
        {isPrivate && (
          <TabsContent value="invitations">
            <InvitationsTab isPrivate={isPrivate} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
