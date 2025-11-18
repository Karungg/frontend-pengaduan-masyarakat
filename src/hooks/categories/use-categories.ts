import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '@/features/categories/data/api'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: 1000 * 60 * 5,
  })
}
