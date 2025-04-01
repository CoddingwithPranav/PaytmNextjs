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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Building, Landmark, CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];
export function AddMoney() {
  const [amount, setAmount] = useState("");
  const [transferType, setTransferType] = useState("own");
  const [number, setNumber] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Details</CardTitle>
        <CardDescription>Choose where you want to send money</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          defaultValue="own"
          value={transferType}
          onValueChange={setTransferType}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              transferType === "own"
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
          >
            <RadioGroupItem value="own" id="own" className="sr-only" />
            <Label
              htmlFor="own"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <Building className="h-8 w-8 text-primary" />
              <span className="font-medium">Own Accounts</span>
              <span className="text-xs text-muted-foreground text-center">
                Transfer between your accounts
              </span>
            </Label>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              transferType === "domestic"
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
          >
            <RadioGroupItem
              value="domestic"
              id="domestic"
              className="sr-only"
            />
            <Label
              htmlFor="domestic"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <Landmark className="h-8 w-8 text-primary" />
              <span className="font-medium">Domestic Transfer</span>
              <span className="text-xs text-muted-foreground text-center">
                Send to other banks within the country
              </span>
            </Label>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              transferType === "international"
                ? "border-primary bg-primary/5"
                : "hover:bg-muted/50"
            }`}
          >
            <RadioGroupItem
              value="international"
              id="international"
              className="sr-only"
            />
            <Label
              htmlFor="international"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <CreditCard className="h-8 w-8 text-primary" />
              <span className="font-medium">International</span>
              <span className="text-xs text-muted-foreground text-center">
                Send money abroad
              </span>
            </Label>
          </div>
        </RadioGroup>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="from-account">From Account</Label>
            <Select
              defaultValue="checking"
              onValueChange={(value) => {
                setRedirectUrl(
                  SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl ||
                    ""
                );
                setProvider(
                  SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
                );
              }}
            >
              <SelectTrigger id="from-account">
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
          </div>

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
              setRedirectUrl(
                SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl ||
                  ""
              );
              setProvider(
                SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
              );
            }}
          >
            <SelectTrigger id="from-account">
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
              <div className="space-y-4">
                <Input
                  id="account-number"
                  placeholder="Account Number"
                  type="text"
                  maxLength={10}
                  onChange={(event) => {
                    setNumber(event.target.value);
                  }}
                />
                {/* <Input id="routing-number" placeholder="Routing Number" /> */}
              </div>
            ) : (
              <div className="space-y-4">
                <Input id="swift-code" placeholder="SWIFT/BIC Code" />
                <Input id="iban" placeholder="IBAN" />
              </div>
            )}
          </div>

          {(transferType === "domestic" ||
            transferType === "international") && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="recipient-name">Recipient Name</Label>
              <Input id="recipient-name" placeholder="Full Name" />
            </div>
          )}

          <div className="space-y-2 md:col-span-2">
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

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add a note about this transfer"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          className="w-96 rounded-full hover-scale group bg-purple-700 text-white relative overflow-hidden"
          onClick={async () => {
            console.log(provider,amount)
            await createOnRampTransaction(provider, amount);
            window.location.href = redirectUrl || "";
          }}
        >
          Add Money
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Transfers typically complete within 1-2 business days
        </p>
      </CardFooter>
    </Card>
  );
}
