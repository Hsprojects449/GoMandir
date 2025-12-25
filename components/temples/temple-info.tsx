'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function TempleInfo({ templeId }: { templeId: string }) {
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

  if (!temple) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12 text-muted-foreground">
          Temple information not available
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">About This Temple</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {temple.description && (
          <div>
            <h3 className="font-semibold text-lg mb-3">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {temple.description}
            </p>
          </div>
        )}
        
        <div>
          <h3 className="font-semibold text-lg mb-3">Temple Details</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {temple.category && <Badge>{temple.category}</Badge>}
            {temple.deity && <Badge>Deity: {temple.deity}</Badge>}
            {temple.state && <Badge>{temple.state}</Badge>}
          </div>
          {temple.best_time_to_visit && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold">Best time to visit:</span> {temple.best_time_to_visit}
            </p>
          )}
        </div>
        
        {temple.rituals && temple.rituals.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-3">Rituals & Practices</h3>
            <ul className="space-y-2 text-muted-foreground">
              {temple.rituals.map((ritual: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{ritual}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {temple.festivals && temple.festivals.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-3">Major Festivals</h3>
            <div className="flex flex-wrap gap-2">
              {temple.festivals.map((festival: string, index: number) => (
                <Badge key={index} variant="outline">{festival}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
