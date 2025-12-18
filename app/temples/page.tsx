import { TempleGrid } from '@/components/temples/temple-grid'
import { TempleFilters } from '@/components/temples/temple-filters'
import { TempleSearch } from '@/components/temples/temple-search'

export const metadata = {
  title: 'Browse Temples - GoMandir',
  description: 'Discover and explore temples across India with detailed information, timings, and visitor reviews.',
}

export default function TemplesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-serif text-4xl font-bold mb-4">Explore Sacred Temples</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover divine destinations across India with complete information and visitor insights
          </p>
          <TempleSearch />
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0">
            <TempleFilters />
          </aside>
          <main className="flex-1">
            <TempleGrid />
          </main>
        </div>
      </div>
    </div>
  )
}
