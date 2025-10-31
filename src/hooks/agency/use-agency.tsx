import { useQuery } from '@tanstack/react-query'
import { getAllAgencies } from '@/features/agencies/data/api'

export const useAgencies = () => {
  return useQuery({
    queryKey: ['agencies'],
    queryFn: getAllAgencies,
  })
}