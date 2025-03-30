"use client"
import Image from "next/image"
import { Button } from "@repo/ui/components/ui/button"
import {
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useTheme } from "next-themes"
import StaticNumber from "./StaticNumber"
export default function HeroSection() {
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