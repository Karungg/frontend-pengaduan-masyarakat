import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteAgency } from '@/features/agencies/data/api'

export const useDeleteAgency = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAgency,
    onSuccess: () => {
      toast.success('Agency deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['agencies'] })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete agency.')
    },
  })
}
