'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Search, Clock, Star, IndianRupee } from 'lucide-react'

const buses = [
  {
    id: 'B1',
    operator: 'RedBus Travels',
    type: 'AC Sleeper',
    departure: '10:00 PM',
    arrival: '8:00 AM +1',
    duration: '10h',
    rating: 4.5,
    price: 1250,
    seatsAvailable: 18,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle'],
  },
  {
    id: 'B2',
    operator: 'VRL Travels',
    type: 'Semi Sleeper',
    departure: '11:30 PM',
    arrival: '9:30 AM +1',
    duration: '10h',
    rating: 4.3,
    price: 950,
    seatsAvailable: 24,
    amenities: ['AC', 'Charging Point', 'Emergency Exit'],
  },
  {
    id: 'B3',
    operator: 'SRS Travels',
    type: 'Volvo Multi Axle',
    departure: '9:00 PM',
    arrival: '7:30 AM +1',
    duration: '10h 30m',
    rating: 4.7,
    price: 1450,
    seatsAvailable: 12,
    amenities: ['AC', 'WiFi', 'Blanket', 'Water Bottle', 'Reading Light'],
  },
]

export function BusBooking() {
  const [showResults, setShowResults] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Search Buses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="bus-from" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                From
              </Label>
              <Input id="bus-from" placeholder="Source city" defaultValue="Delhi" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bus-to" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                To
              </Label>
              <Input id="bus-to" placeholder="Destination city" defaultValue="Tirupati" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bus-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Journey Date
              </Label>
              <Input id="bus-date" type="date" />
            </div>
            
            <div className="flex items-end">
              <Button className="w-full" onClick={() => setShowResults(true)}>
                <Search className="mr-2 h-4 w-4" />
                Search Buses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              Available Buses ({buses.length})
            </h3>
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
              <option>Sort by: Departure</option>
              <option>Price: Low to High</option>
              <option>Rating: High to Low</option>
            </select>
          </div>

          {buses.map((bus) => (
            <Card key={bus.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{bus.operator}</h4>
                      <p className="text-sm text-muted-foreground">{bus.type}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{bus.rating}</span>
                      </div>
                      <Badge variant="outline">{bus.seatsAvailable} seats left</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold text-xl">{bus.departure}</p>
                      <p className="text-sm text-muted-foreground">Departure</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit mx-auto">
                        <Clock className="h-3 w-3" />
                        {bus.duration}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-xl">{bus.arrival}</p>
                      <p className="text-sm text-muted-foreground">Arrival</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {bus.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="font-bold text-2xl flex items-center">
                        <IndianRupee className="h-5 w-5" />
                        {bus.price}
                      </p>
                    </div>
                    <Button size="lg">Select Seats</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
