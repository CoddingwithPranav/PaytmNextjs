"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { dbClient } from "@repo/db/client";

export async function createOnRampTransaction(provider: string, amount: string) {
    // Ideally the token should come from the banking provider (hdfc/axis) //hit bank serve with user id and amout and get token 

    // const token = await axios.get("https://api.hdfc.com/getToken",{
    //     amount
    // })
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();
    await dbClient.onRampTransaction.create({
        data: {
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: Number(amount) * 100
        }
    });

    return {
        message: "Done"
    }
}
