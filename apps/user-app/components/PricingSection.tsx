import { Button } from "@repo/ui/components/ui/button";
import { CheckCircle, Sparkles, Wallet, Send, Shield } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Paytm Wallet",
      price: "Free",
      description: "Instant payments, cashback, and rewards — all in one wallet.",
      features: [
        "Unlimited UPI transfers",
        "Add money via bank or card",
        "Earn cashback on every spend",
        "Pay bills, recharge, shop",
      ],
      icon: <Wallet className="h-6 w-6 text-accent" />,
    },
    {
      name: "Paytm Pro",
      price: "₹99",
      description: "For power users — faster transfers, higher limits, priority support.",
      features: [
        "₹2 lakh daily transfer limit",
        "Zero fees on UPI transfers",
        "Priority 24/7 support",
        "Exclusive cashback offers",
        "Advanced transaction history",
      ],
      popular: true,
      icon: <Send className="h-6 w-6 text-primary" />,
    },
    {
      name: "Paytm Business",
      price: "Custom",
      description: "For shops & merchants — accept payments, manage sales, grow faster.",
      features: [
        "Accept UPI, cards, wallet",
        "Instant settlement to bank",
        "QR code & payment links",
        "Sales reports & analytics",
        "Dedicated business support",
      ],
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <section
      id="pricing"
      className="relative flex justify-center w-full py-12 md:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-background via-background to-muted/30"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="container px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-semibold text-primary ring-1 ring-primary/20 mx-auto">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Simple & Transparent</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-primary">Pay</span>
            <span className="text-foreground">tm</span> for Everyone
          </h2>

          <p className="max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
            Free for personal use. Pro for power users. Custom for businesses.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative flex flex-col p-6 rounded-2xl border ${
                plan.popular
                  ? "ring-2 ring-primary bg-gradient-to-br from-primary/5 to-accent/5"
                  : "border-border bg-card/90"
              } backdrop-blur-sm hover-lift transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-full bg-primary/10">{plan.icon}</div>
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  {plan.price !== "Free" && plan.price !== "Custom" && (
                    <span className="ml-1 text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 flex-1 mb-6">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full font-medium transition-all hover-scale ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-accent text-accent-foreground hover:bg-accent/90"
                }`}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Zero hidden fees</span> • Cancel anytime •{" "}
          <span className="font-medium text-primary">100% secure</span>
        </div>
      </div>
    </section>
  );
}