import { z } from 'zod'

export const transactionTypeSchema = z.enum(['income', 'expense'])
export type TransactionType = z.infer<typeof transactionTypeSchema>

export const transactionSchema = z.object({
  id: z.number(),
  type: transactionTypeSchema,
  amount: z.number(),
  description: z.string(),
  category: z.string(),
  category_id: z.number(),
  date: z.string(),
  created_at: z.string(),
})

export const paginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  pages: z.number(),
})

export const transactionsResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: z.array(transactionSchema),
  pagination: paginationSchema,
})

export const categoryBreakdownSchema = z.object({
  category_id: z.number(),
  category_name: z.string(),
  type: transactionTypeSchema,
  total: z.number(),
  count: z.number(),
  percentage: z.number(),
})

export const summaryDataSchema = z.object({
  period: z.object({
    start_date: z.string(),
    end_date: z.string(),
  }),
  totals: z.object({
    income: z.number(),
    expense: z.number(),
    net: z.number(),
  }),
  by_category: z.array(categoryBreakdownSchema),
})

export const summaryResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  data: summaryDataSchema,
})

export type Transaction = z.infer<typeof transactionSchema>
export type Pagination = z.infer<typeof paginationSchema>
export type TransactionsResponse = z.infer<typeof transactionsResponseSchema>
export type CategoryBreakdown = z.infer<typeof categoryBreakdownSchema>
export type SummaryData = z.infer<typeof summaryDataSchema>
export type SummaryResponse = z.infer<typeof summaryResponseSchema>

export interface TransactionQueryParams {
  start_date?: string
  end_date?: string
  type?: TransactionType
  category_id?: number
  page?: number
  limit?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

export interface SummaryQueryParams {
  start_date?: string
  end_date?: string
}

export const dailySummaryItemSchema = z.object({
  date: z.string(),
  income: z.number(),
  expense: z.number(),
})

export const dailySummaryResponseSchema = z.object({
  data: z.array(dailySummaryItemSchema),
})

export type DailySummaryItem = z.infer<typeof dailySummaryItemSchema>
export type DailySummaryResponse = z.infer<typeof dailySummaryResponseSchema>
