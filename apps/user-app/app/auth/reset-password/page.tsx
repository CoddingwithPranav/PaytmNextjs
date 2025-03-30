"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, Loader2, Mail, Sparkles } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { SimpleThemeToggle } from "../../..//components/theme-toggle"

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-10">
          <Link href="/" className="flex items-center gap-2 hover-scale">
            <div className="bg-primary rounded-full p-1.5">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">StreamLine</span>
          </Link>
          <SimpleThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 bg-background/80 dark:bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-md border"
        >
          {!isSubmitted ? (
            <>
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-bold tracking-tighter">Reset your password</h1>
                <p className="text-muted-foreground reduced-contrast">
                  Enter your email address and we'll send you a link to reset your password
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10 hover-scale"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full hover-scale group relative overflow-hidden"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <span className="relative z-10">Send Reset Link</span>
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 relative z-10" />
                      <span className="absolute inset-0 bg-gradient-to-r from-primary to-secondary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 bg-secondary/30 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h2 className="text-xl font-bold">Check your email</h2>
              <p className="text-muted-foreground reduced-contrast">
                We've sent a password reset link to your email address. Please check your inbox.
              </p>
              <Button variant="outline" className="mt-4 rounded-full hover-scale" onClick={() => setIsSubmitted(false)}>
                Back to reset password
              </Button>
            </div>
          )}

          <div className="text-center pt-2">
            <Link
              href="/auth"
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-sm text-muted-foreground reduced-contrast">
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

