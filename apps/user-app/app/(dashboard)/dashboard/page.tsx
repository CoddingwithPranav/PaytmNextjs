import { Wallet, DollarSign } from "lucide-react";
import { getServerSession } from "next-auth";
import { dbClient } from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { StatCard } from "../../../components/stat-card";
import type { Transaction, TransactionCategory } from "../../../components/transaction-item";
import { RecentTransactions } from "../../../components/recent-transactions";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId || isNaN(userId)) {
    return { amount: 0, locked: 0 };
  }

  const balance = await dbClient.balance.findFirst({
    where: { userId },
    select: { amount: true, locked: true },
  });
  

  return {
    amount: (balance?.amount || 0) / 100,
    locked: (balance?.locked || 0) / 100,
  };
}

async function getRecentP2P() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;

  if (!userId || isNaN(userId)) return [];

  const sent = await dbClient.p2pTransfer.findMany({
    where: { fromUserId: userId },
    orderBy: { timestamp: "desc" },
    take: 5,
    include: { toUser: { select: { name: true } } },
  });

  const received = await dbClient.p2pTransfer.findMany({
    where: { toUserId: userId },
    orderBy: { timestamp: "desc" },
    take: 5,
    include: { fromUser: { select: { name: true } } },
  });


  const receivedTransactions: Transaction[] = received.map(t => ({
    id: t.id.toString(),
    type: "income",
    amount: t.amount / 100,
    description: `From ${t.fromUser.name}`,
    date: t.timestamp,
    status: "completed",
    category: "P2PIncome" as TransactionCategory,
    currency: "INR",
  }));

  const sentTransactions: Transaction[] = sent.map(t => ({
    id: t.id.toString(),
    type: "expense",
    amount: t.amount / 100,
    description: `To ${t.toUser.name}`,
    date: t.timestamp,
    status: "completed",
    category: "P2PExpense" as TransactionCategory,
    currency: "INR",
  }));

  return [...receivedTransactions, ...sentTransactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);
}

export default async function DashboardPage() {
  const balance = await getBalance();
  const recentP2P = await getRecentP2P();

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>

      {/* Balance Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Balance"
          value={balance.amount + balance.locked}
          description="Available + Locked"
          icon={<Wallet className="h-5 w-5 text-primary" />}
          variant="primary"
        />
        <StatCard
          title="Available"
          value={balance.amount}
          description="Ready to spend"
          icon={<DollarSign className="h-5 w-5 text-accent" />}
        />
        <StatCard
          title="Locked"
          value={balance.locked}
          description="In transit"
          icon={<Wallet className="h-5 w-5 text-muted-foreground" />}
          variant="outline"
        />
      </div>

      {/* Recent + Quick */}
      <div>
        <div >
          <RecentTransactions transactions={recentP2P} />
        </div>
      </div>
    </div>
  );
}