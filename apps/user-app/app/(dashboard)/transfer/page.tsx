import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { dbClient } from "@repo/db/client";
import { ScheduledTransfer } from "../../../components/scheduleTramsfer";
import { AddMoney } from "../../../components/AddMoneyCard";



async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId || isNaN(userId)) {
      return null;
  }
  const txns = await dbClient.onRampTransaction.findMany({
      where: {
          userId: userId
      }
  });
  return txns.map((t:any) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider
  }))
}

export default async function TransferPage() {
  const transactions = await getOnRampTransactions();

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
            <AddMoney/>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4 pt-4">
          <ScheduledTransfer/>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 pt-4">
         <OnRampTransactions transactions={transactions}/>
        </TabsContent>
      </Tabs>
    </div>
  )
}

