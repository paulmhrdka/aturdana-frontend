'use client'

import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ChartContainer, type ChartConfig } from '@/components/ui/chart'
import { useRadarChart } from '@/hooks/use-radar-chart'
import type { DateRange } from '@/lib/date-range'

const chartConfig: ChartConfig = {
  total: { label: 'Amount', color: '#ef4444' },
}

interface RadarChartProps {
  dateRange: DateRange
}

export function RadarChart({ dateRange }: RadarChartProps) {
  const { radarData, isLoading, isEmpty } = useRadarChart(dateRange)

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

  if (isEmpty) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Expense by Category</CardTitle>
        </CardHeader>
        <CardContent className="flex h-55 items-center justify-center">
          <p className="text-sm text-muted-foreground">No expense data for this period</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Expense by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-55 w-full">
          <RechartsRadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value: number) => value.toLocaleString('id-ID')} />
            <Radar
              dataKey="total"
              stroke="var(--color-total)"
              fill="var(--color-total)"
              fillOpacity={0.3}
              name="Amount"
            />
          </RechartsRadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
