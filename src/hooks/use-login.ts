'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/types/auth.types'
import type { LoginFormData } from '@/types/auth.types'
import { useLogin } from '@/services/auth.service'
import { toast } from 'sonner'

export function useLoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })
  const login = useLogin()

  function onSubmit(data: LoginFormData) {
    login.mutate(data, {
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.')
      },
    })
  }

  return { form, onSubmit, isPending: login.isPending }
}
