import axios, { type AxiosError } from 'axios'
import type { UseFormSetError, Path } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createUser } from '@/features/users/data/api'
import { type UserForm } from '@/features/users/data/schema'

interface UseCreateUserOptions {
  setFormError: UseFormSetError<UserForm>
  onSuccess?: () => void
}

interface ApiErrorResponse {
  code: number
  status: string
  message: string
  errors?: Record<string, string[]>
}

export const useCreateUser = ({
  setFormError,
  onSuccess,
}: UseCreateUserOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('User created successfully!')
      queryClient.invalidateQueries({ queryKey: ['users'] })
      if (onSuccess) onSuccess()
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>
        const errorData = axiosError.response?.data

        if (axiosError.response?.status === 400 && errorData?.errors) {
          Object.entries(errorData.errors).forEach(([fieldName, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setFormError(fieldName as Path<UserForm>, {
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
