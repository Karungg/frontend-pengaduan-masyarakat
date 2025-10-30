import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '@/features/admins/data/api'

export const useAdmins = () => {
  return useQuery({
    queryKey: ['admins'],
    queryFn: getAllUsers,
  })
}
