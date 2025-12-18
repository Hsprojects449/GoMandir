import { Hero } from '@/components/hero'
import { TripPlanner } from '@/components/trip-planner'
import { Features } from '@/components/features'
import { PopularTemples } from '@/components/popular-temples'
import { HowItWorks } from '@/components/how-it-works'
import { Testimonials } from '@/components/testimonials'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TripPlanner />
      <Features />
      <PopularTemples />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  )
}
