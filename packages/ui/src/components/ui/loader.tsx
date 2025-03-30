import type React from "react"
import { cn } from "../../lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const loaderVariants = cva("animate-spin rounded-full border-current border-t-transparent", {
  variants: {
    variant: {
      default: "text-primary",
      secondary: "text-secondary",
      highlight: "text-highlight",
      muted: "text-muted-foreground",
    },
    size: {
      xs: "h-3 w-3 border-2",
      sm: "h-4 w-4 border-2",
      default: "h-6 w-6 border-2",
      lg: "h-8 w-8 border-3",
      xl: "h-12 w-12 border-4",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loaderVariants> {
  fullScreen?: boolean
}

export function Loader({ className, variant, size, fullScreen, ...props }: LoaderProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center gap-2">
          <div className={cn(loaderVariants({ variant, size }), className)} {...props} />
          {props.children && <p className="text-sm text-muted-foreground animate-pulse">{props.children}</p>}
        </div>
      </div>
    )
  }

  return <div className={cn(loaderVariants({ variant, size }), className)} {...props} />
}

export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center">
      <Loader size="lg" />
      <p className="mt-4 text-muted-foreground animate-pulse">{message}</p>
    </div>
  )
}

export function ButtonLoader({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-block animate-spin rounded-full border-2 border-current border-t-transparent", className)}
      style={{ width: "1em", height: "1em" }}
      {...props}
    />
  )
}

