// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "./lib/auth";

// export default async function Home() { 
//   const session = await getServerSession(authOptions);
//   if (session?.user) {
//     redirect('/dashboard')
//   } else {
//     redirect('/api/auth/signin')
//   }
// }
"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@repo/ui/components/ui/button"
import {
  ArrowRight,
  CheckCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { SimpleThemeToggle } from "../components/theme-toggle"
import { useTheme } from "next-themes"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col theme-transition">
      <Header />
      <main>
        <HeroSection />
        <LogoSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="p-2 hover-scale">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle Menu</span>
      </Button>
      {isOpen && (
        <div className="fixed top-16 left-0 w-full bg-background/95 dark:bg-card/95 backdrop-blur-md z-50 py-4 shadow-md">
          <nav className="flex flex-col gap-4 items-center">
            {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <SimpleThemeToggle />
            <Button className="rounded-full hover-scale">Get Started</Button>
          </nav>
        </div>
      )}
    </div>
  )
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "navbar-bg shadow-sm" : "navbar-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 hover-scale">
          <div className="bg-primary rounded-full p-1.5">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">StreamLine</span>
        </div>

        <MobileNav />

        <nav className="hidden md:flex gap-6 items-center">
          {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full"></span>
            </Link>
          ))}

          <div className="ml-2">
            <SimpleThemeToggle />
          </div>
        </nav>

        <div className="hidden md:block">
          <Button className="rounded-full hover-scale">
            <span className="relative z-10">Get Started</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

function StaticNumber({ number, suffix = "", className = "" }:any) {
  return (
    <span className={className}>
      {number}
      {suffix}
    </span>
  )
}

function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -500])
  const { resolvedTheme } = useTheme()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 gradient-bg overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{ y }}
        ></motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit gap-1 hover-scale">
              <Sparkles className="h-3 w-3" />
              <span>Introducing StreamLine 2.0</span>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <span className="gradient-text animate-gradient dark:text-transparent">Streamline</span>{" "}
                <span className="dark:text-white reduced-contrast">Your Workflow</span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl reduced-contrast">
                Boost productivity and simplify collaboration with our all-in-one platform. Designed for teams of all
                sizes.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1 rounded-full group relative overflow-hidden hover-scale">
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full hover-scale">
                Book a Demo
              </Button>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full border-2 border-background overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                  >
                    <Image
                      src={`/placeholder.svg?height=32&width=32&text=${i}`}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <StaticNumber number={500} suffix="+" className="font-medium text-foreground" /> teams already onboard
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/50 to-secondary/50 opacity-70 blur-xl dark:opacity-30"></div>
            <div className="relative hover-lift">
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Dashboard Preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-xl dark:border dark:border-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 border-y">
      <div className="container px-4 md:px-6" ref={ref}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-sm font-medium text-muted-foreground">TRUSTED BY INNOVATIVE COMPANIES</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="transition-transform hover:scale-110 duration-300">
                <Image
                  src={`/placeholder.svg?height=40&width=120&text=LOGO ${i}`}
                  alt={`Company ${i} logo`}
                  width={120}
                  height={40}
                  className="h-8 w-auto opacity-70 grayscale transition-all hover:grayscale-0 dark:invert"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      title: "Seamless Integration",
      description: "Connect with your favorite tools and services without any hassle.",
      icon: (
        <div className="p-2 bg-secondary rounded-full">
          <Image src="/placeholder.svg?height=48&width=48" width={48} height={48} alt="Integration icon" />
        </div>
      ),
    },
    {
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time, no matter where they are.",
      icon: (
        <div className="p-2 bg-secondary rounded-full">
          <Image src="/placeholder.svg?height=48&width=48" width={48} height={48} alt="Collaboration icon" />
        </div>
      ),
    },
    {
      title: "Advanced Analytics",
      description: "Gain valuable insights with our powerful analytics dashboard.",
      icon: (
        <div className="p-2 bg-secondary rounded-full">
          <Image src="/placeholder.svg?height=48&width=48" width={48} height={48} alt="Analytics icon" />
        </div>
      ),
    },
    {
      title: "Enterprise Security",
      description: "Rest easy knowing your data is protected with enterprise-grade security.",
      icon: (
        <div className="p-2 bg-secondary rounded-full">
          <Image src="/placeholder.svg?height=48&width=48" width={48} height={48} alt="Security icon" />
        </div>
      ),
    },
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30 dark:bg-secondary/10 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]"></div>

      <div className="container px-4 md:px-6 relative" ref={ref}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit gap-1 hover-scale">
            <Sparkles className="h-3 w-3" />
            <span>Powerful Features</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text animate-gradient dark:text-transparent">
              Everything You Need
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed reduced-contrast">
              Everything you need to manage your workflow efficiently and boost productivity.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border bg-background/80 dark:bg-card/80 backdrop-blur-sm p-6 shadow-sm hover-lift"
            >
              <div className="p-2 rounded-full hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-center reduced-contrast">{feature.description}</p>
              <div className="transition-all duration-300">
                <Link
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Learn more <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "StreamLine has completely transformed how our team works together. The real-time collaboration features are game-changing.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "The analytics dashboard gives us insights we never had before. We've been able to optimize our workflow and increase productivity by 30%.",
      author: "Michael Chen",
      role: "CTO at StartupX",
      avatar: "/placeholder.svg?height=64&width=64",
    },
    {
      quote:
        "Enterprise-grade security without enterprise-grade complexity. StreamLine makes it easy to keep our data safe.",
      author: "Emily Rodriguez",
      role: "Security Lead at SecureCo",
      avatar: "/placeholder.svg?height=64&width=64",
    },
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 gradient-bg dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900"
    >
      <div className="container px-4 md:px-6" ref={ref}>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit gap-1 hover-scale">
            <Sparkles className="h-3 w-3" />
            <span>Testimonials</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl gradient-text animate-gradient dark:text-transparent">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed reduced-contrast">
              Don't just take our word for it. Here's what our customers have to say about StreamLine.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between space-y-4 rounded-xl border bg-background/80 dark:bg-card/80 backdrop-blur-sm p-6 shadow-sm hover-lift"
            >
              <div className="space-y-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-primary"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground italic reduced-contrast">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="transition-transform hover:scale-110 duration-300">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-primary/20"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{testimonial.author}</h3>
                  <p className="text-sm text-muted-foreground reduced-contrast">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
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

function CtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 gradient-bg dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900"
    >
      <div className="container px-4 md:px-6" ref={ref}>
        <div className="relative rounded-2xl bg-secondary/20 dark:bg-secondary/10 p-8 md:p-12 lg:p-16 overflow-hidden hover-lift">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_70%)]"></div>

          <div className="relative flex flex-col items-center justify-center space-y-4 text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit gap-1 hover-scale">
              <Sparkles className="h-3 w-3" />
              <span>Get Started Today</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text animate-gradient dark:text-transparent">
                Ready to Streamline Your Workflow?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed reduced-contrast">
                Join thousands of teams that use StreamLine to boost productivity and simplify collaboration.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1 rounded-full group relative overflow-hidden hover-scale">
                <span className="relative z-10">Start Free Trial</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full hover-scale">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 hover-scale">
              <div className="bg-primary rounded-full p-1.5">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">StreamLine</span>
            </div>
            <p className="text-muted-foreground reduced-contrast">
              Streamline your workflow and boost productivity with our all-in-one platform.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Integrations", "Roadmap"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Contact"],
            },
            {
              title: "Legal",
              links: ["Terms", "Privacy", "Cookies", "Licenses"],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-lg font-medium">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground reduced-contrast">
            © {new Date().getFullYear()} StreamLine. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover-scale"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">Social media</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}


