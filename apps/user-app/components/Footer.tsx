import Link from "next/link";
import { Sparkles, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center border-t bg-background/95 backdrop-blur-sm">
      <div className="container px-4 py-8 md:py-12 lg:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary rounded-full p-1.5 group-hover:scale-110 transition-transform">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Paytm</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              India’s #1 payments app. Send money, pay bills, earn cashback — all in one tap.
            </p>
            <div className="flex gap-3">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors hover-scale"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">Social media</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Send Money", "Pay Bills", "Recharge", "Wallet"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Support</h3>
            <ul className="space-y-2 text-sm">
              {["Help Center", "Contact Us", "Privacy Policy", "Terms of Use"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Paytm. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="font-medium text-primary">250M+</span> users
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}