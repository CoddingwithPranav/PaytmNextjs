import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/components/ui/card";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
        status: string,
        provider: string
    }[] | null
}) => {
     if (!transactions?.length) {
            return <Card title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent transactions
                </div>
            </Card>
    }
    
    return ( 
    <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
          <CardDescription>View your past transfers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions?.map((transfer) => (
              <div key={transfer.time.toDateString()} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">To: </p>
                  <p className="text-sm text-muted-foreground">
                    ${transfer.amount/100} • {transfer.time.toDateString()}
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-highlight/20 text-highlight">
                  {transfer.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      )
}
