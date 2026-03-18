'use client'

import { useAuthStore } from '@/store/auth.store'
import { useLogout } from '@/services/auth.service'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const logout = useLogout()

  return (
    <main className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Welcome to AturDana{user ? `, ${user.username}` : ''}.
          </p>
        </div>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </div>
    </main>
  )
}
