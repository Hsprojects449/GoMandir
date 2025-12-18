import { ItineraryHeader } from '@/components/itinerary/itinerary-header'
import { ItineraryTimeline } from '@/components/itinerary/itinerary-timeline'
import { ItineraryMap } from '@/components/itinerary/itinerary-map'
import { BookingsCard } from '@/components/itinerary/bookings-card'
import { ExpenseSummary } from '@/components/itinerary/expense-summary'

export const metadata = {
  title: 'Trip Itinerary - GoMandir',
  description: 'View and manage your trip itinerary.',
}

export default function TripDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <ItineraryHeader tripId={params.id} />
      
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <ItineraryTimeline tripId={params.id} />
            <ItineraryMap tripId={params.id} />
          </div>
          
          <aside className="space-y-6">
            <BookingsCard tripId={params.id} />
            <ExpenseSummary tripId={params.id} />
          </aside>
        </div>
      </div>
    </div>
  )
}
