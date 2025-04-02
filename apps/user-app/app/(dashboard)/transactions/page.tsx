import { dbClient } from "@repo/db/client";
import { getServerSession } from "next-auth";
import { Transaction } from "../../../components/transaction-item"
import { TransactionsPageList } from "../../../components/TranscationPageList"
import { authOptions } from "../../lib/auth";


// Sample transactions data
const allTransactions: Transaction[] = [
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
  {
    id: "7",
    type: "expense",
    category: "transport",
    amount: 45.0,
    currency: "$",
    description: "Uber Rides",
    date: new Date(2023, 4, 28),
    status: "completed",
  },
  {
    id: "8",
    type: "income",
    category: "other",
    amount: 150.0,
    currency: "$",
    description: "Freelance Work",
    date: new Date(2023, 4, 25),
    status: "completed",
  },
  {
    id: "9",
    type: "expense",
    category: "shopping",
    amount: 65.5,
    currency: "$",
    description: "Clothing Store",
    date: new Date(2023, 4, 20),
    status: "completed",
  },
  {
    id: "10",
    type: "expense",
    category: "food",
    amount: 28.75,
    currency: "$",
    description: "Restaurant",
    date: new Date(2023, 4, 18),
    status: "completed",
  },
  {
    id: "11",
    type: "transfer",
    category: "transfer",
    amount: 300.0,
    currency: "$",
    description: "Transfer to Investment",
    date: new Date(2023, 4, 15),
    status: "completed",
  },
  {
    id: "12",
    type: "income",
    category: "salary",
    amount: 2500.0,
    currency: "$",
    description: "Salary Deposit",
    date: new Date(2023, 4, 10),
    status: "completed",
  },
]

// export interface Transaction {
//   id: string
//   type: TransactionType
//   category: TransactionCategory
//   amount: number
//   currency: string
//   description: string
//   date: any
//   recipient?: string
//   sender?: string
//   status?: "completed" | "pending" | "failed"
// }

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
  
  const transactions:Transaction[] = await getOnRampTransactions() ?? allTransactions;
  return ( 
   <TransactionsPageList allTransactions={transactions}/>
  )
}

