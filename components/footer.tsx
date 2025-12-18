import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-4">GoMandir</h3>
            <p className="text-secondary-foreground/80 mb-6 leading-relaxed max-w-md">
              Your trusted companion for spiritual journeys across India. Making temple visits and pilgrimages accessible, organized, and meaningful.
            </p>
            <div className="flex gap-3">
              <Button size="icon" variant="outline" className="bg-secondary-foreground/10 hover:bg-secondary-foreground/20 border-secondary-foreground/20">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-secondary-foreground/10 hover:bg-secondary-foreground/20 border-secondary-foreground/20">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-secondary-foreground/10 hover:bg-secondary-foreground/20 border-secondary-foreground/20">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-secondary-foreground/10 hover:bg-secondary-foreground/20 border-secondary-foreground/20">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-secondary-foreground/80">
              <li><Link href="/temples" className="hover:text-secondary-foreground transition-colors">Browse Temples</Link></li>
              <li><Link href="/plan-trip" className="hover:text-secondary-foreground transition-colors">Plan Trip</Link></li>
              <li><Link href="/how-it-works" className="hover:text-secondary-foreground transition-colors">How It Works</Link></li>
              <li><Link href="/about" className="hover:text-secondary-foreground transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-secondary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-secondary-foreground/80">
              <li><Link href="/support" className="hover:text-secondary-foreground transition-colors">Help Center</Link></li>
              <li><Link href="/booking-policy" className="hover:text-secondary-foreground transition-colors">Booking Policy</Link></li>
              <li><Link href="/privacy" className="hover:text-secondary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-secondary-foreground transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-secondary-foreground/60">
              © 2025 GoMandir. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Input
                type="email"
                placeholder="Subscribe to newsletter"
                className="h-10 bg-secondary-foreground/10 border-secondary-foreground/20"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
