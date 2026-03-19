'use client'

import { useTransactions } from '@/services/transaction.service'
import { formatRupiah } from '@/lib/utils'
import { getDateRange } from '@/lib/date-range'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', { timeZone: 'UTC' })
}

export function useRecentTransactions() {
  const currentMonth = getDateRange('this_month')
  const { data, isLoading, isError, refetch } = useTransactions({
    start_date: currentMonth.start_date,
    end_date: currentMonth.end_date,
    limit: 10,
    sort_by: 'date',
    sort_order: 'desc',
  })

  const transactions = data?.data ?? []

  return {
    transactions,
    isLoading,
    isError,
    refetch,
    formatDate,
    formatAmount: formatRupiah,
  }
}
