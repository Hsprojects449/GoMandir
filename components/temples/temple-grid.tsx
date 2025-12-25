'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Star, Clock, Heart, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export function TempleGrid() {
  const [temples, setTemples] = useState<any[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const supabase = createClient()

  useEffect(() => {
    loadTemples()
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    
    if (user) {
      const { data } = await supabase
        .from('favorites')
        .select('temple_id')
        .eq('user_id', user.id)
      
      setFavorites(data?.map(f => f.temple_id) || [])
    }
  }

  async function loadTemples() {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .order('rating', { ascending: false })
      .limit(12)

    if (!error && data) {
      setTemples(data)
    }
    setLoading(false)
  }

  async function toggleFavorite(templeId: string) {
    if (!user) {
      window.location.href = '/auth/login'
      return
    }

    const isFavorite = favorites.includes(templeId)
    
    if (isFavorite) {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('temple_id', templeId)
      
      setFavorites(prev => prev.filter(id => id !== templeId))
    } else {
      await supabase
        .from('favorites')
        .insert({ user_id: user.id, temple_id: templeId })
      
      setFavorites(prev => [...prev, templeId])
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{temples.length}</span> temples
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {temples.map((temple) => (
          <Card key={temple.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col sm:flex-row">
              <div className="relative aspect-[4/3] sm:aspect-square sm:w-48 flex-shrink-0">
                <img
                  src={temple.image || `/placeholder.svg?height=300&width=300&query=${temple.name}`}
                  alt={temple.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-3 right-3 h-9 w-9 rounded-full"
                  onClick={() => toggleFavorite(temple.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${favorites.includes(temple.id) ? 'fill-red-500 text-red-500' : ''}`}
                  />
                </Button>
                <Badge className="absolute bottom-3 left-3 bg-background/90 text-foreground">
                  {temple.category}
                </Badge>
              </div>
              
              <CardContent className="flex-1 p-5">
                <Link href={`/temples/${temple.id}`}>
                  <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {temple.name}
                  </h3>
                </Link>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{temple.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-semibold">{temple.rating}</span>
                    </div>
                  </div>
                  
                  {temple.timings && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{temple.timings}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {temple.deity && <Badge variant="outline">{temple.deity}</Badge>}
                  {temple.state && <Badge variant="outline">{temple.state}</Badge>}
                </div>
                
                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <Link href={`/temples/${temple.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
