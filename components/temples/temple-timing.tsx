import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Calendar } from 'lucide-react'

export function TempleTiming({ templeId }: { templeId: string }) {
  const timings = [
    { name: 'Suprabhatam', time: '2:30 AM - 3:30 AM' },
    { name: 'Thomala Seva', time: '3:30 AM - 4:30 AM' },
    { name: 'Sahasranamarchana', time: '4:30 AM - 5:30 AM' },
    { name: 'General Darshan', time: '6:00 AM - 9:00 PM' },
    { name: 'Ekanta Seva', time: '9:30 PM - 10:00 PM' },
  ]

  const festivals = [
    { name: 'Brahmotsavam', month: 'September/October' },
    { name: 'Vaikunta Ekadasi', month: 'December/January' },
    { name: 'Rathasapthami', month: 'February' },
    { name: 'Sri Rama Navami', month: 'March/April' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif text-2xl flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          Timings & Rituals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-4">Daily Rituals</h3>
          <div className="space-y-3">
            {timings.map((timing) => (
              <div key={timing.name} className="flex items-center justify-between py-3 border-b last:border-0">
                <span className="font-medium">{timing.name}</span>
                <span className="text-muted-foreground">{timing.time}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Major Festivals
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {festivals.map((festival) => (
              <div key={festival.name} className="rounded-lg border p-4">
                <div className="font-medium mb-1">{festival.name}</div>
                <div className="text-sm text-muted-foreground">{festival.month}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Timings may vary during festivals and special occasions. Please check before planning your visit.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
