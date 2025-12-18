'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation } from 'lucide-react'

export function ItineraryMap({ tripId }: { tripId: string }) {
  const locations = [
    { name: 'Delhi', lat: 28.7041, lng: 77.1025, type: 'start' },
    { name: 'Tirupati', lat: 13.6288, lng: 79.4192, type: 'temple' },
    { name: 'Madurai', lat: 9.9252, lng: 78.1198, type: 'temple' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl flex items-center gap-2">
          <Navigation className="h-6 w-6 text-primary" />
          Trip Route
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-lg bg-muted/30 overflow-hidden relative">
          {/* Placeholder for actual map integration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 p-8">
              <MapPin className="h-16 w-16 mx-auto text-primary/50" />
              <div>
                <p className="font-semibold mb-2">Interactive Map View</p>
                <p className="text-sm text-muted-foreground">
                  Integrate with Google Maps API to show route and locations
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                {locations.map((location) => (
                  <Badge key={location.name} variant="secondary">
                    <MapPin className="h-3 w-3 mr-1" />
                    {location.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-semibold mb-2">Route Summary</h4>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Distance</span>
              <span className="font-medium">~1,850 km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Travel Time</span>
              <span className="font-medium">~32 hours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Temples Covered</span>
              <span className="font-medium">8 temples</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
