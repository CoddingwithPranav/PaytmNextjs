import { Skeleton } from "@repo/ui/components/ui/skeleton"
import { cn } from "@repo/ui/utils"
import { formatDistanceToNow } from "date-fns"
import { ArrowDownLeft, ArrowUpRight, CreditCard, Landmark, ShoppingBag, Smartphone } from "lucide-react"

export type TransactionType = "income" | "expense" | "transfer"
export type TransactionCategory =
  | "shopping"
  | "food"
  | "entertainment"
  | "bills"
  | "transport"
  | "salary"
  | "transfer"
  | "other"

export interface Transaction {
  id: string
  type: TransactionType
  category: TransactionCategory
  amount: number
  currency: string
  description: string
  date: Date
  recipient?: string
  sender?: string
  status?: "completed" | "pending" | "failed"
}

interface TransactionItemProps {
  transaction: Transaction
  showStatus?: boolean
  className?: string
}

export function TransactionItem({ transaction, showStatus = false, className }: TransactionItemProps) {
  const { type, category, amount, currency, description, date, status } = transaction

  const getCategoryIcon = (category: TransactionCategory) => {
    switch (category) {
      case "shopping":
        return <ShoppingBag className="h-4 w-4" />
      case "food":
        return <ShoppingBag className="h-4 w-4" />
      case "entertainment":
        return <ShoppingBag className="h-4 w-4" />
      case "bills":
        return <CreditCard className="h-4 w-4" />
      case "transport":
        return <ShoppingBag className="h-4 w-4" />
      case "salary":
        return <Landmark className="h-4 w-4" />
      case "transfer":
        return <Smartphone className="h-4 w-4" />
      default:
        return <ShoppingBag className="h-4 w-4" />
    }
  }

  return (
    <div className={cn("flex items-center justify-between py-3", className)}>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            type === "income" ? "bg-highlight/20" : type === "expense" ? "bg-destructive/20" : "bg-primary/20",
          )}
        >
          {type === "income" ? (
            <ArrowDownLeft className={cn("h-5 w-5", type === "income" ? "text-highlight" : "")} />
          ) : type === "expense" ? (
            <ArrowUpRight className="h-5 w-5 text-destructive" />
          ) : (
            getCategoryIcon(category)
          )}
        </div>
        <div>
          <p className="font-medium">{description}</p>
          <p className="text-xs text-muted-foreground">{formatDistanceToNow(date, { addSuffix: true })}</p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={cn(
            "font-medium",
            type === "income" ? "text-highlight" : type === "expense" ? "text-destructive" : "",
          )}
        >
          {type === "income" ? "+" : type === "expense" ? "-" : ""}
          {currency}
          {amount.toFixed(2)}
        </p>
        {showStatus && status && (
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              status === "completed"
                ? "bg-highlight/20 text-highlight"
                : status === "pending"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-destructive/20 text-destructive",
            )}
          >
            {status}
          </span>
        )}
      </div>
    </div>
  )
}

export function TransactionItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div>
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="text-right">
        <Skeleton className="h-4 w-16 mb-1 ml-auto" />
        <Skeleton className="h-3 w-12 ml-auto" />
      </div>
    </div>
  )
}

