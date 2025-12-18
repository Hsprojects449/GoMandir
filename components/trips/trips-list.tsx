'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, MoreVertical, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function TripsList() {
  const [trips, setTrips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadTrips()
  }, [])

  async function loadTrips() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/login')
      return
    }

    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('user_id', user.id)
      .order('start_date', { ascending: false })

    if (!error && data) {
      setTrips(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="planned">Planned</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-8">
        <TripGrid trips={trips} />
      </TabsContent>
      
      <TabsContent value="upcoming" className="mt-8">
        <TripGrid trips={trips.filter(t => t.status === 'upcoming')} />
      </TabsContent>
      
      <TabsContent value="planned" className="mt-8">
        <TripGrid trips={trips.filter(t => t.status === 'planned')} />
      </TabsContent>
      
      <TabsContent value="completed" className="mt-8">
        <TripGrid trips={trips.filter(t => t.status === 'completed')} />
      </TabsContent>
    </Tabs>
  )
}

function TripGrid({ trips }: { trips: any[] }) {
  if (trips.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">No trips found</p>
          <Button asChild>
            <Link href="/plan-trip">Plan a New Trip</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  )
}

function TripCard({ trip }: { trip: any }) {
  const getDaysDiff = (start: string, end: string) => {
    const diffTime = Math.abs(new Date(end).getTime() - new Date(start).getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/10 to-orange-100">
        <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
          {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
        </Badge>
      </div>
      
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-serif text-lg font-semibold mb-1 line-clamp-1">
              {trip.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{trip.destination}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(trip.start_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
          </div>
          {trip.end_date && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{getDaysDiff(trip.start_date, trip.end_date)} days</span>
            </div>
          )}
        </div>
        
        {trip.travelers && (
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{trip.travelers}</span> travelers
          </div>
        )}
        
        <Button asChild className="w-full">
          <Link href={`/my-trips/${trip.id}`}>
            View Itinerary
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
