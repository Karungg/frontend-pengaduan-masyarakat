import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteAdmin } from '@/features/admins/data/api'

export const useDeleteAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      toast.success('Admin deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['admins'] })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete admin.')
    },
  })
}
