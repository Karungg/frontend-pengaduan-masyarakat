import { useQuery } from '@tanstack/react-query'
import { getComplaintsByUser } from '@/features/home/data/api'

export function useComplaintsByUser(userId: string) {
  return useQuery({
    queryKey: ['complaints', 'user', userId],
    queryFn: () => getComplaintsByUser(userId),
    enabled: !!userId,
  })
}
