import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { TrustMetrics } from "@/components/trust-metrics"
import { HowItWorks } from "@/components/how-it-works"
import { WhyChooseUs } from "@/components/why-choose-us"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustMetrics />
      <Services />
      <HowItWorks />
      <WhyChooseUs />
      <CTA />
      <ContactSection />
      <Footer />
    </main>
  )
}
