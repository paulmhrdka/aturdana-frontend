import { z } from 'zod'

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.enum(['income', 'expense']),
  is_active: z.boolean(),
  created_at: z.string(),
})

export const categoriesResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.array(categorySchema),
})

export type Category = z.infer<typeof categorySchema>
export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>
