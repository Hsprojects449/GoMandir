import { Card, CardContent } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="h-10 w-64 bg-muted/50 rounded animate-pulse mx-auto" />
          <div className="h-6 w-96 bg-muted/30 rounded animate-pulse mx-auto" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-muted/50 animate-pulse mx-auto" />
                <div className="space-y-2">
                  <div className="h-6 w-24 bg-muted/50 rounded animate-pulse mx-auto" />
                  <div className="h-4 w-full bg-muted/30 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted/30 rounded animate-pulse mx-auto" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="space-y-8">
          <div className="h-8 w-96 bg-muted/50 rounded animate-pulse mx-auto" />
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-3">
                  <div className="h-6 w-48 bg-muted/50 rounded animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-muted/30 rounded animate-pulse" />
                    <div className="h-4 w-full bg-muted/30 rounded animate-pulse" />
                    <div className="h-4 w-3/4 bg-muted/30 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
