import { useQuery } from '@tanstack/react-query'
import { getComplaintById } from '@/features/home/data/api'

export function useComplaint(id: string) {
  return useQuery({
    queryKey: ['complaints', id],
    queryFn: () => getComplaintById(id),
    enabled: !!id,
  })
}
