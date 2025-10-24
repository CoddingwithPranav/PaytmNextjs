"use client"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { type Transaction, TransactionItem, TransactionItemSkeleton } from "./transaction-item"
import Link from "next/link"
import { useEffect, useState } from "react"


interface RecentTransactionsProps {
  transactions: Transaction[]
  limit?: number
  loading?: boolean
}

export function RecentTransactions({ transactions, limit = 5, loading = false }: RecentTransactionsProps) {
  const [isLoading, setIsLoading] = useState(loading)
  const displayTransactions = transactions.slice(0, limit)

  // If loading prop is not provided, simulate loading for demo purposes
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 1800)

      return () => clearTimeout(timer)
    }
  }, [loading])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1 divide-y">
          {isLoading
            ? Array.from({ length: limit }).map((_, i) => <TransactionItemSkeleton key={i} />)
            : displayTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} showStatus />
              ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full rounded-full hover-scale">
          <Link href="/transactions">View All Transactions</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

