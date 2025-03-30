import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui/components/ui/card"
import { Loader } from "@repo/ui/components/ui/loader"
import { Skeleton } from "@repo/ui/components/ui/skeleton"
import { cn } from "@repo/ui/utils"

interface LoadingCardProps {
  className?: string
  hasHeader?: boolean
  hasFooter?: boolean
  rows?: number
}

export function LoadingCard({ className, hasHeader = true, hasFooter = false, rows = 3 }: LoadingCardProps) {
  return (
    <Card className={cn("", className)}>
      {hasHeader && (
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
      )}
      <CardContent className="flex flex-col gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </CardContent>
      {hasFooter && (
        <CardFooter>
          <Skeleton className="h-9 w-full rounded-full" />
        </CardFooter>
      )}
    </Card>
  )
}

export function LoadingCardWithCenteredSpinner({ className }: { className?: string }) {
  return (
    <Card className={cn("flex items-center justify-center py-12", className)}>
      <div className="flex flex-col items-center gap-3">
        <Loader size="lg" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading data...</p>
      </div>
    </Card>
  )
}

