import { Card, CardContent } from '@/components/ui/card'
import { Bus, Building2, MapIcon, Wallet, Route, Shield } from 'lucide-react'

const features = [
  {
    icon: MapIcon,
    title: 'Smart Itinerary Planning',
    description: 'AI-powered recommendations for temples and routes based on your time and preferences',
  },
  {
    icon: Bus,
    title: 'Complete Transportation',
    description: 'Book trains, buses, flights, and cars—all in one place with best prices',
  },
  {
    icon: Building2,
    title: 'Accommodation Booking',
    description: 'Hotels, guesthouses, and temple accommodations at your fingertips',
  },
  {
    icon: Route,
    title: 'Optimized Routes',
    description: 'Visit multiple temples efficiently with smart route planning and timing',
  },
  {
    icon: Wallet,
    title: 'Secure Payments',
    description: 'Safe and easy payments with support for temple donations',
  },
  {
    icon: Shield,
    title: 'Travel Insurance',
    description: 'Optional travel protection for peace of mind during your journey',
  },
]

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold mb-4">Everything You Need for Your Pilgrimage</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From planning to completion, we handle all the logistics so you can focus on your spiritual journey
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
