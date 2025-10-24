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
        {/* Mobile: Vertical Tabs */}
        <div className="block md:hidden">
          <TabsList className="flex flex-col w-full rounded-xl bg-muted/50 p-1 gap-1">
            <TabsTrigger
              value="transfer"
              className="w-full rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Send Now
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="w-full rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Desktop: Horizontal Tabs */}
        <div className="hidden md:block">
          <TabsList className="inline-flex w-auto rounded-full bg-muted/50 p-1">
            <TabsTrigger
              value="transfer"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
            >
              Send Now
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6"
            >
              History
            </TabsTrigger>
          </TabsList>
        </div>

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