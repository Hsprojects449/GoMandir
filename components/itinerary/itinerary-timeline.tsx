'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Train, Building2, CalendarDays, Plus, Loader2, Utensils, Car } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const activityIcons: Record<string, any> = {
  temple: MapPin,
  travel: Train,
  meal: Utensils,
  accommodation: Building2,
  other: MapPin,
}

export function ItineraryTimeline({ tripId }: { tripId: string }) {
  const [itinerary, setItinerary] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadItinerary() {
      const { data, error } = await supabase
        .from('itinerary_items')
        .select('*')
        .eq('trip_id', tripId)
        .order('day_number', { ascending: true })
        .order('time', { ascending: true })
      
      if (data) {
        // Group by day
        const grouped = data.reduce((acc: any, item: any) => {
          if (!acc[item.day_number]) {
            acc[item.day_number] = []
          }
          acc[item.day_number].push(item)
          return acc
        }, {})
        
        const formatted = Object.keys(grouped).map(day => ({
          day: parseInt(day),
          activities: grouped[day].map((item: any) => ({
            id: item.id,
            type: item.activity_type,
            icon: activityIcons[item.activity_type] || MapPin,
            time: item.time ? new Date(`2000-01-01T${item.time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : 'TBD',
            title: item.title,
            description: item.description || '',
            location: item.location,
            cost: item.cost,
          }))
        }))
        
        setItinerary(formatted)
      }
      setLoading(false)
    }
    loadItinerary()
  }, [tripId])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

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
        {itinerary.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No itinerary items yet</p>
            <Button variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add First Activity
            </Button>
          </div>
        ) : (
          itinerary.map((day, dayIndex) => (
            <div key={day.day} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">
                  {day.day}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Day {day.day}</h3>
                </div>
              </div>
            
              <div className="ml-6 border-l-2 border-primary/20 pl-6 space-y-6">
                {day.activities.map((activity: any, actIndex: number) => (
                  <div key={activity.id || actIndex} className="relative">
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
                                  {activity.cost && (
                                    <span className="text-xs text-muted-foreground">
                                      ₹{activity.cost}
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-semibold">{activity.title}</h4>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                                {activity.location && (
                                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {activity.location}
                                  </p>
                                )}
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
          ))
        )}
        
        <Button variant="outline" className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add New Day
        </Button>
      </CardContent>
    </Card>
  )
}
