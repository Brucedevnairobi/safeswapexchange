import { Shield, Award, Clock, HeadphonesIcon } from "lucide-react"

const metrics = [
  {
    icon: Shield,
    value: "100%",
    label: "Secure Platform",
    description: "Bank-level encryption",
  },
  {
    icon: Award,
    value: "10,000+",
    label: "Happy Users",
    description: "Trusted nationwide",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Support Available",
    description: "Always here to help",
  },
  {
    icon: HeadphonesIcon,
    value: "KSh 2B+",
    label: "Transactions Secured",
    description: "Growing every day",
  },
]

export function TrustMetrics() {
  return (
    <section className="border-y border-border bg-muted/30 py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div className="mb-1 font-poppins text-3xl font-bold text-foreground">{metric.value}</div>
                <div className="mb-1 font-medium text-foreground">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
