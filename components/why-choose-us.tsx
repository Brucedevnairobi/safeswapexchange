import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Zap, Users, DollarSign, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "Military-grade encryption protects all your data and transactions.",
  },
  {
    icon: Lock,
    title: "Licensed & Regulated",
    description: "Fully compliant with Kenyan financial regulations and data protection laws.",
  },
  {
    icon: Zap,
    title: "Instant Releases",
    description: "Funds released immediately upon transaction confirmation.",
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "Join thousands of satisfied users across Kenya.",
  },
  {
    icon: DollarSign,
    title: "Low Fees",
    description: "Transparent pricing with no hidden charges or surprise costs.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Expert customer support team available around the clock.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Why Choose Safeswap?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            We combine cutting-edge security technology with exceptional customer service to provide Kenya's most
            trusted escrow platform.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="border-border bg-card transition-all hover:border-primary/50 hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-poppins text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
