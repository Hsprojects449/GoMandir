'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Search, Users, Star, IndianRupee, Fuel } from 'lucide-react'

const cars = [
  {
    id: 'C1',
    name: 'Swift Dzire',
    type: 'Sedan',
    seats: 4,
    fuel: 'Diesel',
    rating: 4.5,
    pricePerKm: 12,
    image: '/silver-sedan.png',
    features: ['AC', 'GPS', 'Music System'],
  },
  {
    id: 'C2',
    name: 'Toyota Innova',
    type: 'SUV',
    seats: 7,
    fuel: 'Diesel',
    rating: 4.7,
    pricePerKm: 18,
    image: '/suv-car.png',
    features: ['AC', 'GPS', 'Music System', 'Extra Luggage'],
  },
  {
    id: 'C3',
    name: 'Honda City',
    type: 'Sedan',
    seats: 4,
    fuel: 'Petrol',
    rating: 4.4,
    pricePerKm: 13,
    image: '/sedan-car-2.jpg',
    features: ['AC', 'GPS', 'Bluetooth'],
  },
  {
    id: 'C4',
    name: 'Tempo Traveller',
    type: 'Mini Bus',
    seats: 12,
    fuel: 'Diesel',
    rating: 4.6,
    pricePerKm: 25,
    image: '/tempo-traveller.jpg',
    features: ['AC', 'Push Back Seats', 'LCD', 'Extra Luggage'],
  },
]

export function CarBooking() {
  const [showResults, setShowResults] = useState(false)
  const [distance, setDistance] = useState('650')

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Book a Car</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="car-from" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Pickup Location
              </Label>
              <Input id="car-from" placeholder="From" defaultValue="Delhi" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="car-to" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Drop Location
              </Label>
              <Input id="car-to" placeholder="To" defaultValue="Tirupati" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="car-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Pickup Date
              </Label>
              <Input id="car-date" type="date" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="car-passengers" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Passengers
              </Label>
              <Input id="car-passengers" type="number" defaultValue="4" min="1" />
            </div>
            
            <div className="flex items-end">
              <Button className="w-full" onClick={() => setShowResults(true)}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
            <p className="text-muted-foreground">
              Estimated Distance: <span className="font-semibold text-foreground">{distance} km</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              Available Cars ({cars.length})
            </h3>
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
              <option>Sort by: Price</option>
              <option>Rating: High to Low</option>
              <option>Seats: High to Low</option>
            </select>
          </div>

          {cars.map((car) => (
            <Card key={car.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      className="w-full sm:w-48 h-32 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{car.name}</h4>
                        <p className="text-sm text-muted-foreground">{car.type}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{car.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{car.seats} Seats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-muted-foreground" />
                        <span>{car.fuel}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {car.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          <IndianRupee className="h-4 w-4 inline" />
                          {car.pricePerKm}/km
                        </p>
                        <p className="font-bold text-xl flex items-center">
                          <IndianRupee className="h-5 w-5" />
                          {(car.pricePerKm * parseInt(distance)).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Estimated Total</p>
                      </div>
                      <Button size="lg">Book Now</Button>
                    </div>
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
