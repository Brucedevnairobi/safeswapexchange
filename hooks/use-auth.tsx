"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
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
  const router = useRouter()

  const login = useCallback((email: string) => {
    setUser({
      name: email.split("@")[0],
      email: email,
      image: undefined,
    })
    console.log("[v0] User logged in:", email)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    console.log("[v0] User logged out, redirecting to home")
    router.push("/")
  }, [router])

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
