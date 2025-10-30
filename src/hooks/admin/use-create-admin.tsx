import axios, { type AxiosError } from 'axios'
import type { UseFormSetError, Path } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createUser } from '@/features/admins/data/api'
import { type AdminForm } from '@/features/admins/data/schema'

interface UseCreateAdminOptions {
  setFormError: UseFormSetError<AdminForm>
  onSuccess?: () => void
}

interface ApiErrorResponse {
  code: number
  status: string
  message: string
  errors?: Record<string, string[]>
}

export const useCreateAdmin = ({
  setFormError,
  onSuccess,
}: UseCreateAdminOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('Admin created successfully!')
      queryClient.invalidateQueries({ queryKey: ['admins'] })
      if (onSuccess) onSuccess()
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>
        const errorData = axiosError.response?.data

        if (axiosError.response?.status === 400 && errorData?.errors) {
          Object.entries(errorData.errors).forEach(([fieldName, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setFormError(fieldName as Path<AdminForm>, {
                type: 'server',
                message: messages[0],
              })
            }
          })
          toast.error(errorData.message || 'Validation failed. Check the form.')
        } else if (errorData?.message) {
          toast.error(errorData.message)
        } else {
          toast.error('An unknown error occurred.')
        }
      }
    },
  })
}
