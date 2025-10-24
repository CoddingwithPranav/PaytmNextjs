"use client";

import { Sparkles, Star } from "lucide-react";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import Image from "next/image";

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Paytm made sending money to my family so easy. Just one tap and it’s done!",
      author: "Priya Sharma",
      role: "Homemaker, Mumbai",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote:
        "I use Paytm for all my shop payments. Cashback on every transaction — love it!",
      author: "Rajesh Kumar",
      role: "Shop Owner, Delhi",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "UPI transfers are instant. No more waiting for NEFT. Paytm is a lifesaver.",
      author: "Ananya Patel",
      role: "Freelancer, Bangalore",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="testimonials"
      className="relative flex justify-center w-full py-12 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-background via-background to-muted/20"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="container px-4 md:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary ring-1 ring-primary/20 hover-scale mx-auto">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Trusted by Millions</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-primary">Pay</span>
            <span className="text-foreground">tm</span> in Real Life
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            See why over 250 million Indians choose Paytm every day.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-card/90 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-xl hover-lift transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="italic text-muted-foreground leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="relative">
                  <Image
                    src={t.avatar  || "/placeholder.svg"}
                    alt={t.author}
                    width={56}
                    height={56}
                    className="rounded-full border-2 border-primary/20 group-hover:border-primary/40 transition-colors"
                  />
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white">✓</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{t.author}</h3>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">250M+</span> happy users •{" "}
            <span className="font-bold text-primary">4.8</span> average rating
          </p>
        </motion.div>
      </div>
    </section>
  );
}

  

