'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IndianRupee, TrendingUp, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function ExpenseSummary({ tripId }: { tripId: string }) {
  const [expenses, setExpenses] = useState<Record<string, number>>({})
  const [trip, setTrip] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadExpenses() {
      // Get trip details
      const { data: tripData } = await supabase
        .from('trips')
        .select('*')
        .eq('id', tripId)
        .single()

      // Get bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('booking_type, price')
        .eq('trip_id', tripId)

      // Get itinerary items with costs
      const { data: itineraryData } = await supabase
        .from('itinerary_items')
        .select('activity_type, cost')
        .eq('trip_id', tripId)

      // Aggregate expenses by category
      const expensesByCategory: Record<string, number> = {}
      
      bookingsData?.forEach(booking => {
        const category = booking.booking_type === 'hotel' ? 'accommodation' : 'transportation'
        expensesByCategory[category] = (expensesByCategory[category] || 0) + Number(booking.price || 0)
      })

      itineraryData?.forEach(item => {
        const category = item.activity_type === 'temple' ? 'activities' : item.activity_type
        expensesByCategory[category] = (expensesByCategory[category] || 0) + Number(item.cost || 0)
      })

      setExpenses(expensesByCategory)
      setTrip(tripData)
      setLoading(false)
    }
    loadExpenses()
  }, [tripId])

  if (loading) {
    return (
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="font-serif text-xl flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            Trip Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  const total = Object.values(expenses).reduce((sum, val) => sum + val, 0)
  const travelers = trip?.travelers || 1

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <IndianRupee className="h-5 w-5" />
          Trip Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {Object.keys(expenses).length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-4">No expenses tracked yet</p>
        ) : (
          <>
            <div className="space-y-3">
              {Object.entries(expenses).map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm capitalize text-muted-foreground">{category}</span>
                  <span className="font-semibold">₹{amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Cost</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Per person: ₹{(total / travelers).toLocaleString('en-IN')}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
