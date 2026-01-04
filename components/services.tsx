import { Card, CardContent } from "@/components/ui/card"
import { Car, Home, Smartphone, ShoppingBag, Briefcase, Package } from "lucide-react"

const services = [
  {
    icon: Car,
    title: "Vehicle Transactions",
    description: "Secure escrow for buying and selling cars, motorcycles, and other vehicles.",
  },
  {
    icon: Home,
    title: "Real Estate Deals",
    description: "Protect property transactions with verified escrow services for peace of mind.",
  },
  {
    icon: Smartphone,
    title: "Electronics & Gadgets",
    description: "Safe transactions for phones, laptops, and high-value electronic items.",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace Goods",
    description: "Secure online marketplace purchases with buyer and seller protection.",
  },
  {
    icon: Briefcase,
    title: "Business Transactions",
    description: "Professional escrow services for B2B deals and business acquisitions.",
  },
  {
    icon: Package,
    title: "General Merchandise",
    description: "Flexible escrow solutions for any high-value goods or services.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Escrow Services for Every Transaction
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Whether you're buying a car, property, or electronics, our secure escrow platform protects your transaction
            from start to finish.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="border-border transition-all hover:border-primary/50 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-poppins text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
