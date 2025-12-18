'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Search, Users, Star, IndianRupee, Wifi, Coffee, CarIcon } from 'lucide-react'

const hotels = [
  {
    id: 'H1',
    name: 'Temple View Resort',
    type: 'Resort',
    rating: 4.6,
    reviews: 1250,
    distance: '2 km from temple',
    pricePerNight: 3500,
    image: '/luxury-hotel-exterior.png',
    amenities: ['Free WiFi', 'Breakfast', 'Parking', 'AC', 'Room Service'],
    roomType: 'Deluxe Room',
  },
  {
    id: 'H2',
    name: 'Sacred Stay Inn',
    type: 'Hotel',
    rating: 4.3,
    reviews: 890,
    distance: '1 km from temple',
    pricePerNight: 2200,
    image: '/comfortable-hotel-room.png',
    amenities: ['Free WiFi', 'Breakfast', 'AC'],
    roomType: 'Standard Room',
  },
  {
    id: 'H3',
    name: 'Divine Residency',
    type: 'Guesthouse',
    rating: 4.8,
    reviews: 456,
    distance: '0.5 km from temple',
    pricePerNight: 1800,
    image: '/cozy-guesthouse.png',
    amenities: ['WiFi', 'Breakfast', 'Temple View'],
    roomType: 'Economy Room',
  },
  {
    id: 'H4',
    name: 'Temple Guesthouse',
    type: 'Temple Stay',
    rating: 4.4,
    reviews: 678,
    distance: 'Inside temple complex',
    pricePerNight: 1200,
    image: '/temple-guesthouse.jpg',
    amenities: ['Basic Amenities', 'Darshan Priority', 'Meals'],
    roomType: 'Dormitory',
  },
]

export function HotelBooking() {
  const [showResults, setShowResults] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Search Accommodation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <Label htmlFor="hotel-location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Location
              </Label>
              <Input id="hotel-location" placeholder="City or temple" defaultValue="Tirupati" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hotel-checkin" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Check-in
              </Label>
              <Input id="hotel-checkin" type="date" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hotel-checkout" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Check-out
              </Label>
              <Input id="hotel-checkout" type="date" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hotel-guests" className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                Guests
              </Label>
              <Input id="hotel-guests" type="number" defaultValue="2" min="1" />
            </div>
            
            <div className="flex items-end">
              <Button className="w-full" onClick={() => setShowResults(true)}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              Available Properties ({hotels.length})
            </h3>
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Rating: High to Low</option>
              <option>Distance from Temple</option>
            </select>
          </div>

          {hotels.map((hotel) => (
            <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={hotel.image || "/placeholder.svg"}
                      alt={hotel.name}
                      className="w-full sm:w-64 h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-lg">{hotel.name}</h4>
                          <Badge variant="outline">{hotel.type}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="font-semibold text-foreground">{hotel.rating}</span>
                            <span>({hotel.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{hotel.distance}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">{hotel.roomType}</p>
                      <div className="flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Per night</p>
                        <p className="font-bold text-2xl flex items-center">
                          <IndianRupee className="h-5 w-5" />
                          {hotel.pricePerNight}
                        </p>
                        <p className="text-xs text-muted-foreground">+ taxes</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline">View Details</Button>
                        <Button size="lg">Book Now</Button>
                      </div>
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
