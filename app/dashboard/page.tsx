"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { DollarSign, ArrowUpRight, Clock, CheckCircle, AlertCircle, TrendingUp, Plus, HelpCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Cell, Pie, PieChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { WithdrawalModal } from "@/components/withdrawal-modal"

export default function DashboardPage() {
  // Mock data - replace with real data from API/database
  const stats = [
    {
      title: "Total Volume",
      value: "KES 1,234,500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "Total transaction volume this month",
    },
    {
      title: "Active Transactions",
      value: "23",
      change: "+3",
      trend: "up",
      icon: Clock,
      description: "Currently in progress",
    },
    {
      title: "Completed",
      value: "156",
      change: "+18%",
      trend: "up",
      icon: CheckCircle,
      description: "Successfully completed this month",
    },
    {
      title: "Funds in Escrow",
      value: "KES 456,780",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
      description: "Total funds currently held",
    },
  ]

  const recentTransactions = 
    [
      {
        id: "TXN-2024-001",
        item: "MacBook Pro M3",
        amount: "KES 185,000",
        status: "pending",
        party: "buyer",
        date: "2024-01-03",
      },
      {
        id: "TXN-2024-002",
        item: "Toyota Vitz 2018",
        amount: "KES 950,000",
        status: "in-progress",
        party: "seller",
        date: "2024-01-02",
      },
      {
        id: "TXN-2024-003",
        item: "Plot - Kiambu",
        amount: "KES 2,500,000",
        status: "completed",
        party: "buyer",
        date: "2024-01-01",
      },
      {
        id: "TXN-2024-004",
        item: "iPhone 15 Pro",
        amount: "KES 145,000",
        status: "completed",
        party: "seller",
        date: "2023-12-30",
      },
    ]
  

  const volumeData = [
    { name: "Jan", total: 450000 },
    { name: "Feb", total: 520000 },
    { name: "Mar", total: 480000 },
    { name: "Apr", total: 610000 },
    { name: "May", total: 590000 },
    { name: "Jun", total: 720000 },
  ]

  const categoryData = [
    { name: "Electronics", value: 40, color: "var(--chart-1)" },
    { name: "Real Estate", value: 30, color: "var(--chart-2)" },
    { name: "Vehicles", value: 20, color: "var(--chart-3)" },
    { name: "Services", value: 10, color: "var(--chart-4)" },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { variant: "default" | "secondary" | "destructive" | "outline"; label: string }
    > = {
      pending: { variant: "secondary", label: "Pending" },
      "in-progress": { variant: "default", label: "In Progress" },
      completed: { variant: "outline", label: "Completed" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="font-poppins text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Track your escrow transactions and account activity</p>
      </div>

      {/* Available Balance Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Available Balance</CardTitle>
          <CardDescription>Funds ready to withdraw</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-4xl font-bold text-primary">KES 456,780</p>
            <p className="text-xs text-muted-foreground mt-1">Total: KES 1,234,500</p>
          </div>
          <WithdrawalModal availableBalance={456780} />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3 md:px-6 md:py-4">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="px-4 py-2 md:px-6 md:py-3">
                <div className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <span className="text-green-600 dark:text-green-400">{stat.change}</span>
                  <span className="text-muted-foreground">from last month</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-3 md:gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">Transaction Volume</CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Monthly growth in total transaction value (KES)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                total: {
                  label: "Total Volume",
                  color: "var(--primary)",
                },
              }}
              className="h-[250px] md:h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `KES ${value / 1000}k`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="total" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base md:text-lg">Category Distribution</CardTitle>
            <CardDescription className="text-xs md:text-sm">Breakdown of transactions by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Percentage",
                },
              }}
              className="h-[250px] md:h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-2 w-2 md:h-3 md:w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-card/50">
        <CardHeader className="flex-col gap-2 space-y-0 pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="text-base md:text-lg">Recent Transactions</CardTitle>
              <p className="text-xs md:text-sm text-muted-foreground">Your latest escrow activities</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs md:text-sm w-full md:w-auto bg-transparent">
              View All
              <ArrowUpRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border border-border p-3 md:p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm md:text-base text-foreground truncate">{transaction.item}</p>
                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                      {transaction.party}
                    </Badge>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">{transaction.id}</p>
                </div>
                <div className="flex items-center gap-3 md:gap-6">
                  <div className="text-right">
                    <p className="font-semibold text-sm md:text-base text-foreground">{transaction.amount}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="min-w-[80px] md:min-w-[100px] text-right">{getStatusBadge(transaction.status)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-3 md:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer transition-all hover:shadow-md bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <Plus className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              Start New Transaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-muted-foreground">Create a new secure escrow transaction</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all hover:shadow-md bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-muted-foreground">3 transactions require your attention</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all hover:shadow-md bg-card/50 md:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm md:text-base">
              <HelpCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs md:text-sm text-muted-foreground">Contact support or view help docs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
