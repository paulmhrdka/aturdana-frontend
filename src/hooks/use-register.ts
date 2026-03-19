'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/types/auth.types'
import type { RegisterFormData } from '@/types/auth.types'
import { useRegister } from '@/services/auth.service'
import { toast } from 'sonner'

export function useRegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  })
  const register = useRegister()

  function onSubmit(data: RegisterFormData) {
    register.mutate(data, {
      onError: (error) => {
        toast.error(error instanceof Error ? error.message : 'Registration failed. Please try again.')
      },
    })
  }

  return { form, onSubmit, isPending: register.isPending }
}
