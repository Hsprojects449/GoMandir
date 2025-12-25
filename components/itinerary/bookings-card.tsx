'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Train, Building2, Car, CheckCircle2, AlertCircle, Plane, Bus, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const bookingIcons: Record<string, any> = {
  train: Train,
  hotel: Building2,
  car: Car,
  flight: Plane,
  bus: Bus,
}

export function BookingsCard({ tripId }: { tripId: string }) {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadBookings() {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('trip_id', tripId)
        .order('departure_date', { ascending: true })
      
      if (data) {
        setBookings(data)
      }
      setLoading(false)
    }
    loadBookings()
  }, [tripId])

  if (loading) {
    return (
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="font-serif text-xl">Bookings</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="font-serif text-xl">Bookings</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No bookings yet</p>
            <Button variant="outline" size="sm" className="mt-3">
              Add Booking
            </Button>
          </div>
        ) : (
          bookings.map((booking) => {
            const Icon = bookingIcons[booking.booking_type] || Train
            const details = booking.from_location && booking.to_location 
              ? `${booking.from_location} → ${booking.to_location}`
              : booking.provider
            const date = booking.departure_date 
              ? new Date(booking.departure_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })
              : 'TBD'
            
            return (
              <div key={booking.id} className="space-y-3 pb-4 border-b last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">{booking.provider}</h4>
                        <p className="text-sm text-muted-foreground">{details}</p>
                        <p className="text-xs text-muted-foreground mt-1">{date}</p>
                        <p className="text-xs font-semibold mt-1">₹{booking.price}</p>
                      </div>
                      <Badge 
                        variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                        className="ml-2"
                      >
                        {booking.status === 'confirmed' ? (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {booking.status}
                      </Badge>
                    </div>
                    {booking.booking_reference && (
                      <p className="text-xs text-muted-foreground">Ref: {booking.booking_reference}</p>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
