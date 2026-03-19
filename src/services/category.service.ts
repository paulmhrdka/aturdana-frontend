import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { categoriesResponseSchema } from '@/types/category.types'

export function useCategories(activeOnly = true) {
  return useQuery({
    queryKey: ['categories', { activeOnly }],
    queryFn: async () => {
      const response = await api.get('/api/categories', {
        params: activeOnly ? { is_active: true } : undefined,
      })
      const parsed = categoriesResponseSchema.parse(response.data)
      return parsed.data
    },
    staleTime: 5 * 60_000,
  })
}
