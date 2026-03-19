'use client'

import { useDashboard } from '@/hooks/use-dashboard'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { DateRangeSelect } from '@/components/dashboard/date-range-select'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { TrendChart } from '@/components/dashboard/trend-chart'
import { RadarChart } from '@/components/dashboard/radar-chart'
import { RecentTransactionsTable } from '@/components/dashboard/recent-transactions-table'

export default function DashboardPage() {
  const { rangeKey, setRangeKey, dateRange } = useDashboard()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <DateRangeSelect value={rangeKey} onChange={setRangeKey} />
      </div>

      <SummaryCards dateRange={dateRange} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TrendChart dateRange={dateRange} />
        <RadarChart dateRange={dateRange} />
      </div>

      <RecentTransactionsTable />
    </div>
  )
}
