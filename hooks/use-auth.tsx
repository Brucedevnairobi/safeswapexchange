"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  name: string
  email: string
  image?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const router = useRouter()

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("safeswap_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
        console.log("[v0] User restored from localStorage")
      }
    } catch (error) {
      console.error("[v0] Failed to restore user from localStorage:", error)
      localStorage.removeItem("safeswap_user")
    }
    setIsHydrated(true)
  }, [])

  const login = useCallback((email: string) => {
    const newUser = {
      name: email.split("@")[0],
      email: email,
      image: undefined,
    }
    setUser(newUser)
    localStorage.setItem("safeswap_user", JSON.stringify(newUser))
    console.log("[v0] User logged in:", email)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("safeswap_user")
    console.log("[v0] User logged out, redirecting to home")
    router.push("/")
  }, [router])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {isHydrated ? children : null}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
