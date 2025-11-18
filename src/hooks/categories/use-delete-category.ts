import type { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ErrorResponse } from '@/config/api'
import { toast } from 'sonner'
import { deleteCategory } from '@/features/categories/data/api'

type UseDeleteCategoryOptions = {
  onSuccess?: () => void
}

export function useDeleteCategory({
  onSuccess,
}: UseDeleteCategoryOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success('Berhasil!', {
        description: 'Kategori berhasil dihapus.',
      })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      onSuccess?.()
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error('Gagal menghapus kategori', {
        description:
          error.response?.data?.message ||
          'Terjadi kesalahan, silakan coba lagi.',
      })
    },
  })
}
