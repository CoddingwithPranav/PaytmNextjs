"use client";

import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight, Sparkles, Send, Wallet } from "lucide-react";

export default function CtaSection() {
  return (
    <section
      id="contact"
      className="relative flex justify-center  w-full py-12 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="container px-4 md:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-card/95 backdrop-blur-sm p-8 md:p-12 lg:p-16 transition-all duration-300">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary ring-1 ring-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Join 250M+ Indians</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-primary">Pay</span>
              <span className="text-foreground">tm</span> Today
            </h2>

            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              Send money, pay bills, earn cashback — all in one tap. Free forever.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row w-full max-w-md">
              <Button
                size="lg"
                className="rounded-full h-10 bg-primary text-primary-foreground hover:bg-primary/90 hover-scale font-medium shadow-lg flex-1"
              >
                <Send className="mr-2 h-5 w-5" />
                Download App
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-10 border-primary/20 text-primary hover:bg-primary/5 hover-scale flex-1"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Add Money
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              <span className="font-medium text-foreground">Zero fees</span> • Instant transfers •{" "}
              <span className="font-medium text-accent">Cashback guaranteed</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}