import { Card, CardContent } from '@/components/ui/card'
import { Search, Calendar, Bus, MapIcon } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Search & Discover',
    description: 'Enter your destination or temple name and discover nearby sacred places to visit',
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Plan Your Journey',
    description: 'Get AI-powered itinerary suggestions based on your time, budget, and preferences',
  },
  {
    number: '03',
    icon: Bus,
    title: 'Book Everything',
    description: 'Book trains, buses, flights, hotels, and accommodations—all in one place',
  },
  {
    number: '04',
    icon: MapIcon,
    title: 'Experience & Share',
    description: 'Follow your itinerary, visit temples, and share your spiritual journey with others',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold mb-4">How GoMandir Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to your perfect pilgrimage experience
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="h-full border-primary/10">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="font-serif text-5xl font-bold text-primary/20">{step.number}</span>
                  </div>
                  <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-3">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
