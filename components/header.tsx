"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Shield } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/hooks/use-auth"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user } = useAuth()

  const isSignedIn = !!user

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-poppins text-xl font-bold text-foreground">Safeswap</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#services"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            How It Works
          </Link>
          <Link href="#about" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isSignedIn ? (
            <UserNav />
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => setAuthModalOpen(true)}>
                Sign In
              </Button>
              <Button size="sm" onClick={() => setAuthModalOpen(true)}>
                Get Started
              </Button>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            <Link
              href="#services"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-foreground/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              {isSignedIn ? (
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-sm font-medium">My Account</span>
                  <UserNav />
                </div>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setAuthModalOpen(true)} className="w-full">
                    Sign In
                  </Button>
                  <Button size="sm" onClick={() => setAuthModalOpen(true)} className="w-full">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  )
}
