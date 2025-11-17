import { useQuery } from '@tanstack/react-query'
import { getAllComplaints } from '@/features/home/data/api'

export function useComplaints() {
  return useQuery({
    queryKey: ['complaints'],
    queryFn: getAllComplaints,
  })
}
