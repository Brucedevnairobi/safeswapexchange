"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Search, ChevronRight, Shield, Bell, CreditCard, User, Mail, Smartphone, Globe, Copy, Key } from "lucide-react"
import { cn } from "@/lib/utils"

// implementing a vertical tabbed layout with deep-dark aesthetics and card-based sections

const SETTINGS_TABS = [
  { id: "general", label: "General", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "verification", label: "Verification", icon: Shield },
  { id: "api", label: "API Keys", icon: Key },
]

function SettingsContent() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="mx-auto max-w-[1200px] space-y-8 py-4">
      <div className="flex flex-col gap-2">
        <h1 className="font-poppins text-3xl font-bold tracking-tight">Account Settings</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Safeswap</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Settings</span>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[240px,1fr]">
        {/* Sidebar Navigation */}
        <aside className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="bg-muted/50 pl-9" placeholder="Search..." />
          </div>

          <nav className="space-y-1">
            {SETTINGS_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <main className="space-y-8">
          {activeTab === "general" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Display Name</CardTitle>
                  <CardDescription>Used to identify your account across the dashboard and in emails.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input defaultValue="John Doe" className="max-w-md bg-background" />
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Learn more about{" "}
                      <span className="text-primary hover:underline cursor-pointer">Display Names</span>
                    </span>
                    <Button size="sm">Save</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Account ID</CardTitle>
                  <CardDescription>Used when interacting with the Safeswap API.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex max-w-md items-center gap-2">
                    <code className="flex-1 rounded border border-border bg-muted/50 px-3 py-2 font-mono text-sm">
                      usr_NWgN5Qzi9M7jSxFiFoOuwSJTTwtF
                    </code>
                    <Button variant="outline" size="icon">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Protect your account with an extra layer of security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between rounded-lg border border-border p-4 bg-muted/30">
                    <div className="space-y-1">
                      <p className="font-medium">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">Secure your account using a TOTP app.</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">SMS Recovery</Label>
                      <p className="text-sm text-muted-foreground">
                        Use your phone to recover access if you lose your MFA device.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/50 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive">Delete Account</CardTitle>
                  <CardDescription>
                    Permanently delete your account and all associated data. This action is irreversible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive">Delete Project</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <Card className="bg-card animate-in fade-in duration-500">
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Choose how you want to be alerted about transaction events.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { title: "Email Notifications", desc: "Receive updates via your primary email address.", icon: Mail },
                  {
                    title: "Push Notifications",
                    desc: "Get browser alerts for real-time status changes.",
                    icon: Globe,
                  },
                  { title: "SMS Alerts", desc: "Urgent notifications sent directly to your phone.", icon: Smartphone },
                ].map((item, i) => (
                  <div key={i} className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <div className="mt-1 rounded-md bg-muted p-2">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium leading-none">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                    <Switch defaultChecked={i === 0} />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <Card className="bg-card border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Current Plan</CardTitle>
                    <Badge className="bg-primary text-primary-foreground">Enterprise</Badge>
                  </div>
                  <CardDescription>Your current subscription and usage metrics.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border border-border bg-muted/50 p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Credits Remaining</p>
                      <p className="text-2xl font-bold">12,450</p>
                    </div>
                    <div className="rounded-md border border-border bg-muted/50 p-4">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Next Invoice</p>
                      <p className="text-2xl font-bold">KES 4,500</p>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between rounded-md border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded bg-muted p-2">
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">M-Pesa Account</p>
                        <p className="text-sm text-muted-foreground">•••• 5678</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsContent />
    </Suspense>
  )
}
