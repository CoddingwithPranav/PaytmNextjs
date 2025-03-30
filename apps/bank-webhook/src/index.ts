import { dbClient } from "@repo/db/client";
import express from "express";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req:any, res:any) => {
    //TODO: Add zod validation here?ls
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    //TODO: Check if this onRampTxn is processing or not
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        await dbClient.$transaction([
            dbClient.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your dbClient
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            dbClient.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003, ()=>{
    console.log("Hdfc Server Started at 3003")
});