"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeftRight,
  BarChart3,
  CreditCard,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Sparkles,
  Users,
  X,
} from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { cn } from "@repo/ui/utils"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
      active: pathname === "/dashboard",
    },
    {
      name: "Transfer",
      href: "/transfer",
      icon: <ArrowLeftRight className="h-5 w-5" />,
      active: pathname === "/dashboard/transfer",
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: <CreditCard className="h-5 w-5" />,
      active: pathname === "/dashboard/transactions",
    },
    {
      name: "P2P Transfer",
      href: "/p2p",
      icon: <Users className="h-5 w-5" />,
      active: pathname === "/dashboard/p2p",
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      active: pathname === "/dashboard/analytics",
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      active: pathname === "/dashboard/messages",
      badge: 3,
    },
  ]

  const bottomNavItems = [
    {
      name: "Settings",
      href: "/profile",
      icon: <Settings className="h-5 w-5" />,
      active: pathname === "/profile",
    },
    {
      name: "Logout",
      href: "/auth",
      icon: <LogOut className="h-5 w-5" />,
      active: false,
    },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden" onClick={toggleMobile}>
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden"
        >
          <div className="flex flex-col h-full p-6 pt-16">
            <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => router.push('/dashboard')} >
              <div className="bg-primary rounded-full p-1.5">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">StreamLine</span>
            </div>

            <nav className="space-y-1 flex-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-highlight text-highlight-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t space-y-1">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex h-screen flex-col border-r transition-all duration-300",
          expanded ? "w-64" : "w-20",
          className,
        )}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b">
          <div className={cn("flex items-center gap-2", !expanded && "justify-center w-full")}>
            <div className="bg-primary rounded-full p-1.5 flex-shrink-0">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            {expanded && <span className="text-xl font-bold cursor-pointer" onClick={() => router.push('/')}>StreamLine</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className={cn("hidden md:flex", !expanded && "hidden")}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 py-6 flex flex-col justify-between">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative group",
                  item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                {item.icon}
                {expanded && <span>{item.name}</span>}
                {!expanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {item.name}
                  </div>
                )}
                {item.badge && (
                  <span
                    className={cn(
                      "bg-highlight text-highlight-foreground text-xs font-medium px-2 py-0.5 rounded-full",
                      expanded ? "ml-auto" : "absolute -top-1 -right-1",
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="px-3 space-y-1 mt-auto">
            {bottomNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative group",
                  item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                {item.icon}
                {expanded && <span>{item.name}</span>}
                {!expanded && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

