"use client"
import { Button } from "@repo/ui/components/ui/button"
import {
  ArrowRight,
  Sparkles,
} from "lucide-react"
import {  useRef } from "react"
import { useInView } from "framer-motion"
export default function CtaSection() {
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
  