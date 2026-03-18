import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser } from '@/types/auth.types'

interface AuthState {
  user: AuthUser | null
  token: string | null
  setAuth: (user: AuthUser, token: string) => void
  clearAuth: () => void
}

const COOKIE_NAME = 'aturdana-token'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        document.cookie = `${COOKIE_NAME}=${token}; path=/; SameSite=Strict`
        set({ user, token })
      },
      clearAuth: () => {
        document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`
        set({ user: null, token: null })
      },
    }),
    {
      name: 'aturdana-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)
