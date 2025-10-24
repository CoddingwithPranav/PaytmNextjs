"use client";

import Image from "next/image";
import { Button } from "@repo/ui/components/ui/button";
import { ArrowRight, Sparkles, Send, Wallet, Zap } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import StaticNumber from "./StaticNumber";

export default function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const { resolvedTheme } = useTheme();

  return (
    <section className="relative flex justify-center w-full py-12 md:py-20 lg:py-28 xl:py-36 overflow-hidden bg-gradient-to-b from-background to-background/95">
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      <div className="container px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary ring-1 ring-primary/20 hover-scale">
              <Sparkles className="h-3.5 w-3.5" />
              <span>India’s #1 Payments App</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="text-primary">Pay</span>
                <span className="text-foreground">tm</span>
                <br />
                <span className="text-foreground/80">Money Transfer</span>
              </h1>
              <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
                Send money instantly to anyone using UPI, mobile number, or bank account. Safe, fast, and 100% secure.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover-scale shadow-lg px-8 group"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Money
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-primary/20 text-primary hover:bg-primary/5 hover-scale"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Add Money
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-background bg-gradient-to b from-primary to-accent p-0.5"
                    >
                      <div className="h-full w-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-xs font-bold text-primary">
                        {i + 1}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <StaticNumber number={250} suffix="M+" className="font-bold text-foreground" />
                  <span className="text-muted-foreground"> users</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-4 w-4 text-accent" />
                <span>Instant • 24/7 • Zero Fees</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto lg:mx-0 lg:order-last"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/10 to-transparent blur-3xl opacity-70" />
            
            <div className="relative hover-lift transition-all duration-300">
              <img
                src={"https://i.nextmedia.com.au/News/paytm.jpeg"}
                alt="Paytm Money Transfer Interface"
                width={600}
                height={600}
                className="w-full max-w-md mx-auto drop-shadow-2xl rounded-2xl object-contain lg:max-w-none"
              />
            </div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-xl border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">₹500 sent</p>
                  <p className="text-xs text-muted-foreground">to Mom</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bg-yellow-400 -bottom-8 -right-4 bg-gradient-to-br from-accent to-primary p-4 rounded-2xl shadow-xl text-gray-800"
            >
              <p className="text-sm font-bold">+₹100 Cashback</p>
              <p className="text-xs opacity-90">on first transfer</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}