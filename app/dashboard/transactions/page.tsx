"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Eye, MoreHorizontal } from "lucide-react"

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string[]>(["all"])

  // Mock data - replace with real API data
  const allTransactions = [
    {
      id: "TXN-2024-001",
      item: "MacBook Pro M3",
      buyer: "Jane Smith",
      seller: "Tech Store Ltd",
      amount: 185000,
      fee: 3700,
      status: "pending",
      date: "2024-01-03",
      category: "Electronics",
    },
    {
      id: "TXN-2024-002",
      item: "Toyota Vitz 2018",
      buyer: "Michael Chen",
      seller: "Auto Dealers KE",
      amount: 950000,
      fee: 19000,
      status: "in-progress",
      date: "2024-01-02",
      category: "Vehicles",
    },
    {
      id: "TXN-2024-003",
      item: "Plot - Kiambu",
      buyer: "Sarah Johnson",
      seller: "Land Ventures",
      amount: 2500000,
      fee: 50000,
      status: "completed",
      date: "2024-01-01",
      category: "Real Estate",
    },
    {
      id: "TXN-2024-004",
      item: "iPhone 15 Pro",
      buyer: "David Kim",
      seller: "Mobile Hub",
      amount: 145000,
      fee: 2900,
      status: "completed",
      date: "2023-12-30",
      category: "Electronics",
    },
    {
      id: "TXN-2024-005",
      item: "Web Development Services",
      buyer: "StartUp Co.",
      seller: "DevPro Agency",
      amount: 250000,
      fee: 5000,
      status: "disputed",
      date: "2023-12-28",
      category: "Services",
    },
    {
      id: "TXN-2024-006",
      item: "Samsung TV 65 inch",
      buyer: "Robert Williams",
      seller: "Electronics Mall",
      amount: 89000,
      fee: 1780,
      status: "in-progress",
      date: "2023-12-27",
      category: "Electronics",
    },
    {
      id: "TXN-2024-007",
      item: "Motorcycle - Honda CB",
      buyer: "Ahmed Hassan",
      seller: "Moto Traders",
      amount: 320000,
      fee: 6400,
      status: "pending",
      date: "2023-12-26",
      category: "Vehicles",
    },
    {
      id: "TXN-2024-008",
      item: "Office Space Lease",
      buyer: "Business Hub Ltd",
      seller: "Property Masters",
      amount: 1200000,
      fee: 24000,
      status: "completed",
      date: "2023-12-25",
      category: "Real Estate",
    },
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { variant: "default" | "secondary" | "destructive" | "outline"; label: string }
    > = {
      pending: { variant: "secondary", label: "Pending" },
      "in-progress": { variant: "default", label: "In Progress" },
      completed: { variant: "outline", label: "Completed" },
      disputed: { variant: "destructive", label: "Disputed" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.seller.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter.includes("all") || statusFilter.length === 0 || statusFilter.includes(transaction.status)

    return matchesSearch && matchesStatus
  })

  const getTransactionsByStatus = (status: string) => {
    if (status === "all") return allTransactions
    return allTransactions.filter((t) => t.status === status)
  }

  const stats = {
    all: allTransactions.length,
    pending: allTransactions.filter((t) => t.status === "pending").length,
    inProgress: allTransactions.filter((t) => t.status === "in-progress").length,
    completed: allTransactions.filter((t) => t.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="font-poppins text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">View and manage all your escrow transactions</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.all}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>A complete list of your escrow transactions</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("all")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setStatusFilter(["all"])
                      }
                    }}
                  >
                    All Transactions
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("pending")}
                    onCheckedChange={(checked) => {
                      setStatusFilter((prev) => {
                        const filtered = prev.filter((s) => s !== "all")
                        return checked ? [...filtered, "pending"] : filtered.filter((s) => s !== "pending")
                      })
                    }}
                  >
                    Pending
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("in-progress")}
                    onCheckedChange={(checked) => {
                      setStatusFilter((prev) => {
                        const filtered = prev.filter((s) => s !== "all")
                        return checked ? [...filtered, "in-progress"] : filtered.filter((s) => s !== "in-progress")
                      })
                    }}
                  >
                    In Progress
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("completed")}
                    onCheckedChange={(checked) => {
                      setStatusFilter((prev) => {
                        const filtered = prev.filter((s) => s !== "all")
                        return checked ? [...filtered, "completed"] : filtered.filter((s) => s !== "completed")
                      })
                    }}
                  >
                    Completed
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter.includes("disputed")}
                    onCheckedChange={(checked) => {
                      setStatusFilter((prev) => {
                        const filtered = prev.filter((s) => s !== "all")
                        return checked ? [...filtered, "disputed"] : filtered.filter((s) => s !== "disputed")
                      })
                    }}
                  >
                    Disputed
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All ({stats.all})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress ({stats.inProgress})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Seller</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Fee (2%)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium">{transaction.item}</p>
                              <p className="text-xs text-muted-foreground">{transaction.category}</p>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.buyer}</TableCell>
                          <TableCell>{transaction.seller}</TableCell>
                          <TableCell className="font-semibold">KES {transaction.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-muted-foreground">
                            KES {transaction.fee.toLocaleString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Receipt
                                </DropdownMenuCheckboxItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {["pending", "in-progress", "completed"].map((status) => (
              <TabsContent key={status} value={status} className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Buyer</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Fee (2%)</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getTransactionsByStatus(status).length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                            No {status} transactions
                          </TableCell>
                        </TableRow>
                      ) : (
                        getTransactionsByStatus(status).map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="font-medium">{transaction.item}</p>
                                <p className="text-xs text-muted-foreground">{transaction.category}</p>
                              </div>
                            </TableCell>
                            <TableCell>{transaction.buyer}</TableCell>
                            <TableCell>{transaction.seller}</TableCell>
                            <TableCell className="font-semibold">KES {transaction.amount.toLocaleString()}</TableCell>
                            <TableCell className="text-muted-foreground">
                              KES {transaction.fee.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuCheckboxItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuCheckboxItem>
                                  <DropdownMenuCheckboxItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Receipt
                                  </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
