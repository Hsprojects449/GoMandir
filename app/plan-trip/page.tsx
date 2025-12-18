import { TripPlanner } from '@/components/trip-planner/trip-planner'

export const metadata = {
  title: 'Plan New Trip - GoMandir',
  description: 'Create a new temple pilgrimage itinerary.',
}

export default function PlanTripPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="bg-gradient-to-b from-primary/10 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-serif text-4xl font-bold mb-4">Plan Your Pilgrimage</h1>
          <p className="text-xl text-muted-foreground">
            Create a personalized itinerary for your sacred journey
          </p>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <TripPlanner />
      </div>
    </div>
  )
}
