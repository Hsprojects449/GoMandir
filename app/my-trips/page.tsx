import { TripsList } from '@/components/trips/trips-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'My Trips - GoMandir',
  description: 'Manage your temple pilgrimage itineraries and bookings.',
}

export default function MyTripsPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-4xl font-bold mb-4">My Trips</h1>
              <p className="text-xl text-muted-foreground">
                Manage your planned and completed pilgrimages
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="/plan-trip">
                <Plus className="mr-2 h-5 w-5" />
                Plan New Trip
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <TripsList />
      </div>
    </div>
  )
}
