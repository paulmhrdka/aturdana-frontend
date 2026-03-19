'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { useAppSidebar } from '@/hooks/use-sidebar'

export function AppSidebar() {
  const { navItems, user, handleLogout, pathname } = useAppSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 overflow-hidden px-2 py-3 transition-[gap,padding] duration-200 ease-linear group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            A
          </div>
          <span className="max-w-xs overflow-hidden whitespace-nowrap font-semibold text-base transition-[opacity,max-width] duration-200 ease-linear group-data-[collapsible=icon]:max-w-0 group-data-[collapsible=icon]:opacity-0">
            AturDana
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(href)}
                    tooltip={label}
                  >
                    <Link href={href}>
                      <Icon />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroup>
          <SidebarGroupContent>
            {user && (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={`${user.username} · ${user.email}`}
                    className="cursor-default hover:bg-transparent active:bg-transparent group-data-[collapsible=icon]:justify-center"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-[12px] font-semibold transition-[width,height] duration-200 ease-linear group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-md font-medium">{user.username}</span>
                      <span className="truncate text-sm text-muted-foreground">{user.email}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
            <Separator className="my-2" />
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}
