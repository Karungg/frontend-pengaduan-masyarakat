import { useQuery } from '@tanstack/react-query'
import { getComplaintsByType } from '@/features/home/data/api'

export function useComplaintsByType(type: 'COMPLAINT' | 'ASPIRATION') {
  return useQuery({
    queryKey: ['complaints', 'type', type],
    queryFn: () => getComplaintsByType(type),
  })
}
