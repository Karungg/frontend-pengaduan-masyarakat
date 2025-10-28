import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated/admin')({
  beforeLoad: () => {
    const { isAuthenticated, isAdmin } = useAuthStore.getState().auth

    if (!isAuthenticated()) {
      throw redirect({ to: '/sign-in' })
    }

    if (!isAdmin()) {
      throw redirect({
        to: '/403',
      })
    }
  },

  component: AuthenticatedLayout,
})
