import axios from 'axios'
// eslint-disable-next-line no-duplicate-imports
import type { AxiosError } from 'axios'
import type { UseFormSetError } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import {
  register,
  type RegisterResponse,
} from '@/features/auth/sign-up/data/api'
import type { Register } from '@/features/auth/sign-up/data/schema'

interface ApiErrorResponse {
  code: number
  status: string
  message: string
  errors?: Record<string, string[]>
}

interface UseRegisterOptions {
  onSuccess?: () => void
  setFormError?: UseFormSetError<Register>
}

export const useRegister = ({
  onSuccess,
  setFormError,
}: UseRegisterOptions = {}) => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: register,
    onSuccess: (data: RegisterResponse) => {
      toast.success(data.message || 'Registrasi berhasil!', {
        duration: 3000,
      })

      if (onSuccess) {
        onSuccess()
      } else {
        navigate({ to: '/sign-in' })
      }
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>
        const errorData = axiosError.response?.data

        if (
          axiosError.response?.status === 400 &&
          errorData?.errors &&
          setFormError
        ) {
          Object.entries(errorData.errors).forEach(([fieldName, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setFormError(fieldName as keyof Register, {
                type: 'server',
                message: messages[0],
              })
            }
          })

          toast.error(
            errorData.message ||
              'Terjadi kesalahan validasi. Periksa kembali form Anda.',
            {
              duration: 3000,
            }
          )
        } else if (errorData?.message) {
          toast.error(errorData.message, {
            duration: 3000,
          })
        } else {
          toast.error('Terjadi kesalahan. Silakan coba lagi.', {
            duration: 3000,
          })
        }
      } else {
        toast.error('Terjadi kesalahan yang tidak terduga.', {
          duration: 3000,
        })
      }
    },
  })
}
