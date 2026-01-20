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

const INACTIVITY_TIMEOUT = 15 * 60 * 1000 // 15 minutes in milliseconds

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

  // Set up inactivity timeout
  useEffect(() => {
    if (!user) return

    let inactivityTimer: NodeJS.Timeout
    let lastActivityTime = Date.now()

    const resetInactivityTimer = () => {
      lastActivityTime = Date.now()
      clearTimeout(inactivityTimer)
      
      inactivityTimer = setTimeout(() => {
        console.log("[v0] User inactive for 15 minutes, logging out")
        setUser(null)
        localStorage.removeItem("safeswap_user")
        router.push("/")
      }, INACTIVITY_TIMEOUT)
    }

    // Activity event listeners
    const activityEvents = ["mousedown", "keydown", "scroll", "touchstart", "click"]
    
    const handleActivity = () => {
      resetInactivityTimer()
    }

    // Initialize timer
    resetInactivityTimer()

    // Add event listeners
    activityEvents.forEach((event) => {
      document.addEventListener(event, handleActivity)
    })

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer)
      activityEvents.forEach((event) => {
        document.removeEventListener(event, handleActivity)
      })
    }
  }, [user, router])

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
