import axios, { type AxiosError } from 'axios'
import type { UseFormSetError, Path } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateAgency } from '@/features/agencies/data/api'
import { type AgencyForm } from '@/features/agencies/data/schema'

interface UseUpdateAgencyOptions {
  setFormError: UseFormSetError<AgencyForm>
  onSuccess?: () => void
}

interface ApiErrorResponse {
  code: number
  status: string
  message: string
  errors?: Record<string, string[]>
}

export const useUpdateAgency = ({
  setFormError,
  onSuccess,
}: UseUpdateAgencyOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateAgency,
    onSuccess: () => {
      toast.success('Agency updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['agencies'] })
      if (onSuccess) onSuccess()
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>
        const errorData = axiosError.response?.data

        if (axiosError.response?.status === 400 && errorData?.errors) {
          Object.entries(errorData.errors).forEach(([fieldName, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setFormError(fieldName as Path<AgencyForm>, {
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
