'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { IndianRupee, ShoppingCart } from 'lucide-react'

export function BookingSummary() {
  const items = [
    { type: 'Train', details: 'Delhi → Tirupati', price: 2450 },
    { type: 'Hotel', details: '2 nights at Temple View Resort', price: 7000 },
  ]

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const taxes = Math.round(subtotal * 0.12)
  const total = subtotal + taxes

  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Booking Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {items.length > 0 ? (
          <>
            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge variant="outline" className="text-xs mb-1">{item.type}</Badge>
                      <p className="text-sm text-muted-foreground">{item.details}</p>
                    </div>
                    <p className="font-semibold flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      {item.price}
                    </p>
                  </div>
                  {index < items.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {subtotal}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Taxes & Fees</span>
                <span className="font-medium flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  {taxes}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary flex items-center">
                <IndianRupee className="h-5 w-5" />
                {total}
              </span>
            </div>

            <Button className="w-full" size="lg">
              Proceed to Payment
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              You can review and modify your bookings before payment
            </p>
          </>
        ) : (
          <div className="py-12 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-2">No bookings yet</p>
            <p className="text-sm text-muted-foreground">
              Start by searching for travel or accommodation options
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
