import type React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@repo/ui/utils"

const statCardVariants = cva("rounded-lg border p-4 transition-all hover:shadow-md", {
  variants: {
    variant: {
      default: "bg-card",
      primary: "bg-primary/10 border-primary/20",
      highlight: "bg-highlight/10 border-highlight/20",
      secondary: "bg-secondary/20 border-secondary/30",
      outline: "bg-background hover:bg-muted/50",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string
  value: string | number
  icon?: React.ReactNode
  description?: string
  trend?: {
    value: number
    positive?: boolean
  }
  className?: string
}

export function StatCard({ title, value, icon, description, trend, variant, className }: StatCardProps) {
  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-1 text-2xl font-bold">{value}</h3>
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
          {trend && (
            <p
              className={cn(
                "mt-1 text-xs font-medium flex items-center",
                trend.positive ? "text-green-500" : "text-red-500",
              )}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
              <span className="text-muted-foreground ml-1">vs last month</span>
            </p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "rounded-full p-2",
              variant === "primary" && "bg-primary/20",
              variant === "highlight" && "bg-highlight/20",
              variant === "secondary" && "bg-secondary/30",
              variant === "default" && "bg-muted",
              variant === "outline" && "bg-muted",
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

