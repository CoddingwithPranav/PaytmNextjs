"use client"
import Link from "next/link"
import Image from "next/image"
import {
  Sparkles,
  ArrowUpRight,
} from "lucide-react"
import {  useRef } from "react"
import {  useInView } from "framer-motion"
export default function FeaturesSection() {
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