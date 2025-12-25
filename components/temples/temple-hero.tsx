'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, Share2, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

interface Temple {
  id: string
  name: string
  location: string
  city: string
  state: string
  rating: number
  review_count: number
  image: string
  description: string
  is_favorited?: boolean
}

export function TempleHero({ templeId }: { templeId: string }) {
  const [temple, setTemple] = useState<Temple | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteLoading, setFavoriteLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function fetchTemple() {
      const { data, error } = await supabase
        .from('temples')
        .select('*')
        .eq('id', templeId)
        .single()

      if (data) {
        setTemple(data)
        // Check if favorited
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: fav } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', user.id)
            .eq('temple_id', templeId)
            .single()
          
          setIsFavorited(!!fav)
        }
      }
      setLoading(false)
    }

    fetchTemple()
  }, [templeId])

  async function handleAddToTrip() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to add temples to your trip",
        variant: "destructive"
      })
      router.push('/auth/login')
      return
    }

    // Get user's active/planned trips
    const { data: trips } = await supabase
      .from('trips')
      .select('id, name')
      .eq('user_id', user.id)
      .in('status', ['planned', 'upcoming'])
      .order('created_at', { ascending: false })
      .limit(1)

    if (trips && trips.length > 0) {
      // Add temple to existing trip
      const { error } = await supabase
        .from('trip_temples')
        .insert({
          trip_id: trips[0].id,
          temple_id: templeId
        })

      if (!error) {
        toast({
          title: "Temple added!",
          description: `${temple?.name} has been added to your trip: ${trips[0].name}`
        })
      }
    } else {
      // No active trip - redirect to create one
      toast({
        title: "Create a trip first",
        description: "You need to create a trip before adding temples"
      })
      router.push('/plan-trip')
    }
  }

  async function handleToggleFavorite() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to favorite temples",
        variant: "destructive"
      })
      router.push('/auth/login')
      return
    }

    setFavoriteLoading(true)

    if (isFavorited) {
      // Remove from favorites
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('temple_id', templeId)
      
      setIsFavorited(false)
      toast({
        title: "Removed from favorites",
        description: `${temple?.name} has been removed from your favorites`
      })
    } else {
      // Add to favorites
      await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          temple_id: templeId
        })
      
      setIsFavorited(true)
      toast({
        title: "Added to favorites",
        description: `${temple?.name} has been added to your favorites`
      })
    }

    setFavoriteLoading(false)
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: temple?.name,
          text: `Check out ${temple?.name} on GoMandir`,
          url: window.location.href
        })
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied!",
        description: "Temple link has been copied to clipboard"
      })
    }
  }

  if (loading || !temple) {
    return (
      <div className="relative bg-gradient-to-b from-primary/10 to-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="h-96 animate-pulse bg-muted rounded-xl"></div>
        </div>
      </div>
    )
  }

  const gallery = [
    temple.image,
    '/beautiful-indian-temple-golden-hour.jpg',
    '/indian-temple-pattern-mandala.jpg'
  ].filter(Boolean)

  return (
    <div className="relative bg-gradient-to-b from-primary/10 to-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Ancient Heritage</Badge>
                <Badge variant="secondary">Sacred Site</Badge>
              </div>
              
              <h1 className="font-serif text-4xl font-bold lg:text-5xl">
                {temple.name}
              </h1>
              
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{temple.location}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="text-2xl font-bold">{temple.rating}</span>
                  <span className="text-muted-foreground">
                    ({temple.review_count?.toLocaleString() || 0} reviews)
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button size="lg" className="flex-1" onClick={handleAddToTrip}>
                Add to Trip
              </Button>
              <Button 
                size="lg" 
                variant={isFavorited ? "default" : "outline"}
                onClick={handleToggleFavorite}
                disabled={favoriteLoading}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
              <Button size="lg" variant="outline" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 aspect-[16/9] overflow-hidden rounded-xl">
              <img
                src={gallery[0] || `/placeholder.jpg`}
                alt={temple.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={gallery[1] || gallery[0] || `/placeholder.jpg`}
                alt={`${temple.name} view 2`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={gallery[2] || gallery[0] || `/placeholder.jpg`}
                alt={`${temple.name} view 3`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
