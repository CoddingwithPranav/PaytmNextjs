"use client";

import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { SimpleThemeToggle } from "../components/theme-toggle";
import MobileNav from "./MobileNav";
import { useRouter } from "next/navigation";

interface AppBarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export default function Header({ user, onSignin, onSignout }: AppBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary rounded-full p-1.5 group-hover:scale-110 transition-transform">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">Paytm</span>
        </Link>

        <MobileNav />

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <div className="ml-2">
            <SimpleThemeToggle />
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={user ? onSignout : onSignin}
            className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover-scale transition-all"
          >
            {user ? "Logout" : "Login"}
          </Button>

          {user && (
            <Button
              onClick={() => router.push("/dashboard")}
              className="rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 hover-scale transition-all"
            >
              Dashboard
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}