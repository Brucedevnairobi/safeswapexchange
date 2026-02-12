"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TransactionForm } from "@/components/ui/transactionform"

export function CTA() {
  const [open, setOpen] = useState(false)
  const contactSectionRef = useRef<HTMLDivElement>(null)

  const handleContactClick = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="border-y border-border bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight text-balance text-foreground lg:text-4xl">
            Ready to Start Your Secure Transaction?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Join thousands of satisfied users who trust Safeswap for their most important transactions. Get started in
            minutes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </DialogTrigger>
           {/*   <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-poppins text-2xl">Create New Transaction</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to start a secure escrow transaction. A 2% service fee will be applied.
                  </DialogDescription>
                </DialogHeader>
                <TransactionForm />
              </DialogContent>*/}
            </Dialog>
            <Button size="lg" variant="outline" onClick={handleContactClick}>
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
