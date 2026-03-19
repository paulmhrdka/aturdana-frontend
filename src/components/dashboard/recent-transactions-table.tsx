'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useRecentTransactions } from '@/hooks/use-recent-transactions'

export function RecentTransactionsTable() {
  const { transactions, isLoading, isError, refetch, formatDate, formatAmount } = useRecentTransactions()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-between py-2">
            <p className="text-sm text-destructive">Failed to load transactions</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>Retry</Button>
          </div>
        )}

        {!isLoading && !isError && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No transactions for this period
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-sm">{formatDate(tx.date)}</TableCell>
                    <TableCell>
                      <Badge variant={tx.type === 'income' ? 'default' : 'destructive'}>
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{tx.category}</TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">{tx.description}</TableCell>
                    <TableCell className="text-right text-sm font-medium">
                      {formatAmount(tx.amount)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
