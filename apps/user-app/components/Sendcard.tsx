"use client";

import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Card,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import {  ArrowRight } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
export function SendCard() {
  const [amount, setAmount] = useState("");
  const [number, setNumber] = useState("");
  return (
    <Card>
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
            <CardDescription>Enter the amount and details for your transfer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* {selectedContactDetails ? (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Image
                  src={selectedContactDetails.avatar || "/placeholder.svg"}
                  alt={selectedContactDetails.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{selectedContactDetails.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedContactDetails.email}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg text-muted-foreground">
                <User className="h-5 w-5" />
                <span>Select a recipient from the list</span>
              </div>
            )} */}
             <div className="space-y-2">
              <Label htmlFor="amount">Number</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-muted-foreground">$</span>
                </div>
                <Input
                  id="amount"
                  type="number"
                  max={10}
                  placeholder="9999999999"
                  className="pl-8"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-muted-foreground">$</span>
                </div>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-8"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                placeholder="What's this payment for?"
                // value={note}
                // onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Transfer Method</Label>
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-highlight/20 mx-auto mb-2">
                    <svg className="h-5 w-5 text-highlight" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Instant</div>
                    <div className="text-xs text-muted-foreground">1.5% fee</div>
                  </div>
                </div>
                <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/20 mx-auto mb-2">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">Standard</div>
                    <div className="text-xs text-muted-foreground">1-2 days, free</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full rounded-full hover-scale group relative overflow-hidden"
              disabled={!number || !amount || amount === "0"}
            onClick={async () => {
                              await p2pTransfer(number, Number(amount) * 100)
                          }}>
              <span className="relative z-10">Send Money</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </Button>
          </CardFooter>
        </Card>
  );
}
