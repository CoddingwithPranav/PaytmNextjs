"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Building } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
];

export function AddMoney() {
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [toAccount, setToAccount] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);

  return (
    <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
      {/* Header */}
      <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5 pb-6">
        <CardTitle className="text-xl font-semibold text-foreground">Transfer to other Account</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Move money between your linked accounts
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Form Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* From Account */}
          <div className="space-y-2">
            <Label htmlFor="from-account">From Account</Label>
            <div className="relative">
              <select
                id="from-account"
                value={fromAccount}
                onChange={(e) => {
                  const bank = SUPPORTED_BANKS.find((x) => x.name === e.target.value);
                  if (bank) {
                    setFromAccount(bank.name);
                  }
                }}
                className={`
                  w-full h-12 px-4 pr-10 rounded-xl border border-input bg-background
                  text-foreground text-base font-medium
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                  focus:border-primary transition-all appearance-none cursor-pointer
                `}
              >
                <option value="" disabled>Select bank</option>
                {SUPPORTED_BANKS.map((bank) => (
                  <option key={bank.name} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* To Account */}
          <div className="space-y-2">
            <Label htmlFor="to-account">To Account</Label>
            <div className="relative">
              <select
                id="to-account"
                value={toAccount}
                onChange={(e) => {
                  const bank = SUPPORTED_BANKS.find((x) => x.name === e.target.value);
                  if (bank) {
                    setToAccount(bank.name);
                    setRedirectUrl(bank.redirectUrl);
                  }
                }}
                className={`
                  w-full h-12 px-4 pr-10 rounded-xl border border-input bg-background
                  text-foreground text-base font-medium
                  focus:outline-none focus:ring-2 focus:ring-primary/50
                  focus:border-primary transition-all appearance-none cursor-pointer
                `}
              >
                <option value="" disabled>Select account</option>
                {SUPPORTED_BANKS.map((bank) => (
                  <option key={bank.name} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-4 pr-3 rounded-xl h-12 text-lg font-medium"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a note about this transfer"
              className="rounded-xl min-h-24 resize-none"
            />
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-3 pt-4 bg-muted/30">
        <Button
          className="w-full max-w-md mx-auto rounded-full h-12 text-base font-semibold bg-primary text-white shadow-md transition-all hover:shadow-lg"
          disabled={!amount || !fromAccount || !toAccount || Number(amount) <= 0}
          onClick={async () => {
            await createOnRampTransaction(toAccount, (Number(amount) * 100).toString());
            window.location.href = redirectUrl || "";
          }}
        >
          Transfer Now
        </Button>
      </CardFooter>
    </Card>
  );
}