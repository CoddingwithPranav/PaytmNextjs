"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Tabs } from "@repo/ui/components/ui/tabs";
import { Transaction, TransactionItem } from "./transaction-item";
import { Search } from "lucide-react";

export function TransactionsPageList({
  allTransactions,
}: {
  allTransactions: Transaction[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          View and manage your transaction history
        </p>
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="mt-4 space-y-1 divide-y">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    showStatus
                  />
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
  );
}
