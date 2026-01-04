import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
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
            <Button size="lg" className="gap-2">
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
