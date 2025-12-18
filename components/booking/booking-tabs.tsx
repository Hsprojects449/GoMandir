'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Train, Bus, Plane, Car, Building2 } from 'lucide-react'
import { TrainBooking } from './train-booking'
import { BusBooking } from './bus-booking'
import { FlightBooking } from './flight-booking'
import { CarBooking } from './car-booking'
import { HotelBooking } from './hotel-booking'

export function BookingTabs() {
  return (
    <Tabs defaultValue="train" className="w-full">
      <TabsList className="grid w-full grid-cols-5 h-auto">
        <TabsTrigger value="train" className="flex flex-col gap-2 py-3">
          <Train className="h-5 w-5" />
          <span className="text-xs">Train</span>
        </TabsTrigger>
        <TabsTrigger value="bus" className="flex flex-col gap-2 py-3">
          <Bus className="h-5 w-5" />
          <span className="text-xs">Bus</span>
        </TabsTrigger>
        <TabsTrigger value="flight" className="flex flex-col gap-2 py-3">
          <Plane className="h-5 w-5" />
          <span className="text-xs">Flight</span>
        </TabsTrigger>
        <TabsTrigger value="car" className="flex flex-col gap-2 py-3">
          <Car className="h-5 w-5" />
          <span className="text-xs">Car</span>
        </TabsTrigger>
        <TabsTrigger value="hotel" className="flex flex-col gap-2 py-3">
          <Building2 className="h-5 w-5" />
          <span className="text-xs">Hotel</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="train" className="mt-6">
        <TrainBooking />
      </TabsContent>
      
      <TabsContent value="bus" className="mt-6">
        <BusBooking />
      </TabsContent>
      
      <TabsContent value="flight" className="mt-6">
        <FlightBooking />
      </TabsContent>
      
      <TabsContent value="car" className="mt-6">
        <CarBooking />
      </TabsContent>
      
      <TabsContent value="hotel" className="mt-6">
        <HotelBooking />
      </TabsContent>
    </Tabs>
  )
}
