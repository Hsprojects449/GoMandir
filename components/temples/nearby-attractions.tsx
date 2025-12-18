import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

const attractions = [
  {
    name: 'Sri Padmavathi Ammavari Temple',
    type: 'Temple',
    distance: '5 km',
    description: 'Dedicated to Goddess Padmavathi, consort of Lord Venkateswara',
  },
  {
    name: 'Chandragiri Fort',
    type: 'Historical Site',
    distance: '12 km',
    description: '11th century fort with Indo-Sarcenic architecture',
  },
  {
    name: 'Talakona Waterfall',
    type: 'Natural Wonder',
    distance: '45 km',
    description: 'Highest waterfall in Andhra Pradesh, nestled in forest',
  },
  {
    name: 'Deer Park',
    type: 'Wildlife',
    distance: '8 km',
    description: 'Scenic park with deer and various species of birds',
  },
]

export function NearbyAttractions({ templeId }: { templeId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">Nearby Attractions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {attractions.map((attraction) => (
            <div key={attraction.name} className="rounded-lg border p-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold">{attraction.name}</h4>
                <span className="text-xs text-muted-foreground">{attraction.type}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{attraction.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-primary">
                  <MapPin className="h-4 w-4" />
                  <span>{attraction.distance}</span>
                </div>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
