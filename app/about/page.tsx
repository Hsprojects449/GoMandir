import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Users, Target, Award } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">About GoMandir</h1>
          <p className="text-xl text-muted-foreground">Making spiritual journeys accessible to everyone</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="space-y-6">
          <h2 className="font-serif text-3xl font-bold">Our Story</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            GoMandir was born from a simple belief: that every spiritual journey should be as seamless as it is meaningful. 
            We understand that planning a pilgrimage involves more than just booking tickets—it's about creating an experience 
            that honors your faith while taking care of every practical detail.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Founded by travelers and devotees who experienced the challenges of pilgrimage planning firsthand, 
            GoMandir brings together technology and tradition to serve millions of pilgrims across India.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6 space-y-3">
                <Heart className="h-12 w-12 text-primary" />
                <h3 className="font-semibold text-xl">Devotion First</h3>
                <p className="text-muted-foreground">
                  We respect and honor the spiritual significance of every journey, ensuring that faith remains at the center of everything we do.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <Users className="h-12 w-12 text-primary" />
                <h3 className="font-semibold text-xl">Community Driven</h3>
                <p className="text-muted-foreground">
                  Built by pilgrims, for pilgrims. We listen to our community and continuously improve based on your feedback and experiences.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <Target className="h-12 w-12 text-primary" />
                <h3 className="font-semibold text-xl">Transparency</h3>
                <p className="text-muted-foreground">
                  No hidden fees, no surprises. We believe in clear, honest communication at every step of your journey.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 space-y-3">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="font-semibold text-xl">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in service, ensuring every detail of your pilgrimage is handled with care and expertise.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-primary/5 rounded-lg p-8 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Start planning your next spiritual adventure with GoMandir today.
          </p>
          <Button size="lg" asChild>
            <Link href="/plan-trip">Plan Your Trip</Link>
          </Button>
        </section>
      </div>
    </div>
  )
}
