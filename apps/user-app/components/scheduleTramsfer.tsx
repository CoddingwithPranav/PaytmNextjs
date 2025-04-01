import { Button } from "@repo/ui/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/components/ui/card";

export function ScheduledTransfer(){
    return (
        <Card>
            <CardHeader>
              <CardTitle>Scheduled Transfers</CardTitle>
              <CardDescription>Manage your upcoming transfers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "1",
                    to: "Savings Account",
                    amount: 500,
                    date: "June 30, 2023",
                    recurring: "Monthly",
                  },
                  {
                    id: "2",
                    to: "Investment Account",
                    amount: 1000,
                    date: "July 15, 2023",
                    recurring: "One-time",
                  },
                ].map((transfer) => (
                  <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">To: {transfer.to}</p>
                      <p className="text-sm text-muted-foreground">
                        ${transfer.amount} • {transfer.date} • {transfer.recurring}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
    )
}