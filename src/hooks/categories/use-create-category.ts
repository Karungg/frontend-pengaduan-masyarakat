import type { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ErrorResponse } from '@/config/api'
import { toast } from 'sonner'
import { createCategory } from '@/features/categories/data/api'

type UseCreateCategoryOptions = {
  onSuccess?: () => void
}

export function useCreateCategory({
  onSuccess,
}: UseCreateCategoryOptions = {}) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success('Berhasil!', {
        description: 'Kategori berhasil dibuat.',
      })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      onSuccess?.()
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error('Gagal membuat kategori', {
        description:
          error.response?.data?.message ||
          'Terjadi kesalahan, silakan coba lagi.',
      })
    },
  })
}
