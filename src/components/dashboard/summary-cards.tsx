'use client'

import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useSummaryCards } from '@/hooks/use-summary-cards'
import type { DateRange } from '@/lib/date-range'

interface SummaryCardsProps {
  dateRange: DateRange
}

export function SummaryCards({ dateRange }: SummaryCardsProps) {
  const { income, expense, netFormatted, isNetPositive, isLoading } = useSummaryCards(dateRange)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-emerald-600">{income}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-destructive">{expense}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Net</CardTitle>
          <DollarSign className={`h-4 w-4 ${isNetPositive ? 'text-emerald-500' : 'text-destructive'}`} />
        </CardHeader>
        <CardContent>
          <p className={`text-2xl font-bold ${isNetPositive ? 'text-emerald-600' : 'text-destructive'}`}>
            {netFormatted}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
