"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircle, DollarSign, Info } from "lucide-react"

const WITHDRAWAL_FEE_RATE = 0.02 // 2% platform fee

export function WithdrawalModal({ availableBalance = 456780 }: { availableBalance?: number }) {
  const [open, setOpen] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [bankName, setBankName] = useState("")

  const amount = Number.parseFloat(withdrawAmount) || 0
  const withdrawalFee = amount * WITHDRAWAL_FEE_RATE
  const netAmount = amount - withdrawalFee

  const isValid =
    amount > 0 && withdrawMethod && (withdrawMethod === "mobile-money" ? phoneNumber : accountNumber && bankName)
  const exceedsBalance = amount > availableBalance

  const handleWithdraw = () => {
    if (!isValid || exceedsBalance) return
    // Handle withdrawal logic here
    console.log("[v0] Withdrawal submitted:", { amount, withdrawMethod, netAmount })
    setOpen(false)
    setWithdrawAmount("")
    setPhoneNumber("")
    setAccountNumber("")
    setBankName("")
    setWithdrawMethod("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <DollarSign className="h-4 w-4" />
          Withdraw Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Transfer your available balance to your bank account or mobile money wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Available Balance */}
          <div className="rounded-lg bg-muted/50 border border-border p-4">
            <p className="text-xs text-muted-foreground uppercase mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-foreground">KSh {availableBalance.toLocaleString("en-KE")}</p>
          </div>

          {/* Withdrawal Amount */}
          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Amount to Withdraw (KSh)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="pl-9"
                min="0"
                step="0.01"
              />
            </div>
            {exceedsBalance && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Insufficient balance
              </p>
            )}
          </div>

          {/* Withdrawal Method */}
          <div className="space-y-2">
            <Label htmlFor="withdraw-method">Withdrawal Method</Label>
            <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
              <SelectTrigger id="withdraw-method">
                <SelectValue placeholder="Select withdrawal method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile-money">Mobile Money (M-Pesa)</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Money Field */}
          {withdrawMethod === "mobile-money" && (
            <div className="space-y-2">
              <Label htmlFor="phone">M-Pesa Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+254 712 345 678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          )}

          {/* Bank Transfer Fields */}
          {withdrawMethod === "bank-transfer" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="bank-name">Bank Name</Label>
                <Input
                  id="bank-name"
                  placeholder="e.g., Kenya Commercial Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input
                  id="account-number"
                  placeholder="Your bank account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </div>
            </>
          )}

          {/* Fee Breakdown */}
          {amount > 0 && (
            <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div className="space-y-2 flex-1">
                  <p className="text-sm font-medium text-foreground">Withdrawal Breakdown</p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Withdrawal Amount:</span>
                      <span className="font-medium">KSh {amount.toLocaleString("en-KE")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform Fee (2%):</span>
                      <span className="font-medium text-red-600">
                        -KSh {withdrawalFee.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="border-t border-border pt-1.5 mt-1.5">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">You will receive:</span>
                        <span className="font-bold text-primary">
                          KSh {netAmount.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 flex gap-2">
            <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-foreground">
              An OTP will be sent to your registered phone number for verification before the withdrawal is processed.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleWithdraw} disabled={!isValid || exceedsBalance}>
              Proceed to Verify
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
