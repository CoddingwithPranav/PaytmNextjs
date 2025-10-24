"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { dbClient } from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
   try {
    
     const session = await getServerSession(authOptions);
    console.log("P2P Transfer initiated by user:", session?.user?.id, "to:", to, "amount:", amount);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await dbClient.user.findFirst({
        where: {
            number: to
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    const res =  await dbClient.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });

          await tx.balance.update({
            where: { userId: toUser.id },
            data: { amount: { increment: amount } },
          });
          
    });
    console.log("P2P Transfer successful:", res);
   } catch (error) {
    console.error("Error during P2P Transfer:", error);
   }
}