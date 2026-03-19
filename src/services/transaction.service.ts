import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { transactionsResponseSchema, summaryResponseSchema, dailySummaryResponseSchema } from '@/types/transaction.types'
import type { TransactionQueryParams, SummaryQueryParams } from '@/types/transaction.types'

export const transactionKeys = {
  all: ['transactions'] as const,
  list: (params: TransactionQueryParams) => [...transactionKeys.all, 'list', params] as const,
  summary: (params: SummaryQueryParams) => [...transactionKeys.all, 'summary', params] as const,
  trend: (params: SummaryQueryParams) => [...transactionKeys.all, 'trend', params] as const,
}

export function useTransactions(params: TransactionQueryParams) {
  return useQuery({
    queryKey: transactionKeys.list(params),
    queryFn: async () => {
      const response = await api.get('/api/transactions', { params })
      const parsed = transactionsResponseSchema.parse(response.data)
      return parsed
    },
  })
}

export function useTransactionSummary(params: SummaryQueryParams) {
  return useQuery({
    queryKey: transactionKeys.summary(params),
    queryFn: async () => {
      const response = await api.get('/api/transactions/summary', { params })
      const parsed = summaryResponseSchema.parse(response.data)
      return parsed.data
    },
    enabled: Boolean(params.start_date && params.end_date),
  })
}

export function useDailySummary(params: SummaryQueryParams) {
  return useQuery({
    queryKey: transactionKeys.trend(params),
    queryFn: async () => {
      const url = new URL('/api/transactions/daily-summary', window.location.origin)
      if (params.start_date) url.searchParams.set('start_date', params.start_date)
      if (params.end_date) url.searchParams.set('end_date', params.end_date)
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Failed to fetch daily summary')
      const json = await res.json()
      return dailySummaryResponseSchema.parse(json).data
    },
    enabled: Boolean(params.start_date && params.end_date),
  })
}

export function useTrendTransactions(params: SummaryQueryParams) {
  return useQuery({
    queryKey: transactionKeys.trend(params),
    queryFn: async () => {
      const response = await api.get('/api/transactions', {
        params: { ...params, limit: 100, sort_by: 'date', sort_order: 'asc' },
      })
      const parsed = transactionsResponseSchema.parse(response.data)
      return parsed.data
    },
    enabled: Boolean(params.start_date && params.end_date),
  })
}
