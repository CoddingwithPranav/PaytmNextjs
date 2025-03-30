import { Button } from "@repo/ui/components/ui/button"
import { X, Menu, Link } from "lucide-react"
import { useState } from "react"
import { SimpleThemeToggle } from "./theme-toggle"



export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false)
  
    return (
      <div className="md:hidden">
        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="p-2 hover-scale">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>
        {isOpen && (
          <div className="fixed top-16 left-0 w-full bg-background/95 dark:bg-card/95 backdrop-blur-md z-50 py-4 shadow-md">
            <nav className="flex flex-col gap-4 items-center">
              {["Features", "Testimonials", "Pricing", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <SimpleThemeToggle />
              <Button className="rounded-full hover-scale">Get Started</Button>
            </nav>
          </div>
        )}
      </div>
    )
  }