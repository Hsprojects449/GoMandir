import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/indian-temple-pattern-mandala.jpg')] opacity-5" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Your Sacred Journey Begins Here</span>
            </div>
            
            <h1 className="font-serif text-5xl font-bold leading-tight tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Discover Divine Destinations
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              Plan your perfect pilgrimage with GoMandir. From ancient temples to modern travel—we handle everything so you can focus on your spiritual journey.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="text-base" asChild>
                <Link href="/plan-trip">
                  Start Planning <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="/temples">
                  Explore Temples
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Temples Listed</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Happy Pilgrims</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Cities Covered</div>
              </div>
            </div>
          </div>
          
          {/* Right image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-4 border-primary/20 shadow-2xl">
              <img
                src="/beautiful-indian-temple-golden-hour.jpg"
                alt="Beautiful Indian Temple"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
