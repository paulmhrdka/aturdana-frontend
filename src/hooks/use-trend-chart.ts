'use client'

import { useQueries } from '@tanstack/react-query'
import { transactionKeys, useDailySummary } from '@/services/transaction.service'
import { summaryResponseSchema } from '@/types/transaction.types'
import { buildMonthRanges } from '@/lib/date-range'
import api from '@/lib/api'
import type { DateRange } from '@/lib/date-range'

function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00Z')
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

export function useTrendChart(dateRange: DateRange) {
  const monthRanges = buildMonthRanges(dateRange)
  const isDaily = monthRanges.length === 1

  const dailyResult = useDailySummary({
    start_date: isDaily ? dateRange.start_date : undefined,
    end_date: isDaily ? dateRange.end_date : undefined,
  })

  const monthlyResults = useQueries({
    queries: monthRanges.map((range) => ({
      queryKey: transactionKeys.summary({ start_date: range.start_date, end_date: range.end_date }),
      queryFn: async () => {
        const response = await api.get('/api/transactions/summary', {
          params: { start_date: range.start_date, end_date: range.end_date },
        })
        const parsed = summaryResponseSchema.parse(response.data)
        return parsed.data
      },
      enabled: !isDaily,
    })),
  })

  const isLoading = isDaily
    ? dailyResult.isLoading
    : monthlyResults.some((r) => r.isLoading)

  const chartData = isDaily
    ? (dailyResult.data ?? []).map((item) => ({
        label: formatDayLabel(item.date),
        income: item.income,
        expense: item.expense,
      }))
    : monthRanges.map((range, i) => ({
        label: range.label,
        income: monthlyResults[i].data?.totals.income ?? 0,
        expense: monthlyResults[i].data?.totals.expense ?? 0,
      }))

  return { chartData, isLoading }
}
