import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, Mail, Phone, ExternalLink, ShieldCheck, HelpCircle } from "lucide-react"

export default function HelpCenterPage() {
  const faqs = [
    {
      q: "How does the Safeswap escrow process work?",
      a: "Once you create a transaction, the buyer deposits funds into our secure holding account. We notify the seller to provide the goods or services. After the buyer confirms receipt, the funds are released to the seller minus our 2% service fee.",
    },
    {
      q: "What happens if there is a dispute?",
      a: "Our dispute resolution team mediates if terms are not met. You can upload evidence (photos, receipts) through your transaction dashboard. We hold funds until a resolution is reached or decided by our mediators.",
    },
    {
      q: "How long does it take to get paid?",
      a: "Funds are released immediately upon buyer approval. Depending on your withdrawal method (M-Pesa, Bank Transfer), it can take from a few minutes up to 24 business hours to reflect in your account.",
    },
    {
      q: "Is my personal data secure?",
      a: "Yes, we use bank-grade encryption and do not share your contact details with the other party until a transaction is officially initiated. We are fully compliant with the Kenya Data Protection Act.",
    },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-4">
        <h1 className="font-poppins text-4xl font-bold tracking-tight">How can we help?</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to frequently asked questions or get in touch with our support team.
        </p>
        <div className="relative max-w-xl mx-auto pt-4">
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Live Chat</CardTitle>
            <CardDescription>Instant help for active transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between p-0 font-medium">
              Start Chat <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Email Support</CardTitle>
            <CardDescription>For non-urgent technical inquiries.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between p-0 font-medium">
              Send Email <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Phone Support</CardTitle>
            <CardDescription>Direct line for enterprise accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between p-0 font-medium">
              Call Now <ExternalLink className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr,350px]">
        <div className="space-y-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-lg px-4 bg-muted/20">
                <AccordionTrigger className="hover:no-underline font-medium py-4">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <aside className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <ShieldCheck className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Security Guarantee</CardTitle>
              <CardDescription>Your funds are held in a secure, audited trust account.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              We provide 100% protection against payment fraud and non-delivery of goods for all verified transactions.
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  )
}
