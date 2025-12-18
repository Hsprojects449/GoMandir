import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Calendar, CreditCard, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-xl text-muted-foreground">Planning your spiritual journey made simple</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">1. Search</h3>
                <p className="text-muted-foreground">
                  Browse our extensive temple database or use our trip planner to find your destination
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">2. Plan</h3>
                <p className="text-muted-foreground">
                  Create your itinerary with AI-powered suggestions for optimal temple visits and timings
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">3. Book</h3>
                <p className="text-muted-foreground">
                  Book transportation, accommodation, and other services all in one place
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-xl">4. Travel</h3>
                <p className="text-muted-foreground">
                  Embark on your spiritual journey with all details organized and accessible on your phone
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="space-y-8">
          <h2 className="font-serif text-3xl font-bold text-center">Features That Make a Difference</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-xl">Smart Itinerary Planning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI-powered system suggests optimal routes, best visiting times, and nearby attractions 
                  to make your pilgrimage more meaningful and efficient.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-xl">All-in-One Booking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Book trains, buses, flights, hotels, and local transportation from a single platform. 
                  No need to juggle multiple apps and websites.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-xl">Real-Time Updates</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get instant notifications about temple timings, special events, crowd levels, and 
                  weather conditions at your destination.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold text-xl">Community Reviews</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Learn from fellow pilgrims' experiences with authentic reviews, tips, and recommendations 
                  for every temple and service.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Ready to Begin?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Start planning your perfect pilgrimage today
          </p>
          <Button size="lg" asChild>
            <Link href="/plan-trip">Plan Your Trip</Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
