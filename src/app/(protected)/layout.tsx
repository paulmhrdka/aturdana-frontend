'use client'

import { useProtectedLayout } from '@/hooks/use-protected-layout'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useProtectedLayout()

  if (!isAuthenticated) return null

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </SidebarProvider>
  )
}
