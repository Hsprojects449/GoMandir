'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Calendar, Users, Sparkles, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export function TripPlanner() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    travelers: 2,
    notes: '',
    destination: ''
  })
  const router = useRouter()
  const supabase = createClient()

  async function handleCreateTrip() {
    setLoading(true)
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/auth/login')
      return
    }

    const { data, error } = await supabase
      .from('trips')
      .insert({
        user_id: user.id,
        trip_name: formData.name,
        destination: formData.destination,
        start_date: formData.start_date,
        end_date: formData.end_date,
        travelers: formData.travelers,
        notes: formData.notes,
        status: 'planned'
      })
      .select()
      .single()

    if (!error && data) {
      router.push(`/my-trips/${data.id}`)
    } else {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-2xl">Create New Trip</CardTitle>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-12 rounded-full ${
                  s <= step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Basic Details</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trip-name">Trip Name</Label>
                  <Input
                    id="trip-name"
                    placeholder="e.g., South India Temple Circuit"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Tamil Nadu"
                    value={formData.destination}
                    onChange={(e) => setFormData({...formData, destination: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      Start Date
                    </Label>
                    <Input 
                      id="start-date" 
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      End Date
                    </Label>
                    <Input 
                      id="end-date" 
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="travelers" className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Number of Travelers
                  </Label>
                  <Input
                    id="travelers"
                    type="number"
                    value={formData.travelers}
                    onChange={(e) => setFormData({...formData, travelers: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any preferences or special requirements..."
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button onClick={() => setStep(2)}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Ready to Create Your Journey</h3>
              <p className="text-muted-foreground mb-6">
                Your trip details have been saved. Click below to create your itinerary.
              </p>
            </div>
            
            <div className="flex justify-between gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleCreateTrip} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Trip...
                  </>
                ) : (
                  'Create Trip'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
