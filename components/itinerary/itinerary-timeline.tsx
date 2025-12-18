import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Train, Building2, CalendarDays, Plus } from 'lucide-react'

const itinerary = [
  {
    day: 1,
    date: 'March 15, 2025',
    activities: [
      {
        type: 'travel',
        icon: Train,
        time: '6:00 AM',
        title: 'Train Departure from Delhi',
        description: 'Rajdhani Express - 12431',
        duration: '19h 15m',
      },
      {
        type: 'accommodation',
        icon: Building2,
        time: '1:00 AM +1',
        title: 'Check-in at Temple View Resort',
        description: 'Deluxe Room for 2 nights',
      },
    ],
  },
  {
    day: 2,
    date: 'March 16, 2025',
    activities: [
      {
        type: 'temple',
        icon: MapPin,
        time: '5:00 AM',
        title: 'Tirupati Balaji Temple',
        description: 'Early morning darshan - General queue',
        duration: '3-4 hours',
      },
      {
        type: 'temple',
        icon: MapPin,
        time: '2:00 PM',
        title: 'Sri Padmavathi Temple',
        description: 'Afternoon visit - 5 km away',
        duration: '2 hours',
      },
      {
        type: 'sightseeing',
        icon: MapPin,
        time: '5:00 PM',
        title: 'Local Sightseeing',
        description: 'Visit Chandragiri Fort',
        duration: '2 hours',
      },
    ],
  },
  {
    day: 3,
    date: 'March 17, 2025',
    activities: [
      {
        type: 'temple',
        icon: MapPin,
        time: '6:00 AM',
        title: 'ISKCON Temple',
        description: 'Morning aarti and prasadam',
        duration: '2 hours',
      },
      {
        type: 'travel',
        icon: Train,
        time: '4:00 PM',
        title: 'Travel to Madurai',
        description: 'By Bus - 8 hours journey',
      },
    ],
  },
]

export function ItineraryTimeline({ tripId }: { tripId: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-2xl">Daily Itinerary</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {itinerary.map((day, dayIndex) => (
          <div key={day.day} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">
                {day.day}
              </div>
              <div>
                <h3 className="font-semibold text-lg">Day {day.day}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {day.date}
                </p>
              </div>
            </div>
            
            <div className="ml-6 border-l-2 border-primary/20 pl-6 space-y-6">
              {day.activities.map((activity, actIndex) => (
                <div key={actIndex} className="relative">
                  <div className="absolute -left-[29px] top-2 w-4 h-4 rounded-full border-2 border-primary bg-background" />
                  
                  <Card className="hover:border-primary/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 flex-shrink-0">
                          <activity.icon className="h-5 w-5 text-primary" />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {activity.time}
                                </Badge>
                                {activity.duration && (
                                  <span className="text-xs text-muted-foreground">
                                    {activity.duration}
                                  </span>
                                )}
                              </div>
                              <h4 className="font-semibold">{activity.title}</h4>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add New Day
        </Button>
      </CardContent>
    </Card>
  )
}
