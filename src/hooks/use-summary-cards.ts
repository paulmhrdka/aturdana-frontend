'use client'

import { useTransactionSummary } from '@/services/transaction.service'
import { formatRupiah } from '@/lib/utils'
import type { DateRange } from '@/lib/date-range'

export function useSummaryCards(dateRange: DateRange) {
  const { data, isLoading, isError } = useTransactionSummary({
    start_date: dateRange.start_date,
    end_date: dateRange.end_date,
  })

  const income = formatRupiah(isError ? 0 : (data?.totals.income ?? 0))
  const expense = formatRupiah(isError ? 0 : (data?.totals.expense ?? 0))
  const net = isError ? 0 : (data?.totals.net ?? 0)
  const netFormatted = formatRupiah(net)
  const isNetPositive = net >= 0

  return { income, expense, net, netFormatted, isNetPositive, isLoading }
}
