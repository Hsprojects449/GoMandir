import { BookingTabs } from '@/components/booking/booking-tabs'
import { BookingSummary } from '@/components/booking/booking-summary'

export const metadata = {
  title: 'Book Travel & Stay - GoMandir',
  description: 'Book trains, buses, flights, cars, and accommodations for your temple journey.',
}

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="bg-gradient-to-b from-primary/10 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-serif text-4xl font-bold mb-4">Book Your Journey</h1>
          <p className="text-xl text-muted-foreground">
            Complete travel and accommodation booking in one place
          </p>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BookingTabs />
          </div>
          <aside className="lg:col-span-1">
            <div className="sticky top-4">
              <BookingSummary />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
