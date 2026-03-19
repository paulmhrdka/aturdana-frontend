export type DateRangeKey = 'this_month' | 'last_month' | 'last_3_months' | 'this_year'

export interface DateRange {
  start_date: string
  end_date: string
  label: string
}

function toUTCISOString(date: Date): string {
  return date.toISOString()
}

export function getDateRange(key: DateRangeKey): DateRange {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth()

  switch (key) {
    case 'this_month': {
      const start = new Date(Date.UTC(year, month, 1))
      const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999))
      return { start_date: toUTCISOString(start), end_date: toUTCISOString(end), label: 'This Month' }
    }
    case 'last_month': {
      const start = new Date(Date.UTC(year, month - 1, 1))
      const end = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999))
      return { start_date: toUTCISOString(start), end_date: toUTCISOString(end), label: 'Last Month' }
    }
    case 'last_3_months': {
      const start = new Date(Date.UTC(year, month - 2, 1))
      const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999))
      return { start_date: toUTCISOString(start), end_date: toUTCISOString(end), label: 'Last 3 Months' }
    }
    case 'this_year': {
      const start = new Date(Date.UTC(year, 0, 1))
      const end = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999))
      return { start_date: toUTCISOString(start), end_date: toUTCISOString(end), label: 'This Year' }
    }
  }
}

export function buildMonthRanges(
  dateRange: DateRange,
): { start_date: string; end_date: string; label: string; key: string }[] {
  const [startYear, startMonth] = dateRange.start_date.substring(0, 7).split('-').map(Number)
  const [endYear, endMonth] = dateRange.end_date.substring(0, 7).split('-').map(Number)
  const ranges = []
  let y = startYear
  let m = startMonth
  while (y < endYear || (y === endYear && m <= endMonth)) {
    const start = new Date(Date.UTC(y, m - 1, 1))
    const end = new Date(Date.UTC(y, m, 0, 23, 59, 59, 999))
    const key = `${y}-${String(m).padStart(2, '0')}`
    const label = start.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
    ranges.push({ start_date: start.toISOString(), end_date: end.toISOString(), label, key })
    m++
    if (m > 12) { m = 1; y++ }
  }
  return ranges
}

export function getLast6MonthsRange(): { start_date: string; end_date: string } {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = now.getUTCMonth()
  const start = new Date(Date.UTC(year, month - 5, 1))
  const end = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999))
  return { start_date: toUTCISOString(start), end_date: toUTCISOString(end) }
}

export function formatMonthLabel(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })
}
