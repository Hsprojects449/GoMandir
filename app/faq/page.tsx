import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">Everything you need to know about GoMandir</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <section>
          <h2 className="font-serif text-2xl font-bold mb-6">General Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="general-1">
              <AccordionTrigger>What is GoMandir?</AccordionTrigger>
              <AccordionContent>
                GoMandir is a comprehensive platform for planning and booking temple pilgrimages across India. 
                We provide temple information, itinerary planning, and booking services for transportation and 
                accommodation, all in one place.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="general-2">
              <AccordionTrigger>Is GoMandir free to use?</AccordionTrigger>
              <AccordionContent>
                Yes, browsing temples, reading reviews, and planning your trip is completely free. We only charge 
                when you book services like transportation or accommodation through our platform. Our service fees 
                are transparent and clearly displayed before you confirm any booking.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="general-3">
              <AccordionTrigger>Which regions do you cover?</AccordionTrigger>
              <AccordionContent>
                We currently cover major temple destinations across India, including temples in all major states. 
                Our database includes over 500 temples with detailed information, timings, and visitor reviews.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-6">Booking & Payments</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="booking-1">
              <AccordionTrigger>How do I make a booking?</AccordionTrigger>
              <AccordionContent>
                Use our trip planner to create your itinerary, then browse and book transportation and accommodation 
                options. You can also directly book from individual temple pages using the "Add to Trip" feature.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="booking-2">
              <AccordionTrigger>What payment methods are accepted?</AccordionTrigger>
              <AccordionContent>
                We accept all major credit/debit cards (Visa, Mastercard, RuPay), UPI, net banking, and popular 
                digital wallets. All payments are processed securely through encrypted channels.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="booking-3">
              <AccordionTrigger>Will I receive a confirmation?</AccordionTrigger>
              <AccordionContent>
                Yes, you'll receive an instant confirmation email and SMS with your booking details. You can also 
                access all your bookings from the My Trips section of your account.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold mb-6">Cancellations & Refunds</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="cancel-1">
              <AccordionTrigger>What is the cancellation policy?</AccordionTrigger>
              <AccordionContent>
                Cancellation policies vary by service provider. Most bookings can be cancelled up to 24-48 hours 
                before the scheduled date for a partial or full refund. Specific terms are displayed during the 
                booking process and in your confirmation email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="cancel-2">
              <AccordionTrigger>How long does a refund take?</AccordionTrigger>
              <AccordionContent>
                Refunds are typically processed within 5-7 business days after cancellation approval. The exact 
                time depends on your bank or payment provider. You'll receive notifications at each step of the 
                refund process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">Can't find your answer?</h2>
          <p className="text-muted-foreground mb-6">Our support team is here to help</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">Visit Help Center</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
