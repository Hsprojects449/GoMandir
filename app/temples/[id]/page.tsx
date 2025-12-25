import { TempleHero } from '@/components/temples/temple-hero'
import { TempleInfo } from '@/components/temples/temple-info'
import { TempleTiming } from '@/components/temples/temple-timing'
import { TempleHistory } from '@/components/temples/temple-history'
import { TempleReviews } from '@/components/temples/temple-reviews'
import { NearbyAttractions } from '@/components/temples/nearby-attractions'
import { VisitPlanner } from '@/components/temples/visit-planner'

export const metadata = {
  title: 'Temple Details - GoMandir',
  description: 'View detailed information about temples including history, timings, and visitor reviews.',
}

export default async function TempleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="min-h-screen">
      <TempleHero templeId={id} />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <TempleInfo templeId={id} />
            <TempleTiming templeId={id} />
            <TempleHistory templeId={id} />
            <TempleReviews templeId={id} />
            <NearbyAttractions templeId={id} />
          </div>
          
          <aside className="lg:col-span-1">
            <div className="sticky top-4">
              <VisitPlanner templeId={id} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
