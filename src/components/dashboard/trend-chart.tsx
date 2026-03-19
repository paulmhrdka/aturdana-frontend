'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartContainer, type ChartConfig } from '@/components/ui/chart'
import { useTrendChart } from '@/hooks/use-trend-chart'
import { formatRupiah } from '@/lib/utils'
import type { DateRange } from '@/lib/date-range'

const chartConfig: ChartConfig = {
  income: { label: 'Income', color: '#22c55e' },
  expense: { label: 'Expense', color: '#ef4444' },
}

interface TrendChartProps {
  dateRange: DateRange
}

export function TrendChart({ dateRange }: TrendChartProps) {
  const { chartData, isLoading } = useTrendChart(dateRange)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-50 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Income vs Expense — {dateRange.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-55 w-full">
          <AreaChart data={chartData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" tick={{ fontSize: 11 }} />
            <YAxis
              tickFormatter={(v) => formatRupiah(v as number).replace('Rp\u00a0', '').replace('Rp ', '')}
              tick={{ fontSize: 10 }}
              width={80}
            />
            <Tooltip formatter={(value: number) => formatRupiah(value)} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="var(--color-income)"
              fill="var(--color-income)"
              fillOpacity={0.2}
              name="Income"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="var(--color-expense)"
              fill="var(--color-expense)"
              fillOpacity={0.2}
              name="Expense"
            />
          </AreaChart>
        </ChartContainer>
        <div className="mt-3 flex items-center justify-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-xs text-muted-foreground">Expense</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
