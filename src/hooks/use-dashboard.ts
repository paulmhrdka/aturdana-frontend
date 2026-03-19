'use client'

import { useState } from 'react'
import { getDateRange, type DateRangeKey } from '@/lib/date-range'

export function useDashboard() {
  const [rangeKey, setRangeKey] = useState<DateRangeKey>('this_month')
  const dateRange = getDateRange(rangeKey)
  return { rangeKey, setRangeKey, dateRange }
}
