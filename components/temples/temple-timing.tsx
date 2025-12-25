'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Calendar, IndianRupee, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function TempleTiming({ templeId }: { templeId: string }) {
  const [temple, setTemple] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function fetchTemple() {
      const { data, error } = await supabase
        .from('temples')
        .select('*')
        .eq('id', templeId)
        .single()

      if (data) {
        setTemple(data)
      }
      setLoading(false)
    }

    fetchTemple()
  }, [templeId])

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    )
  }

  if (!temple) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          Timings & Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Temple Hours</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b">
              <span className="font-medium">Opening Time</span>
              <span className="text-muted-foreground">
                {temple.opening_time ? new Date(`2000-01-01T${temple.opening_time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : 'Not specified'}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <span className="font-medium">Closing Time</span>
              <span className="text-muted-foreground">
                {temple.closing_time ? new Date(`2000-01-01T${temple.closing_time}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) : 'Not specified'}
              </span>
            </div>
            {temple.entry_fee && (
              <div className="flex items-center justify-between py-3">
                <span className="font-medium flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" />
                  Entry Fee
                </span>
                <span className="text-muted-foreground">{temple.entry_fee}</span>
              </div>
            )}
          </div>
        </div>
        
        {temple.dress_code && (
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-3">Dress Code</h3>
            <p className="text-muted-foreground">{temple.dress_code}</p>
          </div>
        )}
        
        {temple.festivals && temple.festivals.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Major Festivals
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {temple.festivals.map((festival: string, index: number) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="font-medium">{festival}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Timings may vary during festivals and special occasions. Please check before planning your visit.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
