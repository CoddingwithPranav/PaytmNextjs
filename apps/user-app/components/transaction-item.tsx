import { Skeleton } from "@repo/ui/components/ui/skeleton";
import { cn } from "@repo/ui/utils";
import { formatDistanceToNow } from "date-fns";
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, Utensils, Film, Receipt, Bus, Landmark, Smartphone, MoreHorizontal } from "lucide-react";

export type TransactionType = "income" | "expense" | "transfer";
export type TransactionCategory = "shopping" | "food" | "entertainment" | "bills" | "transport" | "salary" | "transfer" | "other";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  currency: string;
  description: string;
  date: any;
  recipient?: string;
  sender?: string;
  status?: "completed" | "pending" | "failed";
}

interface TransactionItemProps {
  transaction: Transaction;
  showStatus?: boolean;
  className?: string;
}

export function TransactionItem({ transaction, showStatus = false, className }: TransactionItemProps) {
  const { type, category, amount, currency, description, date, status } = transaction;

  const getCategoryIcon = (category: TransactionCategory) => {
    console.log("Getting icon for category:", category);
    const iconClass = "h-4.5 w-4.5";
    switch (category) {
      case "shopping": return <ShoppingBag className={iconClass} />;
      case "food": return <Utensils className={iconClass} />;
      case "entertainment": return <Film className={iconClass} />;
      case "bills": return <Receipt className={iconClass} />;
      case "transport": return <Bus className={iconClass} />;
      case "salary": return <Landmark className={iconClass} />;
      case "transfer": return <Smartphone className={iconClass} />;
      default: return <MoreHorizontal className={iconClass} />;
    }
  };

  const isIncome = type === "income";
  const isExpense = type === "expense";

  return (
    <div
      className={cn(
        "group flex items-center justify-between p-4 rounded-2xl bg-card hover:bg-muted/50 transition-all duration-200 cursor-pointer",
        className
      )}
    >
      {/* Left: Icon + Details */}
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full shadow-sm transition-transform group-hover:scale-105",
            isIncome && "bg-gradient-to-br from-primary/10 to-accent/10",
            isExpense && "bg-destructive/10",
            type === "transfer" && "bg-primary/10"
          )}
        >
          {isIncome ? (
            <ArrowDownLeft className="h-5 w-5 text-primary" />
          ) : isExpense ? (
            <ArrowUpRight className="h-5 w-5 text-destructive" />
          ) : (
            <div className="text-primary">{getCategoryIcon(category)}</div>
          )}
        </div>

        <div className="space-y-0.5">
          <p className="font-semibold text-foreground text-sm">{description}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(date, { addSuffix: true })}
            {status && showStatus && (
              <span className="ml-2 inline-flex items-center">
                <span className="mx-1">•</span>
                <span className={cn(
                  "text-xs font-medium",
                  status === "completed" && "text-primary,text-primary",
                  status === "pending" && "text-yellow-600",
                  status === "failed" && "text-destructive"
                )}>
                  {status}
                </span>
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Right: Amount */}
      <div className="text-right">
        <p
          className={cn(
            "font-bold text-lg",
            isIncome && "text-primary",
            isExpense && "text-destructive",
            type === "transfer" && "text-foreground"
          )}
        >
          {isIncome ? "+" : isExpense ? "-" : ""}
          {currency}{amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export function TransactionItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-card">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <Skeleton className="h-6 w-20 ml-auto" />
    </div>
  );
}