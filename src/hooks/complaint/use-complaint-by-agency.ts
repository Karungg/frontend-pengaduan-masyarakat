import { useQuery } from '@tanstack/react-query'
import { getComplaintsByAgency } from '@/features/home/data/api'

export function useComplaintsByAgency(agencyId: string) {
  return useQuery({
    queryKey: ['complaints', 'agency', agencyId],
    queryFn: () => getComplaintsByAgency(agencyId),
    enabled: !!agencyId,
  })
}
