import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

export function TempleHistory({ templeId }: { templeId: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          History & Legend
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-3">Ancient Origins</h3>
          <p className="text-muted-foreground leading-relaxed">
            The history of Tirupati temple dates back to ancient times, with references found in Tamil literature dating to 500 BCE. The temple complex has been patronized by various dynasties including the Pallavas, Cholas, and Vijayanagara Empire, each contributing to its architectural splendor and religious significance.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-3">The Divine Legend</h3>
          <p className="text-muted-foreground leading-relaxed">
            According to legend, Lord Vishnu appeared as Srinivasa to save humanity from the trials and troubles of Kali Yuga. The deity took a loan from Kubera, the treasurer of heaven, to finance his wedding with Goddess Padmavati. It is believed that devotees who visit the temple and offer donations are helping the Lord repay this celestial debt.
          </p>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-3">Architectural Marvel</h3>
          <p className="text-muted-foreground leading-relaxed">
            The temple showcases magnificent Dravidian architecture with intricate carvings, towering gopurams, and gold-plated domes. The main sanctum, built in the 9th century, houses the deity in a standing posture, which is a unique feature. The temple's construction spans several centuries, with contributions from various rulers enhancing its grandeur.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
