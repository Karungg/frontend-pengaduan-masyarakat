import { type AxiosError } from 'axios'
import {
  type UseFormSetError,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { toast } from 'sonner'

export interface ApiErrorResponse {
  code: number
  status: string
  message: string
  errors?: Record<string, string[]>
}

export function handleFormErrors<T extends FieldValues>(
  error: AxiosError<ApiErrorResponse>,
  setError?: UseFormSetError<T>
) {
  if (!error.response) {
    toast.error('Network Error', {
      description: 'Please check your connection.',
    })
    return
  }

  const { status, data } = error.response

  if (status === 400 && data.errors && setError) {
    Object.entries(data.errors).forEach(([field, messages]) => {
      if (messages && messages.length > 0) {
        setError(field as Path<T>, {
          type: 'server',
          message: messages[0],
        })
      }
    })

    toast.error('Validation Failed', {
      description: data.message || 'Please check the form for errors.',
    })
    return
  }

  toast.error('Error', {
    description: data.message || 'An unexpected error occurred.',
  })
}
