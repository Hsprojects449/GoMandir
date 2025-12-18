'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export function PopularTemples() {
  const [temples, setTemples] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadPopularTemples()
  }, [])

  async function loadPopularTemples() {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .order('rating', { ascending: false })
      .limit(6)

    if (!error && data) {
      setTemples(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-serif text-4xl font-bold mb-2">Popular Temple Destinations</h2>
            <p className="text-xl text-muted-foreground">Explore the most visited sacred places across India</p>
          </div>
          <Button asChild variant="outline" className="hidden sm:flex">
            <Link href="/temples">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {temples.map((temple) => (
            <Link href={`/temples/${temple.id}`} key={temple.id}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={temple.image_url || `/placeholder.svg?height=400&width=600&query=${temple.name}`}
                    alt={temple.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {temple.rating >= 4.8 && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-serif text-xl font-semibold mb-2">{temple.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{temple.location}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-semibold">{temple.rating}</span>
                    </div>
                  </div>
                  {temple.deity && (
                    <p className="text-sm text-muted-foreground mb-4">{temple.deity}</p>
                  )}
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Plan Visit
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Button asChild variant="outline">
            <Link href="/temples">
              View All Temples <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
