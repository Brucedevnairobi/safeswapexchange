"use client"

import { Button } from "@/components/ui/button"
import { Shield, CheckCircle2, Lock, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TransactionForm } from "@/components/ui/transactionform"
import { useState } from "react"  

export function Hero() {
  const [open, setOpen] = useState(false)
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">100% Secure Transactions</span>
            </div>

            <h1 className="font-poppins text-4xl font-bold leading-tight tracking-tight text-balance text-foreground lg:text-5xl xl:text-6xl">
              Kenya's Most Trusted <span className="text-primary">Escrow Service</span>
            </h1>

            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Buy and sell with complete confidence. Our secure escrow platform protects both buyers and sellers,
              ensuring safe transactions for vehicles, real estate, electronics, and more.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2">
                    Start a Transaction
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-poppins text-2xl">Create New Transaction</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to start a secure escrow transaction. A 2% service fee will be applied.
                    </DialogDescription>
                  </DialogHeader>
                  <TransactionForm />
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-sm text-foreground">KSh 2B+ Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-foreground">10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                <span className="text-sm text-foreground">Bank-Level Security</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-full w-full">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
              <div className="relative rounded-2xl border border-border bg-card p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Buyer Protection</p>
                        <p className="text-xs text-muted-foreground">Money held securely</p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="h-12 w-0.5 bg-border" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                        <Lock className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Seller Security</p>
                        <p className="text-xs text-muted-foreground">Guaranteed payment</p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="h-12 w-0.5 bg-border" />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                        <Users className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Both Satisfied</p>
                        <p className="text-xs text-muted-foreground">Transaction complete</p>
                      </div>
                    </div>
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
