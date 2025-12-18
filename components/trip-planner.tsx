'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, MapPin, Search, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function TripPlanner() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [travelers, setTravelers] = useState('1')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/login')
      return
    }

    // Create a new trip in the database
    const { data, error } = await supabase
      .from('trips')
      .insert({
        user_id: user.id,
        name: `Trip to ${destination}`,
        destination,
        source,
        start_date: date,
        travelers: parseInt(travelers),
        status: 'planned'
      })
      .select()
      .single()

    if (!error && data) {
      router.push(`/my-trips/${data.id}`)
    } else {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
      <div className="mx-auto max-w-5xl">
        <Card className="p-8 shadow-2xl border-primary/20">
          <div className="mb-6 text-center">
            <h2 className="font-serif text-3xl font-bold mb-2">Plan Your Sacred Journey</h2>
            <p className="text-muted-foreground">Tell us where you want to go, and we'll create the perfect itinerary</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="source" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  From
                </Label>
                <Input
                  id="source"
                  placeholder="Your city"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-primary" />
                  Destination
                </Label>
                <Input
                  id="destination"
                  placeholder="Temple or city"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Travel Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="travelers" className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Travelers
                </Label>
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="h-12"
                  required
                />
              </div>
            </div>
            
            <Button type="submit" size="lg" className="w-full mt-6 h-12 text-base" disabled={loading}>
              <Search className="mr-2 h-5 w-5" />
              {loading ? 'Creating Trip...' : 'Find My Journey'}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  )
}
