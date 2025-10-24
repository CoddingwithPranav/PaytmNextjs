import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { dbClient } from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;

  if (!userId || isNaN(userId)) return [];

  const txns = await dbClient.onRampTransaction.findMany({
    where: { userId },
    orderBy: { startTime: "desc" },
    take: 50,
  });

  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const transactions = await getOnRampTransactions();

  return (
    <div className="container">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Transfer Money
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Instant, secure, and free
        </p>
      </header>

      {/* Tabs */}
      <Tabs defaultValue="transfer" className="w-full">
        {/* Content */}
        <div className="mt-6">
          <TabsContent value="transfer" className="mt-0">
            <div className="bg-card rounded-2xl border shadow-sm p-4 sm:p-6">
              <AddMoney />
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <div className="bg-card rounded-2xl border shadow-sm p-4 sm:p-6">
              <OnRampTransactions transactions={transactions} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}