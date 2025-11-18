import type { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ErrorResponse } from '@/config/api'
import { toast } from 'sonner'
import { deleteComplaint } from '@/features/home/data/api'

type UseDeleteComplaintOptions = {
  onSuccess?: () => void
}

export function useDeleteComplaint({
  onSuccess,
}: UseDeleteComplaintOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComplaint,
    onSuccess: () => {
      toast.success('Berhasil!', {
        description: 'Pengajuan berhasil dihapus.',
      })
      queryClient.invalidateQueries({ queryKey: ['complaints'] })
      onSuccess?.()
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error('Gagal menghapus pengajuan', {
        description:
          error.response?.data?.message ||
          'Terjadi kesalahan, silakan coba lagi.',
      })
    },
  })
}
