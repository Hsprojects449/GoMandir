import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function TempleInfo({ templeId }: { templeId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl">About This Temple</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-3">Overview</h3>
          <p className="text-muted-foreground leading-relaxed">
            Tirupati Balaji Temple, also known as the Venkateswara Temple, is a landmark Vaishnavite temple situated in the hill town of Tirumala at Tirupati. Dedicated to Lord Venkateswara, an incarnation of Vishnu, the temple is one of the most visited pilgrimage centers in the world, attracting millions of devotees every year.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-3">Temple Significance</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The temple is believed to be one of the eight Vishnu Swayambhu Kshetras where the deity is believed to have manifested by itself. The temple follows the Vaikhanasa Agama tradition and is known for its magnificent architecture, ancient rituals, and the divine atmosphere that attracts devotees from around the world.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge>Vaishnavite Temple</Badge>
            <Badge>Ancient Heritage</Badge>
            <Badge>Dravidian Architecture</Badge>
            <Badge>Swayambhu Kshetra</Badge>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-3">Key Features</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Seven hills sacred location with breathtaking views</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Spectacular gold-plated dome visible from miles away</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Ancient inscriptions dating back to the 9th century</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>Daily rituals and special pujas performed with Vedic traditions</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
