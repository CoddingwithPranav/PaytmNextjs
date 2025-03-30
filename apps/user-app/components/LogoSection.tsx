"use client"

import Image from "next/image"
import {  useRef } from "react"
import { useInView } from "framer-motion"

export default function LogoSection() {
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
