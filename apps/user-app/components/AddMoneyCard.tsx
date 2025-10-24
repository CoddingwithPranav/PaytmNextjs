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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Building, Landmark, CreditCard } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl: "https://netbanking.hdfcbank.com" },
  { name: "Axis Bank", redirectUrl: "https://www.axisbank.com/" },
];

export function AddMoney() {
  const [amount, setAmount] = useState("");
  const [transferType, setTransferType] = useState("own");
  const [number, setNumber] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
    <Card className="rounded-2xl border-0 shadow-lg overflow-hidden">
      {/* Header */}
      <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5 pb-6">
        <CardTitle className="text-xl font-semibold text-foreground">Transfer Details</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Choose where you want to send money
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Transfer Type */}
        <RadioGroup value={transferType} onValueChange={setTransferType} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: "own", icon: Building, title: "Own Accounts", desc: "Transfer between your accounts" },
            { value: "domestic", icon: Landmark, title: "Domestic Transfer", desc: "Send to other banks within the country" },
            { value: "international", icon: CreditCard, title: "International", desc: "Send money abroad" },
          ].map(({ value, icon: Icon, title, desc }) => (
            <label
              key={value}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                transferType === value
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <RadioGroupItem value={value} className="sr-only" />
              <Icon className="h-7 w-7 text-primary" />
              <span className="font-medium text-sm">{title}</span>
              <span className="text-xs text-muted-foreground text-center">{desc}</span>
            </label>
          ))}
        </RadioGroup>

        {/* Form Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* From Account */}
          <div className="space-y-2">
            <Label htmlFor="from-account">From Account</Label>
            <Select
              value={provider}
              onValueChange={(value) => {
                const bank = SUPPORTED_BANKS.find((x) => x.name === value);
                if (bank) {
                  setProvider(bank.name);
                  setRedirectUrl(bank.redirectUrl);
                }
              }}
            >
              <SelectTrigger id="from-account" className="rounded-xl h-12">
                <SelectValue placeholder="Select bank" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_BANKS.map((x) => (
                  <SelectItem key={x.name} value={x.name}>
                    {x.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* To Account / Recipient */}
          <div className="space-y-2">
            <Label htmlFor="to-account">
              {transferType === "own"
                ? "To Account"
                : transferType === "domestic"
                ? "Recipient Account"
                : "Recipient Details"}
            </Label>

            {transferType === "own" ? (
              <Select
                defaultValue="checking"
                onValueChange={(value) => {
                  const bank = SUPPORTED_BANKS.find((x) => x.name === value);
                  if (bank) {
                    setRedirectUrl(bank.redirectUrl);
                    setProvider(bank.name);
                  }
                }}
              >
                <SelectTrigger id="to-account" className="rounded-xl h-12">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_BANKS.map((x) => (
                    <SelectItem key={x.name} value={x.name}>
                      {x.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : transferType === "domestic" ? (
              <Input
                id="account-number"
                placeholder="Account Number"
                type="text"
                maxLength={10}
                className="rounded-xl h-12"
                onChange={(e) => setNumber(e.target.value)}
              />
            ) : (
              <div className="space-y-3">
                <Input id="swift-code" placeholder="SWIFT/BIC Code" className="rounded-xl h-12" />
                <Input id="iban" placeholder="IBAN" className="rounded-xl h-12" />
              </div>
            )}
          </div>

          {/* Recipient Name (Conditional) */}
          {(transferType === "domestic" || transferType === "international") && (
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="recipient-name">Recipient Name</Label>
              <Input id="recipient-name" placeholder="Full Name" className="rounded-xl h-12" />
            </div>
          )}

          {/* Amount */}
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-medium text-foreground">₹</span>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9 pr-3 rounded-xl h-12 text-lg font-medium"
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
          className="w-full bg-primary max-w-md mx-auto rounded-full h-12 text-base font-semibold hover:from-primary/90 hover:to-accent/90 text-white shadow-md transition-all hover:shadow-lg"
          disabled={!amount || !provider}
          onClick={async () => {
            await createOnRampTransaction(provider,(Number(amount) * 100).toString() );
            window.location.href = redirectUrl || "";
          }}
        >
          Add Money
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Transfers typically complete within 1–2 business days
        </p>
      </CardFooter>
    </Card>
  );
}