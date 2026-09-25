'use client';

import React, { useState } from 'react';
import { Users, ChevronDown, Check, UserMinus, Crown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { getInitials, formatShortDate, ROLE_STYLES } from '../utils/utils';
import { ChannelRole, Member } from '../types/channel.types';

const ASSIGNABLE_ROLES: ChannelRole[] = ['ADMIN', 'MODERATOR', 'MEMBER', 'VIEWER'];

export const ROLE_ICON: Record<ChannelRole, React.ReactNode> = {
  OWNER: <Crown className="size-3" />,
  ADMIN: <Shield className="size-3" />,
  MODERATOR: <Shield className="size-3" />,
  MEMBER: <Users className="size-3" />,
  VIEWER: <Users className="size-3" />,
};

export function MembersTab({ initialMembers }: { initialMembers: Member[] }) {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState('');

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemove = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id));

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
                    {member.email} · Joined {formatShortDate(member.joinedAt)}
                  </p>
                </div>

                {!isOwner && (
                  <div className="flex shrink-0 items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1 text-xs text-zinc-500 hover:text-zinc-200"
                          >
                            Change Role
                            <ChevronDown className="size-3" />
                          </Button>
                        }
                      ></DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        {ASSIGNABLE_ROLES.map((r) => (
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
                        <TooltipTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              className="text-zinc-600 hover:text-red-400"
                              onClick={() => handleRemove(member.id)}
                            />
                          }
                        >
                          <UserMinus className="size-4" />
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
