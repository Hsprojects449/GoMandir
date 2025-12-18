import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, Maharashtra',
    avatar: '/indian-woman-portrait.png',
    rating: 5,
    text: 'GoMandir made our family pilgrimage to Tirupati seamless. Everything from train tickets to temple timings was perfectly organized. Highly recommended!',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi, NCR',
    avatar: '/indian-man-portrait.png',
    rating: 5,
    text: 'The AI recommendations helped us discover temples we never knew existed. The itinerary was perfect and we could visit 8 temples in just 3 days!',
  },
  {
    name: 'Anita Patel',
    location: 'Ahmedabad, Gujarat',
    avatar: '/indian-senior-woman.jpg',
    rating: 5,
    text: 'As a senior citizen, I was worried about the logistics. GoMandir handled everything beautifully. The temple accommodation booking was especially helpful.',
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold mb-4">Stories from Pilgrims</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear what fellow travelers say about their sacred journeys with GoMandir
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-primary/10">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
