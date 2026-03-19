'use client'

import { useTransactionSummary } from '@/services/transaction.service'
import type { DateRange } from '@/lib/date-range'

export function useRadarChart(dateRange: DateRange) {
  const { data, isLoading, isError } = useTransactionSummary({
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
  })

  const expenseCategories = isError
    ? []
    : (data?.by_category ?? []).filter((c) => c.type === 'expense')

  const radarData = expenseCategories.map((c) => ({
    category: c.category_name,
    total: c.total,
  }))

  return { radarData, isLoading, isEmpty: expenseCategories.length === 0 }
}
