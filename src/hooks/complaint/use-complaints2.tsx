import { getAllComplaints } from '@/features/complaints/data/api'
import { useQuery } from '@tanstack/react-query'

export function useComplaints2() {
  return useQuery({
    queryKey: ['complaints'],
    queryFn: getAllComplaints,
  })
}
