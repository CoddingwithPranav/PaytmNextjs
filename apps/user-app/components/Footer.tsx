

import Link from "next/link"
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Sparkles,
} from "lucide-react"



export default function Footer() {
    return (
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 hover-scale">
                <div className="bg-primary rounded-full p-1.5">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">StreamLine</span>
              </div>
              <p className="text-muted-foreground reduced-contrast">
                Streamline your workflow and boost productivity with our all-in-one platform.
              </p>
            </div>
  
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Roadmap"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Contact"],
              },
              {
                title: "Legal",
                links: ["Terms", "Privacy", "Cookies", "Licenses"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-lg font-medium">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground reduced-contrast">
              © {new Date().getFullYear()} StreamLine. All rights reserved.
            </p>
            <div className="flex gap-4">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 hover-scale"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">Social media</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  
  