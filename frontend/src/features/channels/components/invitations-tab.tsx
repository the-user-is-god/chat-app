'use client';

import React, { useState } from 'react';
import { Globe, Plus, Link2, Copy, Check, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { formatShortDate, truncateCode } from '../utils/utils';
import { Invitation } from '@/features/invitations/types/invitation.types';

const BASE_URL = 'http://localhost:3000/join/';

export function InvitationsTab({
  isPrivate,
  initialInvitations,
}: {
  isPrivate: boolean;
  initialInvitations: Invitation[];
}) {
  const [invitations, setInvitations] = useState(initialInvitations);
  const [creating, setCreating] = useState(false);
  const [maxUses, setMaxUses] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

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
                <p className="text-xs text-zinc-600">Created {formatShortDate(inv.createdAt)}</p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {!inv.isRevoked && (
                  <>
                    <TooltipProvider delay={200}>
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-zinc-700 text-zinc-400 hover:text-zinc-200"
                              onClick={() => handleCopy(inv.code)}
                            />
                          }
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
