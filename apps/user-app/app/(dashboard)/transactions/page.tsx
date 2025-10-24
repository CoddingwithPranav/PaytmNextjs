import { dbClient } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { Transaction } from "../../../components/transaction-item"
import { TransactionsPageList } from "../../../components/TranscationPageList"
import { authOptions } from "../../lib/auth";

async function getOnRampTransactions():Promise<any> {
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
      id:new Date(),
      type:"dummy",
      category:"testCategory",
      date: t.startTime,
      amount: t.amount,
      currency:"RS",
      description:"test 1",
      status: t.status,
      provider: t.provider
  }))
}

export default async function TransactionsPage() {
  
  const transactions:Transaction[] = await getOnRampTransactions();
  return ( 
   <TransactionsPageList allTransactions={transactions}/>
  )
}

