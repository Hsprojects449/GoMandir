'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { MapPin, Calendar, Search, ArrowRight, Clock, IndianRupee } from 'lucide-react'

const trains = [
  {
    id: 'T1',
    name: 'Rajdhani Express',
    number: '12431',
    from: 'New Delhi',
    to: 'Tirupati',
    departure: '11:30 AM',
    arrival: '6:45 AM +1',
    duration: '19h 15m',
    classes: [
      { type: '3A', price: 2450, available: 28 },
      { type: '2A', price: 3680, available: 12 },
      { type: '1A', price: 6250, available: 4 },
    ],
  },
  {
    id: 'T2',
    name: 'Shatabdi Express',
    number: '12008',
    from: 'New Delhi',
    to: 'Tirupati',
    departure: '6:00 AM',
    arrival: '11:30 PM',
    duration: '17h 30m',
    classes: [
      { type: 'CC', price: 1850, available: 45 },
      { type: 'EC', price: 3420, available: 18 },
    ],
  },
  {
    id: 'T3',
    name: 'Duronto Express',
    number: '12263',
    from: 'New Delhi',
    to: 'Tirupati',
    departure: '10:15 PM',
    arrival: '4:00 PM +1',
    duration: '17h 45m',
    classes: [
      { type: 'SL', price: 1240, available: 62 },
      { type: '3A', price: 2280, available: 35 },
      { type: '2A', price: 3450, available: 15 },
    ],
  },
]

export function TrainBooking() {
  const [from, setFrom] = useState('New Delhi')
  const [to, setTo] = useState('Tirupati')
  const [date, setDate] = useState('')
  const [showResults, setShowResults] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-2xl">Search Trains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="train-from" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                From
              </Label>
              <Input
                id="train-from"
                placeholder="Source station"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="train-to" className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                To
              </Label>
              <Input
                id="train-to"
                placeholder="Destination station"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="train-date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Journey Date
              </Label>
              <Input
                id="train-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            
            <div className="flex items-end">
              <Button className="w-full" onClick={() => setShowResults(true)}>
                <Search className="mr-2 h-4 w-4" />
                Search Trains
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showResults && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              Available Trains ({trains.length})
            </h3>
            <select className="rounded-lg border border-input bg-background px-3 py-2 text-sm">
              <option>Sort by: Departure</option>
              <option>Price: Low to High</option>
              <option>Duration: Shortest</option>
            </select>
          </div>

          {trains.map((train) => (
            <Card key={train.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{train.name}</h4>
                      <p className="text-sm text-muted-foreground">{train.number}</p>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {train.duration}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div>
                      <p className="font-semibold text-xl">{train.departure}</p>
                      <p className="text-sm text-muted-foreground">{train.from}</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="flex-1 h-px bg-border" />
                      <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-xl">{train.arrival}</p>
                      <p className="text-sm text-muted-foreground">{train.to}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex flex-wrap gap-3">
                      {train.classes.map((cls) => (
                        <div
                          key={cls.type}
                          className="flex items-center justify-between rounded-lg border p-3 hover:border-primary cursor-pointer flex-1 min-w-[140px]"
                        >
                          <div>
                            <p className="font-semibold">{cls.type}</p>
                            <p className="text-sm text-muted-foreground">
                              {cls.available} seats
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold flex items-center">
                              <IndianRupee className="h-4 w-4" />
                              {cls.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full">Book Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
