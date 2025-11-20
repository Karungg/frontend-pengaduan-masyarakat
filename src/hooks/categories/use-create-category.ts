import { type AxiosError } from 'axios'
import { type UseFormSetError } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { handleFormErrors, type ApiErrorResponse } from '@/lib/api-utils'
import { createCategory } from '@/features/categories/data/api'
import { type CategoryForm } from '@/features/categories/data/schema'

type UseCreateCategoryOptions = {
  onSuccess?: () => void
  setFormError?: UseFormSetError<CategoryForm>
}

export function useCreateCategory({
  onSuccess,
  setFormError,
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
    onError: (error: AxiosError<ApiErrorResponse>) => {
      handleFormErrors(error, setFormError)
    },
  })
}
