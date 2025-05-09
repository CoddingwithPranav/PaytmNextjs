"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Download, Filter, Search } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Calendar } from "@repo/ui/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { cn } from "@repo/ui/utils"
import { Transaction, TransactionItem } from "./transaction-item"

export  function TransactionsPageList({ allTransactions }: { allTransactions: Transaction[] }){
    const [searchQuery, setSearchQuery] = useState("")
  const [transactionType, setTransactionType] = useState("all")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined
  })

  // Filter transactions based on search, type, and date range
  const filteredTransactions = allTransactions.filter((transaction) => {
    // Filter by search query
    const matchesSearch = transaction.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by transaction type
    const matchesType = transactionType === "all" || transaction.type === transactionType

    // Filter by date range
    let matchesDateRange = true
    if (dateRange.from) {
      matchesDateRange = transaction.date >= dateRange.from
    }
    if (dateRange.to) {
      matchesDateRange = matchesDateRange && transaction.date <= dateRange.to
    }

    return matchesSearch && matchesType && matchesDateRange
  })
    return (
        <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">View and manage your transaction history</p>
        </div>
  
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View all your past transactions</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search transactions..."
                    className="pl-8 w-[200px] md:w-[250px] rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
  
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-1 rounded-full">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <h4 className="font-medium">Filter Transactions</h4>
                      <div className="space-y-2">
                        <Label htmlFor="transaction-type">Transaction Type</Label>
                        <Select value={transactionType} onValueChange={setTransactionType}>
                          <SelectTrigger id="transaction-type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Transactions</SelectItem>
                            <SelectItem value="income">Income</SelectItem>
                            <SelectItem value="expense">Expenses</SelectItem>
                            <SelectItem value="transfer">Transfers</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
  
                      <div className="space-y-2">
                        <Label>Date Range</Label>
                        <div className="flex gap-2">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !dateRange.from && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.from ? format(dateRange.from, "PPP") : <span>From date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={dateRange.from}
                                onSelect={(date) => setDateRange((prev) => ({ ...prev, from: date }))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !dateRange.to && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange.to ? format(dateRange.to, "PPP") : <span>To date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={dateRange.to}
                                onSelect={(date) => setDateRange((prev) => ({ ...prev, to: date }))}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
  
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setTransactionType("all")
                            setDateRange({ from: undefined, to: undefined })
                          }}
                        >
                          Reset
                        </Button>
                        <Button>Apply Filters</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
  
                <Button variant="outline" className="gap-1 rounded-full">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expense">Expenses</TabsTrigger>
                <TabsTrigger value="transfer">Transfers</TabsTrigger>
              </TabsList>
  
              <div className="mt-4 space-y-1 divide-y">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} showStatus />
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No transactions found</p>
                  </div>
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
}