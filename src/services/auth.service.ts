import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import api from '@/lib/api'
import { useAuthStore } from '@/store/auth.store'
import { authResponseSchema } from '@/types/auth.types'
import type { LoginFormData, RegisterFormData } from '@/types/auth.types'

export function useLogin() {
  const { setAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await api.post('/auth/login', data)
      const parsed = authResponseSchema.parse(response.data)
      return parsed.data
    },
    onSuccess: (data) => {
      toast.success(`Welcome back, ${data.user.username}!`)
      setAuth(data.user, data.token)
      router.push('/dashboard')
    },
  })
}

export function useLogout() {
  const { clearAuth, user } = useAuthStore()
  const router = useRouter()

  return () => {
    clearAuth()
    toast.success(`Goodbye, ${user?.username ?? 'there'}!`)
    router.push('/login')
  }
}

export function useRegister() {
  const { setAuth } = useAuthStore()
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const payload = { username: data.username, email: data.email, password: data.password }
      const response = await api.post('/auth/register', payload)
      const parsed = authResponseSchema.parse(response.data)
      return parsed.data
    },
    onSuccess: (data) => {
      toast.success(`Account created! Welcome, ${data.user.username}!`)
      setAuth(data.user, data.token)
      router.push('/dashboard')
    },
  })
}
