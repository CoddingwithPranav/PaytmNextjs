"use client"

import { Button } from "@repo/ui/components/ui/button"
import {
  CheckCircle,
  Sparkles,
} from "lucide-react"
import {  useRef } from "react"
import {  useInView } from "framer-motion"
export default function PricingSection() {
    const plans = [
      {
        name: "Starter",
        price: "$9",
        description: "Perfect for individuals and small teams just getting started.",
        features: ["Up to 5 team members", "Basic analytics", "24/7 email support", "5GB storage"],
      },
      {
        name: "Professional",
        price: "$29",
        description: "Ideal for growing teams that need more power and flexibility.",
        features: [
          "Up to 20 team members",
          "Advanced analytics",
          "Priority support",
          "25GB storage",
          "Custom integrations",
        ],
        popular: true,
      },
      {
        name: "Enterprise",
        price: "$99",
        description: "For large organizations with advanced needs and dedicated support.",
        features: [
          "Unlimited team members",
          "Enterprise analytics",
          "Dedicated account manager",
          "100GB storage",
          "Custom integrations",
          "Advanced security features",
        ],
      },
    ]
  
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.2 })
  
    return (
      <section
        id="pricing"
        className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30 dark:bg-secondary/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]"></div>
  
        <div className="container px-4 md:px-6 relative" ref={ref}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit gap-1 hover-scale">
              <Sparkles className="h-3 w-3" />
              <span>Pricing</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text animate-gradient dark:text-transparent">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed reduced-contrast">
                Choose the plan that's right for your team. All plans include a 14-day free trial.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative flex flex-col space-y-6 rounded-xl border ${plan.popular ? "gradient-border shadow-lg" : ""} bg-background/80 dark:bg-card/80 backdrop-blur-sm p-8 hover-lift`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-transform duration-300 hover:scale-105">
                    Most Popular
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-2 text-muted-foreground reduced-contrast">{plan.description}</p>
                </div>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-secondary-foreground" />
                      <span className="reduced-contrast">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="transition-transform hover:scale-105 active:scale-95 duration-300">
                  <Button
                    className={`mt-auto rounded-full w-full ${plan.popular ? "" : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  