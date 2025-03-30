// import { AddMoney } from "../../../components/AddMoneyCard";
// import { BalanceCard } from "../../../components/BalanceCard";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";
// import { dbClient } from "@repo/db/client";
// import { OnRampTransactions } from "../../../components/onRampTransaction";

// async function getBalance() {
//     const session = await getServerSession(authOptions);
//     const userId = session?.user?.id ? Number(session.user.id) : null;
//     if (!userId || isNaN(userId)) {
//         return { amount: 0, locked: 0 }; // or []
//     }
//     const balance = await dbClient.balance.findFirst({
//         where: {
//             userId: Number(session?.user?.id)
//         }
//     });
//     return {
//         amount: balance?.amount || 0,
//         locked: balance?.locked || 0
//     }
// }

// async function getOnRampTransactions() {
//     const session = await getServerSession(authOptions);
//     const userId = session?.user?.id ? Number(session.user.id) : null;
//     if (!userId || isNaN(userId)) {
//         return null;
//     }
//     const txns = await dbClient.onRampTransaction.findMany({
//         where: {
//             userId: userId
//         }
//     });
//     return txns.map((t:any) => ({
//         time: t.startTime,
//         amount: t.amount,
//         status: t.status,
//         provider: t.provider
//     }))
// }

// export default async function() {
//     const balance = await getBalance();
//     const transactions = await getOnRampTransactions();

//     return <div className="w-screen">
//         <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
//             Transfer
//         </div>
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
//             <div>
//                 <AddMoney />
//             </div>
//             <div>
//                 <BalanceCard amount={balance.amount} locked={balance.locked} />
//                 <div className="pt-4">
//                     <OnRampTransactions transactions={transactions} />
//                 </div>
//             </div>
//         </div>
//     </div>
// }


"use client"

import { useState } from "react"
import { ArrowRight, Building, CreditCard, Landmark } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Textarea } from "@repo/ui/components/ui/textarea"

export default function TransferPage() {
  const [amount, setAmount] = useState("")
  const [transferType, setTransferType] = useState("own")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transfer Money</h1>
        <p className="text-muted-foreground">Send money to your accounts or other people</p>
      </div>

      <Tabs defaultValue="transfer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="transfer" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Details</CardTitle>
              <CardDescription>Choose where you want to send money</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                defaultValue="own"
                value={transferType}
                onValueChange={setTransferType}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    transferType === "own" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="own" id="own" className="sr-only" />
                  <Label htmlFor="own" className="flex flex-col items-center gap-2 cursor-pointer">
                    <Building className="h-8 w-8 text-primary" />
                    <span className="font-medium">Own Accounts</span>
                    <span className="text-xs text-muted-foreground text-center">Transfer between your accounts</span>
                  </Label>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    transferType === "domestic" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="domestic" id="domestic" className="sr-only" />
                  <Label htmlFor="domestic" className="flex flex-col items-center gap-2 cursor-pointer">
                    <Landmark className="h-8 w-8 text-primary" />
                    <span className="font-medium">Domestic Transfer</span>
                    <span className="text-xs text-muted-foreground text-center">
                      Send to other banks within the country
                    </span>
                  </Label>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    transferType === "international" ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                  }`}
                >
                  <RadioGroupItem value="international" id="international" className="sr-only" />
                  <Label htmlFor="international" className="flex flex-col items-center gap-2 cursor-pointer">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <span className="font-medium">International</span>
                    <span className="text-xs text-muted-foreground text-center">Send money abroad</span>
                  </Label>
                </div>
              </RadioGroup>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="from-account">From Account</Label>
                  <Select defaultValue="checking">
                    <SelectTrigger id="from-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking Account - $8,250.50</SelectItem>
                      <SelectItem value="savings">Savings Account - $4,310.00</SelectItem>
                      <SelectItem value="investment">Investment Account - $12,500.75</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to-account">
                    {transferType === "own"
                      ? "To Account"
                      : transferType === "domestic"
                        ? "Recipient Account"
                        : "Recipient Details"}
                  </Label>

                  {transferType === "own" ? (
                    <Select defaultValue="savings">
                      <SelectTrigger id="to-account">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking Account - $8,250.50</SelectItem>
                        <SelectItem value="savings">Savings Account - $4,310.00</SelectItem>
                        <SelectItem value="investment">Investment Account - $12,500.75</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : transferType === "domestic" ? (
                    <div className="space-y-4">
                      <Input id="account-number" placeholder="Account Number" />
                      <Input id="routing-number" placeholder="Routing Number" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Input id="swift-code" placeholder="SWIFT/BIC Code" />
                      <Input id="iban" placeholder="IBAN" />
                    </div>
                  )}
                </div>

                {(transferType === "domestic" || transferType === "international") && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="recipient-name">Recipient Name</Label>
                    <Input id="recipient-name" placeholder="Full Name" />
                  </div>
                )}

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-8"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea id="description" placeholder="Add a note about this transfer" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button className="w-full rounded-full hover-scale group relative overflow-hidden">
                <span className="relative z-10">Continue</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Transfers typically complete within 1-2 business days
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Transfers</CardTitle>
              <CardDescription>Manage your upcoming transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "1",
                    to: "Savings Account",
                    amount: 500,
                    date: "June 30, 2023",
                    recurring: "Monthly",
                  },
                  {
                    id: "2",
                    to: "Investment Account",
                    amount: 1000,
                    date: "July 15, 2023",
                    recurring: "One-time",
                  },
                ].map((transfer) => (
                  <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">To: {transfer.to}</p>
                      <p className="text-sm text-muted-foreground">
                        ${transfer.amount} • {transfer.date} • {transfer.recurring}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transfer History</CardTitle>
              <CardDescription>View your past transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "1",
                    to: "Savings Account",
                    amount: 500,
                    date: "May 30, 2023",
                    status: "Completed",
                  },
                  {
                    id: "2",
                    to: "Investment Account",
                    amount: 1000,
                    date: "May 15, 2023",
                    status: "Completed",
                  },
                  {
                    id: "3",
                    to: "John Smith",
                    amount: 250,
                    date: "May 10, 2023",
                    status: "Completed",
                  },
                  {
                    id: "4",
                    to: "Utility Company",
                    amount: 120,
                    date: "May 5, 2023",
                    status: "Completed",
                  },
                ].map((transfer) => (
                  <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">To: {transfer.to}</p>
                      <p className="text-sm text-muted-foreground">
                        ${transfer.amount} • {transfer.date}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-highlight/20 text-highlight">
                      {transfer.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

