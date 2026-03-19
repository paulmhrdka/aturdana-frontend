'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { DateRangeKey } from '@/lib/date-range'

const DATE_RANGE_OPTIONS: { value: DateRangeKey; label: string }[] = [
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'this_year', label: 'This Year' },
]

interface DateRangeSelectProps {
  value: DateRangeKey
  onChange: (key: DateRangeKey) => void
}

export function DateRangeSelect({ value, onChange }: DateRangeSelectProps) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as DateRangeKey)}>
      <SelectTrigger className="w-[160px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {DATE_RANGE_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
