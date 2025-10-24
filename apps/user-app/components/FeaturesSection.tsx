"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  Send,
  Wallet,
  Shield,
  Zap,
  Users,
  Lock,
} from "lucide-react";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "Instant UPI Transfers",
      description: "Send money to any UPI ID or mobile number in seconds. Zero waiting.",
      icon: <Send className="h-6 w-6 text-primary" />,
    },
    {
      title: "Paytm Wallet",
      description: "Add money once, pay anywhere — bills, shops, online. Fast & secure.",
      icon: <Wallet className="h-6 w-6 text-accent" />,
    },
    {
      title: "100% Secure",
      description: "Bank-level encryption, PCI DSS compliant. Your money is always safe.",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      title: "Cashback & Rewards",
      description: "Earn cashback on every transaction. More you pay, more you save.",
      icon: <Zap className="h-6 w-6 text-accent" />,
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="features"
      className="relative flex justify-center w-full py-12 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-background via-background to-muted/30"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="container px-4 md:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary ring-1 ring-primary/20 hover-scale">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Why Millions Trust Paytm</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-primary">Pay</span>
            <span className="text-foreground">tm</span> Does It All
          </h2>

          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            From instant payments to rewards — everything you need in one app.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group-features group relative flex flex-col items-center p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-xl hover-lift transition-all duration-300"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {feature.description}
              </p>

              <Link
                href="#"
                className="mt-4 inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 transition-colors opacity-0 group-hover:opacity-100"
              >
                Learn more <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 text-sm text-muted-foreground">
            <Users className="h-5 w-5 text-accent" />
            <span>Used by</span>
            <span className="font-bold text-foreground">250M+</span>
            <span>Indians daily</span>
            <Lock className="h-5 w-5 text-primary" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}