import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Train, Building2, Car, CheckCircle2, AlertCircle } from 'lucide-react'

const bookings = [
  {
    id: 'B1',
    type: 'Train',
    icon: Train,
    title: 'Rajdhani Express',
    details: 'Delhi → Tirupati',
    date: 'Mar 15, 6:00 AM',
    status: 'confirmed',
    reference: 'PNR: 8234567890',
  },
  {
    id: 'B2',
    type: 'Hotel',
    icon: Building2,
    title: 'Temple View Resort',
    details: '2 nights, Deluxe Room',
    date: 'Mar 16-18',
    status: 'confirmed',
    reference: 'Booking: TVR-2025-456',
  },
  {
    id: 'B3',
    type: 'Car',
    icon: Car,
    title: 'Toyota Innova',
    details: 'Local sightseeing',
    date: 'Mar 16, Full Day',
    status: 'pending',
    reference: 'Ref: CAR-789',
  },
]

export function BookingsCard({ tripId }: { tripId: string }) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="font-serif text-xl">Bookings</CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="space-y-3 pb-4 border-b last:border-0 last:pb-0">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
                <booking.icon className="h-5 w-5 text-primary" />
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-sm">{booking.title}</h4>
                    <p className="text-sm text-muted-foreground">{booking.details}</p>
                    <p className="text-xs text-muted-foreground mt-1">{booking.date}</p>
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
                <p className="text-xs text-muted-foreground">{booking.reference}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
