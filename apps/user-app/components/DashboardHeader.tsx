"use client";
import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { SimpleThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
   const router = useRouter();
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      {/* Title */}
      <div className="text-xl font-semibold text-foreground">{title}</div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <SimpleThemeToggle />

        {/* User Menu – Paytm Style */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted/50 transition-colors">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent p-0.5">
                <div className="h-full w-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-sm font-bold text-primary">
                  JD
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 rounded-xl p-2 shadow-lg">
            <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium">
              John Doe
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm hover:bg-muted cursor-pointer"
              >
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem asChild>
              <div
                onClick={async () => {
                        await signOut()
                        router.push("/api/auth/signin")
                      }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-destructive hover:bg-destructive/5 cursor-pointer"
              >
                Log out
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}