import type { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ErrorResponse } from '@/config/api'
import { toast } from 'sonner'
import { updateCategory } from '@/features/categories/data/api'

type UseUpdateCategoryOptions = {
  onSuccess?: () => void
}

export function useUpdateCategory({
  onSuccess,
}: UseUpdateCategoryOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (_, variables) => {
      toast.success('Berhasil!', {
        description: 'Kategori berhasil diperbarui.',
      })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['categories', variables.id] })
      onSuccess?.()
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error('Gagal memperbarui kategori', {
        description:
          error.response?.data?.message ||
          'Terjadi kesalahan, silakan coba lagi.',
      })
    },
  })
}
