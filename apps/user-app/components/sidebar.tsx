"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ArrowLeftRight,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: <Home className="h-5 w-5" />, active: pathname === "/dashboard" },
    { name: "Send", href: "/transfer", icon: <ArrowLeftRight className="h-5 w-5" />, active: pathname.startsWith("/transfer") },
    { name: "History", href: "/transactions", icon: <CreditCard className="h-5 w-5" />, active: pathname.startsWith("/transactions") },
    { name: "P2P", href: "/p2p", icon: <Users className="h-5 w-5" />, active: pathname.startsWith("/p2p") },
  ];

  const bottomNav = [
    { name: "Settings", href: "/profile", icon: <Settings className="h-5 w-5" />, active: pathname.startsWith("/profile") },
    { name: "Logout", href: "/auth", icon: <LogOut className="h-5 w-5" />, active: false },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col h-full p-6 pt-16">
            <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => router.push("/")}>
              <div className="bg-primary rounded-full p-1.5">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Paytm</span>
            </div>

            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t space-y-1">
              {bottomNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                  onClick={() => item.name === "Logout" && setMobileOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar – Fixed, Collapsible */}
      <aside className="hidden md:flex h-screen w-20 flex-col border-r bg-background transition-all duration-300 hover:w-64 group">
        <div className="flex h-16 items-center justify-center border-b px-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <div className="bg-primary rounded-full p-1.5">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold hidden group-hover:block transition-opacity">
              Paytm
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group/item relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {item.icon}
              <span className="absolute left-16 whitespace-nowrap opacity-0 group-hover/item:opacity-100 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="border-t p-3 space-y-1">
          {bottomNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group/item relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {item.icon}
              <span className="absolute left-16 whitespace-nowrap opacity-0 group-hover/item:opacity-100 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}