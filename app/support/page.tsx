import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { HelpCircle, BookOpen, Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function SupportPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground">Find answers to common questions and get support</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <BookOpen className="h-12 w-12 text-primary mx-auto" />
              <h3 className="font-semibold">Knowledge Base</h3>
              <p className="text-sm text-muted-foreground">Browse articles and guides</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <Phone className="h-12 w-12 text-primary mx-auto" />
              <h3 className="font-semibold">Call Support</h3>
              <p className="text-sm text-muted-foreground">+91 1800 123 4567</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <Mail className="h-12 w-12 text-primary mx-auto" />
              <h3 className="font-semibold">Email Us</h3>
              <p className="text-sm text-muted-foreground">support@gomandir.com</p>
            </CardContent>
          </Card>
        </div>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I book a trip?</AccordionTrigger>
              <AccordionContent>
                You can book a trip by using our trip planner on the homepage. Simply enter your destination, 
                travel dates, and number of travelers. Our system will create a customized itinerary and help 
                you book transportation and accommodation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I modify my booking after confirmation?</AccordionTrigger>
              <AccordionContent>
                Yes, you can modify your booking from the My Trips section. Please note that modification fees 
                may apply depending on the service provider's policies. We recommend making changes at least 
                48 hours before your travel date.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit and debit cards, UPI, net banking, and digital wallets. All transactions 
                are secured with industry-standard encryption to protect your financial information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I add a temple to my trip?</AccordionTrigger>
              <AccordionContent>
                You can add temples to your trip by browsing our temple directory and clicking the "Add to Trip" 
                button on any temple page. You can either add it to an existing trip or create a new one. 
                The temple will be added to your itinerary with suggested timings.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is there a cancellation policy?</AccordionTrigger>
              <AccordionContent>
                Cancellation policies vary by service provider. Generally, you can cancel up to 24-48 hours 
                before your booking for a full or partial refund. Please check the specific cancellation terms 
                when booking. Visit our Booking Policy page for detailed information.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Do you provide travel insurance?</AccordionTrigger>
              <AccordionContent>
                While we don't directly provide travel insurance, we can connect you with trusted insurance 
                partners during the booking process. We highly recommend purchasing travel insurance for your 
                peace of mind, especially for longer pilgrimages.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="text-center bg-primary/5 rounded-lg p-8">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">Our support team is here to help you</p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
