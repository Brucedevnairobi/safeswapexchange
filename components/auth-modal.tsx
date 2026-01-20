"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/hooks/use-auth"
import { Shield, Mail, CheckCircle2, AlertCircle } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthStep = "login" | "signup" | "email-verify" | "kYC" | "complete"

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const { login } = useAuth()

  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue)
  }

  const validatePassword = (passwordValue: string) => {
    return passwordValue.length >= 6
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    
    if (!fullName || !email || !password) {
      setErrorMessage("Please fill in all fields")
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address")
      return
    }

    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      login(email)
      setSuccessMessage("Account created successfully! Welcome to Safeswap.")
      console.log("[v0] Signup successful for:", email)
      setTimeout(() => {
        onClose()
        setCurrentStep("login")
        setEmail("")
        setFullName("")
        setPassword("")
        setSuccessMessage("")
      }, 1500)
    }, 1000)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    
    if (!email || !password) {
      setErrorMessage("Please enter email and password")
      return
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      login(email)
      setSuccessMessage("Signed in successfully!")
      console.log("[v0] Sign in successful for:", email)
      setTimeout(() => {
        onClose()
        setCurrentStep("login")
        setEmail("")
        setPassword("")
        setSuccessMessage("")
      }, 1000)
    }, 1000)
  }

  const handleEmailVerification = async () => {
    // Placeholder for email verification logic
    console.log("Email verification code:", otp)
  }

  const handleKYCComplete = async () => {
    // Placeholder for KYC completion logic
    console.log("KYC completed")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px]">
        {/* Header */}
        <DialogHeader className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-bold">Welcome to Safeswap</DialogTitle>
          <DialogDescription>Secure your transactions with Kenya's most trusted escrow.</DialogDescription>
        </DialogHeader>

        {/* Login/Signup Tabs */}
        <Tabs value={currentStep === "login" ? "login" : "signup"} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" onClick={() => { setCurrentStep("login"); setErrorMessage(""); setSuccessMessage(""); }}>
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" onClick={() => { setCurrentStep("signup"); setErrorMessage(""); setSuccessMessage(""); }}>
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Form */}
          <TabsContent value="login" className="space-y-4 pt-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              {errorMessage && (
                <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}
              {successMessage && (
                <div className="flex gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email Address</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input 
                  id="signin-password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Don't have an account? Switch to Sign Up tab
              </p>
            </form>
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="signup" className="space-y-4 pt-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              {errorMessage && (
                <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}
              {successMessage && (
                <div className="flex gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email Address</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">At least 6 characters</p>
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Already have an account? Switch to Sign In tab
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
