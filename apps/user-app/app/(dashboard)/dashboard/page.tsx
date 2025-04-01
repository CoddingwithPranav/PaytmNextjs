// "use client"
import { ArrowLeftRight, ArrowUpRight, CreditCard, DollarSign, Wallet } from "lucide-react"
import { Transaction } from "../../../components/transaction-item"
import { ChartTabs } from "../../../components/chart-tabs"
import { QuickTransfer } from "../../../components/quick-transfer"
import { RecentTransactions } from "../../../components/recent-transactions"
import { StatCard } from "../../../components/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { getServerSession } from "next-auth"
import { dbClient } from "@repo/db/client"
import { authOptions } from "../../lib/auth"


async function getBalance() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? Number(session.user.id) : null;
    if (!userId || isNaN(userId)) {
        return { amount: 0, locked: 0 }; // or []
    }
    const balance = await dbClient.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

// Sample transactions data
const transactions: Transaction[] = [
  {
    id: "1",
    type: "expense",
    category: "shopping",
    amount: 89.99,
    currency: "$",
    description: "Amazon Purchase",
    date: new Date(2023, 5, 15),
    status: "completed",
  },
  {
    id: "2",
    type: "income",
    category: "salary",
    amount: 2500.0,
    currency: "$",
    description: "Salary Deposit",
    date: new Date(2023, 5, 10),
    status: "completed",
  },
  {
    id: "3",
    type: "expense",
    category: "bills",
    amount: 120.5,
    currency: "$",
    description: "Electricity Bill",
    date: new Date(2023, 5, 8),
    status: "completed",
  },
  {
    id: "4",
    type: "transfer",
    category: "transfer",
    amount: 500.0,
    currency: "$",
    description: "Transfer to Savings",
    date: new Date(2023, 5, 5),
    status: "completed",
  },
  {
    id: "5",
    type: "expense",
    category: "food",
    amount: 35.75,
    currency: "$",
    description: "Grocery Store",
    date: new Date(2023, 5, 3),
    status: "completed",
  },
  {
    id: "6",
    type: "expense",
    category: "entertainment",
    amount: 15.99,
    currency: "$",
    description: "Netflix Subscription",
    date: new Date(2023, 5, 1),
    status: "pending",
  },
]

export default async function DashboardPage() {
  // const [loading, setLoading] = useState(true)
  const balance:{amount:number, locked:number} = await getBalance();

  console.log(balance)
  // // Simulate loading state
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false)
  //   }, 1500)

  //   return () => clearTimeout(timer)
  // }, [])

  // if (loading) {
  //   return (
  //     <div className="space-y-6">
  //       <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

  //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  //         {Array.from({ length: 4 }).map((_, i) => (
  //           <Card key={i} className="p-6">
  //             <div className="flex items-start justify-between">
  //               <div className="space-y-2">
  //                 <Skeleton className="h-4 w-24" />
  //                 <Skeleton className="h-8 w-32" />
  //                 <Skeleton className="h-3 w-20" />
  //               </div>
  //               <Skeleton className="h-10 w-10 rounded-full" />
  //             </div>
  //           </Card>
  //         ))}
  //       </div>

  //       <div className="grid gap-4 md:grid-cols-3">
  //         <LoadingCardWithCenteredSpinner className="md:col-span-3" />
  //       </div>

  //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  //         <LoadingCard className="md:col-span-1 lg:col-span-2" hasFooter rows={5} />
  //         <LoadingCard hasFooter />
  //       </div>

  //       <div className="grid gap-4 md:grid-cols-2">
  //         <LoadingCard rows={3} />
  //         <LoadingCard rows={3} />
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Balance"
          value={(balance.amount + balance.locked)/100}
          description="Across all accounts"
          icon={<Wallet className="h-5 w-5 text-primary" />}
          variant="primary"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Unlocked balance"
          value={balance.amount/100}
          description="This month"
          icon={<ArrowUpRight className="h-5 w-5 text-destructive" />}
          variant="outline"
          trend={{ value: 3, positive: false }}
        />
        <StatCard
          title="Locked Balance"
          value={balance.locked/100}
          description="This month"
          icon={<DollarSign className="h-5 w-5 text-highlight" />}
          variant="highlight"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Transfers"
          value="$1,500.00"
          description="This month"
          icon={<ArrowLeftRight className="h-5 w-5 text-secondary-foreground" />}
          variant="secondary"
          trend={{ value: 5, positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ChartTabs />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-1 lg:col-span-2">
          <RecentTransactions transactions={transactions} />
        </div>
        <div>
          <QuickTransfer />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bills</CardTitle>
            <CardDescription>Bills due in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Rent", amount: 1200, date: "June 30, 2023", icon: <CreditCard className="h-4 w-4" /> },
                { name: "Internet", amount: 79.99, date: "June 25, 2023", icon: <CreditCard className="h-4 w-4" /> },
                { name: "Phone", amount: 45.5, date: "July 5, 2023", icon: <CreditCard className="h-4 w-4" /> },
              ].map((bill, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">{bill.icon}</div>
                    <div>
                      <p className="font-medium">{bill.name}</p>
                      <p className="text-xs text-muted-foreground">Due {bill.date}</p>
                    </div>
                  </div>
                  <p className="font-medium">${bill.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Goals</CardTitle>
            <CardDescription>Track your progress towards financial goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Vacation", target: 5000, current: 3200, icon: "🏖️" },
                { name: "New Car", target: 20000, current: 8500, icon: "🚗" },
                { name: "Emergency Fund", target: 10000, current: 9800, icon: "🛡️" },
              ].map((goal, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{goal.icon}</span>
                      <span className="font-medium">{goal.name}</span>
                    </div>
                    <span className="text-sm font-medium">
                      ${goal.current} / ${goal.target}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right text-muted-foreground">
                    {Math.round((goal.current / goal.target) * 100)}% complete
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

