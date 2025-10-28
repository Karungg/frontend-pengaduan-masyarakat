import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { SignUp } from '@/features/auth/sign-up'

export const Route = createFileRoute('/(auth)/sign-up')({
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
  component: SignUp,
})
