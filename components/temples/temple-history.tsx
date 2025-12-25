'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function TempleHistory({ templeId }: { templeId: string }) {
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

  if (!temple || !temple.history) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          History & Legend
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {temple.history}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
