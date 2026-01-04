import { ArrowRight, UserPlus, DollarSign, Package, CheckCircle2 } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Transaction",
    description: "Buyer and seller agree on terms and create an escrow transaction on our secure platform.",
  },
  {
    icon: DollarSign,
    number: "02",
    title: "Buyer Deposits Funds",
    description: "Buyer securely deposits the payment amount into the escrow account for safekeeping.",
  },
  {
    icon: Package,
    number: "03",
    title: "Seller Delivers Item",
    description: "Seller ships or delivers the item/service knowing payment is guaranteed upon completion.",
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "Transaction Complete",
    description: "Buyer confirms receipt and satisfaction. Funds are released to the seller instantly.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gradient-to-b from-background to-muted/20 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            How Safeswap Works
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Our simple four-step process ensures both buyers and sellers are protected throughout the entire
            transaction.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="mb-3 font-poppins text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-10 hidden h-0.5 w-full -translate-x-1/2 lg:block">
                    <ArrowRight className="absolute left-[60%] top-1/2 h-6 w-6 -translate-y-1/2 text-primary/30" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
