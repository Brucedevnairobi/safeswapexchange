"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DollarSign, Info } from "lucide-react"

const WITHHOLDING_RATE = 0.02 // 2% withholding

export function TransactionForm() {
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")

  const transactionAmount = parseFloat(amount) || 0
  const withholdingFee = transactionAmount * WITHHOLDING_RATE
  const totalAmount = transactionAmount + withholdingFee

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category">Transaction Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vehicle">Vehicle Purchase</SelectItem>
            <SelectItem value="real-estate">Real Estate</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="services">Services</SelectItem>
            <SelectItem value="general">General Merchandise</SelectItem>
            <SelectItem value="domain">Domain & Website</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="item-description">Item Description</Label>
        <Input
          id="item-description"
          placeholder="e.g., 2020 Toyota Corolla, Gray, 50,000 km"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Transaction Amount (KSh)</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-9"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="seller-email">Seller Email</Label>
        <Input
          id="seller-email"
          type="email"
          placeholder="seller@example.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="buyer-email">Buyer Email</Label>
        <Input
          id="buyer-email"
          type="email"
          placeholder="buyer@example.com"
        />
      </div>

      {transactionAmount > 0 && (
        <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5" />
            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium text-foreground">
                Transaction Breakdown
              </p>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Item Amount:</span>
                  <span className="font-medium text-foreground">
                    KSh {transactionAmount.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Safeswap Fee (2%):
                  </span>
                  <span className="font-medium text-foreground">
                    KSh {withholdingFee.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-border pt-1.5 mt-1.5">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">
                      Total to Deposit:
                    </span>
                    <span className="font-bold text-primary">
                      KSh {totalAmount.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Button className="w-full" size="lg" disabled={!amount || !category}>
        Create Transaction
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By creating a transaction, you agree to our Terms of Service and Privacy
        Policy
      </p>
    </div>
  )
}
