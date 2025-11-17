import { type AxiosError } from 'axios'
import type { FieldPath, UseFormSetError } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ErrorResponse } from '@/config/api'
import { toast } from 'sonner'
import { updateComplaint } from '@/features/home/data/api'
import type { ComplaintForm } from '@/features/home/data/schema'

type UseUpdateComplaintOptions = {
  setFormError: UseFormSetError<ComplaintForm>
  onSuccess?: () => void
}

export function useUpdateComplaint({
  setFormError,
  onSuccess,
}: UseUpdateComplaintOptions) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateComplaint,
    onSuccess: () => {
      toast.success('Berhasil!', {
        description: 'Pengajuan berhasil diperbarui.',
      })
      queryClient.invalidateQueries({ queryKey: ['complaints'] })
      onSuccess?.()
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data?.errors) {
        Object.entries(error.response.data.errors).forEach(
          ([field, message]) => {
            setFormError(field as FieldPath<ComplaintForm>, {
              type: 'server',
              message: message,
            })
          }
        )
      } else {
        toast.error('Gagal membuat pengajuan', {
          description:
            error.response?.data?.message ||
            'Terjadi kesalahan, silakan coba lagi.',
        })
      }
    },
  })
}
