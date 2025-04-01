"use client";

import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { SimpleThemeToggle } from "../components/theme-toggle";
import MobileNav from "./MobileNav";
import { useRouter } from "next/navigation";

interface AppbarProps {
  user?: {
      name?: string | null;
  },
  // TODO: can u figure out what the type should be here?
  onSignin: ()=>void,
  onSignout: ()=>void,
}
export default function Header({ user, onSignin, onSignout }:AppbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter()

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
        isScrolled ? "navbar-bg shadow-sm" : "navbar-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 hover-scale">
          <div className="bg-primary rounded-full p-1.5">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">StreamLine</span>
        </div>

        <MobileNav />

        <nav className="hidden md:flex gap-6 items-center">
          {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium hover:text-primary transition-colors relative group"
            >
              {item}
              {/* <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-500 group-hover:w-full"></span> */}
            </Link>
          ))}

          <div className="ml-2">
            <SimpleThemeToggle />
          </div>
        </nav>

        <div className="hidden md:block">
          <Button className="rounded hover-scale bg-purple-700 text-white"  onClick={user ? onSignout : onSignin}>
              {user ? "Logout" : "Login"}
          </Button>
          {
            user && <Button className="rounded hover-scale bg-white text-purple-700 border-2 ml-2"  onClick={() => router.push('/dashboard')}  >
            Dashboard
           </Button>
          }
          
        </div>
      </div>
    </header>
  );
}
