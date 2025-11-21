import type { AxiosError } from 'axios'
import { type UseFormSetError } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { type ApiErrorResponse, handleFormErrors } from '@/lib/api-utils'
import { updateCategory } from '@/features/categories/data/api'
import { type CategoryForm } from '@/features/categories/data/schema'

type UseUpdateCategoryOptions = {
  onSuccess?: () => void
  setFormError?: UseFormSetError<CategoryForm>
}

export function useUpdateCategory({
  onSuccess,
  setFormError,
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
    onError: (error: AxiosError<ApiErrorResponse>) => {
      handleFormErrors(error, setFormError)
    },
  })
}
