'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'

export function useProtectedLayout() {
  const token = useAuthStore((s) => s.token)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.replace('/login')
    }
  }, [token, router])

  return { isAuthenticated: !!token }
}
