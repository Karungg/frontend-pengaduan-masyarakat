import { z } from 'zod'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { SignIn } from '@/features/auth/sign-in'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  beforeLoad: () => {
    const { isAuthenticated, isAdmin } = useAuthStore.getState().auth

    if (isAuthenticated()) {
      if (isAdmin()) {
        throw redirect({ to: '/admin' })
      } else {
        throw redirect({ to: '/' })
      }
    }
  },
  component: SignIn,
  validateSearch: searchSchema,
})
