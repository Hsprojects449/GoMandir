'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Search, Plane, Clock, IndianRupee, Briefcase } from 'lucide-react'

const flights = [
  {
    id: 'F1',
    airline: 'IndiGo',
    flightNumber: '6E-234',
    departure: '6:00 AM',
    arrival: '8:30 AM',
    duration: '2h 30m',
    stops: 'Non-stop',
    price: 5450,
    class: 'Economy',
    baggage: '15 kg',
  },
  {
    id: 'F2',
    airline: 'Air India',
    flightNumber: 'AI-512',
    departure: '10:15 AM',
    arrival: '1:00 PM',
    duration: '2h 45m',
    stops: 'Non-stop',
    price: 6200,
    class: 'Economy',
    baggage: '20 kg',
  },
  {
    id: 'F3',
    airline: 'SpiceJet',
    flightNumber: 'SG-823',
    departure: '2:30 PM',
    arrival: '5:15 PM',
    duration: '2h 45m',
    stops: 'Non-stop',
    price: 4890,
    class: 'Economy',
    baggage: '15 kg',
  },
  {
    id: 'F4',
    airline: 'Vistara',
    flightNumber: 'UK-678',
    departure: '7:00 PM',
    arrival: '9:45 PM',
    duration: '2h 45m',
    stops: 'Non-stop',
    price: 7100,
    class: 'Premium Economy',
    baggage: '25 kg',
  },
]

export function FlightBooking() {
  const [showResults, setShowResults] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Search Flights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="flight-from" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                From
              </Label>
              <Input id="flight-from" placeholder="Source airport" defaultValue="Delhi (DEL)" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flight-to" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                To
              </Label>
              <Input id="flight-to" placeholder="Destination airport" defaultValue="Tirupati (TIR)" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="flight-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Departure Date
              </Label>
              <Input id="flight-date" type="date" />
            </div>
            
            <div className="flex items-end">
              <Button className="w-full" onClick={() => setShowResults(true)}>
                <Search className="mr-2 h-4 w-4" />
                Search Flights
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              Available Flights ({flights.length})
            </h3>
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
              <option>Sort by: Cheapest</option>
              <option>Departure Time</option>
              <option>Duration: Shortest</option>
              <option>Arrival Time</option>
            </select>
          </div>

          {flights.map((flight) => (
            <Card key={flight.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        <Plane className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{flight.airline}</h4>
                        <p className="text-sm text-muted-foreground">{flight.flightNumber}</p>
                      </div>
                    </div>
                    <Badge>{flight.stops}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div>
                      <p className="font-semibold text-2xl">{flight.departure}</p>
                      <p className="text-sm text-muted-foreground">Delhi (DEL)</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="flex items-center gap-1 w-fit mx-auto mb-2">
                        <Clock className="h-3 w-3" />
                        {flight.duration}
                      </Badge>
                      <div className="h-px bg-border" />
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-2xl">{flight.arrival}</p>
                      <p className="text-sm text-muted-foreground">Tirupati (TIR)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      <span>{flight.baggage}</span>
                    </div>
                    <span>•</span>
                    <span>{flight.class}</span>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Fare</p>
                      <p className="font-bold text-2xl flex items-center">
                        <IndianRupee className="h-5 w-5" />
                        {flight.price}
                      </p>
                    </div>
                    <Button size="lg">Book Now</Button>
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
