'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Compass,
  Hash,
  Plus,
  Settings,
  User as UserIcon,
  LogOut,
  ChevronsUpDown,
  MessageCircle,
  Bell,
  CirclePlus,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { useLogout } from '@/features/auth/hooks/use-logout';
import { ROUTES } from '@/config/routes';
import { toast } from '@/utils/toast';

const navMain = [
  {
    title: 'Explore',
    url: '/dashboard?tab=explore',
    icon: Compass,
    badge: 'New',
  },
  {
    title: 'Create Channel',
    url: '/dashboard?tab=messages',
    icon: CirclePlus,
  },
  {
    title: 'Notifications',
    url: '/dashboard?tab=notifications',
    icon: Bell,
    badge: '3',
  },
];

const channels = [
  {
    name: 'channel1',
    url: '/dashboard?channel=channel1',
    unread: 2,
  },
  {
    name: 'channel2',
    url: '/dashboard?channel=channel2',
  },
  {
    name: 'general',
    url: '/dashboard?channel=general',
  },
  {
    name: 'announcements',
    url: '/dashboard?channel=announcements',
  },
  {
    name: 'random',
    url: '/dashboard?channel=random',
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useCurrentUser();
  const { logout } = useLogout();
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Signed Out', 'You have been logged out safely.');
      router.replace(ROUTES.auth.login);
    } catch (err) {
      toast.error(err, 'Failed to sign out');
    }
  };

  const userInitial = user?.name
    ? user.name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Workspace / Brand Header */}
      <SidebarHeader className="border-sidebar-border border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href={ROUTES.dashboard.home} />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 text-white shadow-sm ring-1 ring-white/20">
                <MessageCircle className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold tracking-tight">Secret Spy</span>
                <span className="text-sidebar-foreground/70 truncate text-xs">Workspace v1.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Explore & Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    render={<Link href={item.url} />}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.badge && (
                    <SidebarMenuBadge className="bg-indigo-500/10 text-indigo-400">
                      {item.badge}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Channels Section */}
        <SidebarGroup>
          <div className="flex items-center justify-between pr-2">
            <SidebarGroupLabel>Channels</SidebarGroupLabel>
            <SidebarGroupAction
              title="Create Channel"
              onClick={() => toast.info('Create Channel', 'Channel creation modal coming soon.')}
            >
              <Plus className="size-4" />
              <span className="sr-only">Add Channel</span>
            </SidebarGroupAction>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {channels.map((channel) => (
                <SidebarMenuItem key={channel.name}>
                  <SidebarMenuButton
                    tooltip={`#${channel.name}`}
                    render={<Link href={channel.url} />}
                  >
                    <Hash className="text-sidebar-foreground/60 size-4" />
                    <span>{channel.name}</span>
                  </SidebarMenuButton>
                  {channel.unread && (
                    <SidebarMenuBadge className="bg-primary/20 text-primary font-semibold">
                      {channel.unread}
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Section in Footer */}
      <SidebarFooter className="border-sidebar-border border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  />
                }
              >
                <Avatar className="size-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-linear-to-tr from-indigo-500 to-purple-600 text-xs font-bold text-white">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="text-sidebar-foreground truncate font-semibold">
                    {user?.name || 'User'}
                  </span>
                  <span className="text-sidebar-foreground/70 truncate text-xs">
                    {user?.email || 'user@example.com'}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="size-8 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-linear-to-tr from-indigo-500 to-purple-600 text-xs font-bold text-white">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user?.name || 'User'}</span>
                        <span className="text-muted-foreground truncate text-xs">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => router.push(ROUTES.dashboard.profile)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <UserIcon className="size-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push(ROUTES.dashboard.settings)}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <Settings className="size-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 text-red-400 focus:text-red-400"
                >
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      {/* Rail for quick collapse hover/click */}
      <SidebarRail />
    </Sidebar>
  );
}
