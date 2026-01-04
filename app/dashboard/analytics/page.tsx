"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Activity, Globe, Zap, ShieldCheck, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Mock data for analytics visualization
const requestData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  requests: Math.floor(Math.random() * 2000) + 1000,
  errors: Math.floor(Math.random() * 50),
}))

const volumeData = [
  { name: "Mon", value: 45000 },
  { name: "Tue", value: 52000 },
  { name: "Wed", value: 48000 },
  { name: "Thu", value: 61000 },
  { name: "Fri", value: 59000 },
  { name: "Sat", value: 72000 },
  { name: "Sun", value: 68000 },
]

const regionalData = [
  { region: "Nairobi", value: 45, trend: "+12%", fill: "var(--color-nairobi)" },
  { region: "Mombasa", value: 25, trend: "+5%", fill: "var(--color-mombasa)" },
  { region: "Kisumu", value: 15, trend: "-2%", fill: "var(--color-kisumu)" },
  { region: "Nakuru", value: 10, trend: "+8%", fill: "var(--color-nakuru)" },
  { region: "Eldoret", value: 5, trend: "+1%", fill: "var(--color-eldoret)" },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-poppins text-3xl font-bold tracking-tight text-foreground">Analytics & Observability</h1>
          <p className="text-muted-foreground">Monitor transaction performance and platform health in real-time.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="24h">
            <SelectTrigger className="w-[180px] bg-background">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="12h">Last 12 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="h-10 px-4 bg-background">
            <Activity className="mr-2 h-4 w-4 text-primary animate-pulse" />
            Live Monitoring
          </Badge>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Completion Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 Days</div>
            <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
              <ArrowDownRight className="h-3 w-3" />
              -12% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
              <ArrowUpRight className="h-3 w-3" />
              +0.4% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Uptime</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.99%</div>
            <p className="text-xs text-muted-foreground mt-1">Status: All systems operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Mediation</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.8%</div>
            <p className="text-xs text-muted-foreground mt-1">Of total transactions in dispute</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="performance">System Performance</TabsTrigger>
          <TabsTrigger value="regional">Regional Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Request Volume</CardTitle>
                <CardDescription>Real-time throughput of initiated transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    requests: { label: "Requests", color: "var(--primary)" },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={requestData}>
                      <defs>
                        <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-requests)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="var(--color-requests)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="requests"
                        stroke="var(--color-requests)"
                        fillOpacity={1}
                        fill="url(#colorRequests)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Transaction Volume (KES)</CardTitle>
                <CardDescription>Total value transacted over the past 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Volume", color: "var(--primary)" },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={volumeData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis hide />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Activity by Region
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {regionalData.map((item) => (
                    <div key={item.region} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.region}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{item.value}%</span>
                          <span className={item.trend.startsWith("+") ? "text-green-500" : "text-red-500"}>
                            {item.trend}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${item.value}%`, backgroundColor: item.fill }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium flex items-center gap-2 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                  Trust Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    System Health Score
                  </div>
                  <div className="text-3xl font-bold">98.4</div>
                  <p className="text-xs text-muted-foreground mt-1">AI-powered fraud detection is active</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">ID Verification Rate</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">2FA Adoption</span>
                    <span className="font-medium">84%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Dispute Resolution Avg.</span>
                    <span className="font-medium">18h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
