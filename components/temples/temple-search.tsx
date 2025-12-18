'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export function TempleSearch() {
  const [query, setQuery] = useState('')

  return (
    <div className="flex gap-2">
      <div className="relative flex-1 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by temple name, deity, or city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 pl-12 pr-4 text-lg bg-card"
        />
      </div>
      <Button size="lg" className="h-14 px-8">
        Search
      </Button>
    </div>
  )
}
