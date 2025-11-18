import { useQuery } from '@tanstack/react-query'
import { getComplaintsByStatus } from '@/features/home/data/api'

export function useComplaintsByStatus(
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED'
) {
  return useQuery({
    queryKey: ['complaints', 'status', status],
    queryFn: () => getComplaintsByStatus(status),
  })
}
