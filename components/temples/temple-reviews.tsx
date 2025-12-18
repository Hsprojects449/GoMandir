'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Star, ThumbsUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export function TempleReviews({ templeId }: { templeId: string }) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const supabase = createClient()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    loadReviews()
  }, [templeId])

  async function loadReviews() {
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select('*')
      .eq('temple_id', templeId)
      .order('created_at', { ascending: false })
      .limit(10)

    if (reviewsError || !reviewsData) {
      setLoading(false)
      return
    }

    // Fetch profiles for all reviewers
    const userIds = reviewsData.map(r => r.user_id)
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, full_name, profile_image')
      .in('id', userIds)

    // Combine reviews with profiles
    const reviewsWithProfiles = reviewsData.map(review => {
      const profile = profilesData?.find(p => p.id === review.user_id)
      return {
        ...review,
        profiles: profile
      }
    })

    setReviews(reviewsWithProfiles)
    setLoading(false)
  }

  async function handleSubmitReview() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      const currentPath = `/temples/${templeId}`
      router.push(`/auth/login?redirectTo=${currentPath}`)
      return
    }

    if (rating === 0) {
      toast({
        title: 'Rating required',
        description: 'Please select a rating before submitting',
        variant: 'destructive'
      })
      return
    }

    if (!reviewText.trim()) {
      toast({
        title: 'Review text required',
        description: 'Please write your review',
        variant: 'destructive'
      })
      return
    }

    setSubmitting(true)

    const { error } = await supabase
      .from('reviews')
      .insert({
        temple_id: templeId,
        user_id: user.id,
        rating,
        comment: reviewText,
        helpful_count: 0
      })

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Success',
        description: 'Your review has been submitted!',
      })
      setRating(0)
      setReviewText('')
      setShowReviewForm(false)
      loadReviews()
    }

    setSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-serif text-2xl">Visitor Reviews</CardTitle>
          <Button onClick={() => setShowReviewForm(!showReviewForm)}>
            Write Review
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {showReviewForm && (
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      star <= rating 
                        ? 'fill-primary text-primary' 
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Your Experience</label>
              <Textarea
                placeholder="Share your experience with fellow pilgrims..."
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmitReview} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="space-y-3 pb-6 border-b last:border-0">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.profiles?.profile_image || "/placeholder.svg?height=40&width=40&query=user profile avatar"} />
                    <AvatarFallback>
                      {review.profiles?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold">{review.profiles?.full_name || 'Anonymous'}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex gap-1 mb-2">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
