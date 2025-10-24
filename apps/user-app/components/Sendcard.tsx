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
