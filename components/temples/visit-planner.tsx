'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export function VisitPlanner({ templeId }: { templeId: string }) {
  const [visitDate, setVisitDate] = useState('')
  const [visitors, setVisitors] = useState('1')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  async function handleAddToTrip() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add temples to your trip",
        variant: "destructive"
      })
      router.push('/auth/login')
      return
    }

    if (!visitDate) {
      toast({
        title: "Select a date",
        description: "Please select a visit date",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    // Get user's active/planned trips
    const { data: trips } = await supabase
      .from('trips')
      .select('id, name, start_date')
      .eq('user_id', user.id)
      .in('status', ['planned', 'upcoming'])
      .order('created_at', { ascending: false })

    let tripId = null

    // Find a trip that matches the visit date or is close
    if (trips && trips.length > 0) {
      const matchingTrip = trips.find(t => t.start_date === visitDate)
      tripId = matchingTrip ? matchingTrip.id : trips[0].id
    }

    if (!tripId) {
      // Create a new trip
      const { data: temple } = await supabase
        .from('temples')
        .select('name, city')
        .eq('id', templeId)
        .single()

      const { data: newTrip, error: tripError } = await supabase
        .from('trips')
        .insert({
          user_id: user.id,
          name: `Trip to ${temple?.city || 'Temple'}`,
          destination: temple?.city || 'Temple',
          start_date: visitDate,
          travelers: parseInt(visitors),
          status: 'planned'
        })
        .select()
        .single()

      if (tripError) {
        toast({
          title: "Error creating trip",
          description: "Failed to create trip. Please try again.",
          variant: "destructive"
        })
        setLoading(false)
        return
      }

      tripId = newTrip.id
    }

    // Add temple to trip
    const { error } = await supabase
      .from('trip_temples')
      .insert({
        trip_id: tripId,
        temple_id: templeId,
        visit_date: visitDate,
        visitor_count: parseInt(visitors)
      })

    setLoading(false)

    if (!error) {
      toast({
        title: "Temple added to trip!",
        description: "You can view and manage your trip in My Trips"
      })
      
      // Redirect to trip detail page
      setTimeout(() => {
        router.push(`/my-trips/${tripId}`)
      }, 1500)
    } else {
      toast({
        title: "Already in trip",
        description: "This temple is already in your trip",
        variant: "destructive"
      })
    }
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="font-serif text-xl">Plan Your Visit</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="visit-date">Visit Date</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="visit-date"
              type="date"
              className="pl-10"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="visitors">Number of Visitors</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="visitors"
              type="number"
              value={visitors}
              onChange={(e) => setVisitors(e.target.value)}
              min="1"
              className="pl-10"
            />
          </div>
        </div>

        <Button className="w-full" onClick={handleAddToTrip} disabled={loading}>
          <Plus className="h-4 w-4 mr-2" />
          {loading ? 'Adding...' : 'Add to My Trip'}
        </Button>

        <div className="border-t pt-4 space-y-3">
          <h4 className="font-semibold text-sm">Quick Info</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Entry</span>
              <span className="text-foreground font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Best Time</span>
              <span className="text-foreground font-medium">Early Morning</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Duration</span>
              <span className="text-foreground font-medium">3-4 hours</span>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <Button variant="outline" className="w-full" onClick={() => router.push('/booking?tab=hotel')}>
            Book Accommodation
          </Button>
        </div>

        <div className="border-t pt-4">
          <Button variant="outline" className="w-full">
            View on Map
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
