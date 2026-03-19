'use client'

import { usePathname } from 'next/navigation'
import { LayoutDashboard, ArrowLeftRight, Settings } from 'lucide-react'
import { useLogout } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function useAppSidebar() {
  const pathname = usePathname()
  const handleLogout = useLogout()
  const user = useAuthStore((s) => s.user)
  return { navItems: NAV_ITEMS, user, handleLogout, pathname }
}
