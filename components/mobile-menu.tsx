"use client"
import Link from "next/link"
import type React from "react"

import { X, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    onClose()

    // Add a small delay to ensure the menu closes before scrolling
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        // Adjust for the fixed header height
        const headerHeight = 64 // 16 * 4 = 64px (h-16)
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 300)
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">Ufarms UK</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </Button>
      </div>
      <nav className="container px-4 grid gap-6 py-8">
        <Link
          href="#about"
          className="flex items-center text-lg font-medium hover:text-primary"
          onClick={(e) => handleLinkClick(e, "#about")}
        >
          About
        </Link>
        <Link
          href="#features"
          className="flex items-center text-lg font-medium hover:text-primary"
          onClick={(e) => handleLinkClick(e, "#features")}
        >
          Features
        </Link>
        <Link
          href="#roadmap"
          className="flex items-center text-lg font-medium hover:text-primary"
          onClick={(e) => handleLinkClick(e, "#roadmap")}
        >
          Roadmap
        </Link>
        <Link
          href="#solutions"
          className="flex items-center text-lg font-medium hover:text-primary"
          onClick={(e) => handleLinkClick(e, "#solutions")}
        >
          Solutions
        </Link>
        <Link
          href="#beta-program"
          className="flex items-center text-lg font-medium hover:text-primary"
          onClick={(e) => handleLinkClick(e, "#beta-program")}
        >
          Beta Program
        </Link>
        <Link
          href="#contact"
          className="flex items-center text-lg font-medium hover:text-primary"
          onClick={(e) => handleLinkClick(e, "#contact")}
        >
          Contact
        </Link>
        <div className="mt-4 space-y-2 py-2 border-t border-muted">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-primary flex-shrink-0" />
            <a href="mailto:hello@ufarms.io" className="hover:text-primary">
              hello@ufarms.io
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-primary flex-shrink-0" />
            <a href="tel:+447447146002" className="hover:text-primary">
              +44 7447 146002
            </a>
          </div>
          <Button
            className="w-full mt-2 flex items-center justify-center gap-2"
            onClick={() => (window.location.href = "mailto:hello@ufarms.io")}
          >
            <Mail className="h-4 w-4" />
            <span>Email Us</span>
          </Button>
        </div>
        <Button asChild className="mt-4">
          <Link href="#contact" onClick={(e) => handleLinkClick(e, "#contact")}>
            Get in Touch
          </Link>
        </Button>
      </nav>
    </div>
  )
}

