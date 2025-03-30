"use client"
import Image from "next/image"
import {
  Sparkles,
} from "lucide-react"
import { useRef } from "react"
import { useInView } from "framer-motion"
export default function TestimonialsSection() {
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