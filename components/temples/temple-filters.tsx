'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const states = [
  'Andhra Pradesh', 'Tamil Nadu', 'Kerala', 'Karnataka', 'Maharashtra',
  'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Punjab', 'Jammu & Kashmir'
]

const deities = [
  'Lord Shiva', 'Lord Vishnu', 'Goddess Durga', 'Lord Ganesha',
  'Lord Hanuman', 'Goddess Lakshmi', 'Lord Krishna', 'Goddess Saraswati'
]

const categories = [
  'Ancient Heritage', 'UNESCO Sites', 'Popular Pilgrimage',
  'Cave Temples', 'Hilltop Temples', 'Architectural Marvel'
]

export function TempleFilters() {
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [selectedDeities, setSelectedDeities] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm">Clear All</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">State / Region</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {states.map((state) => (
              <div key={state} className="flex items-center gap-2">
                <Checkbox
                  id={`state-${state}`}
                  checked={selectedStates.includes(state)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedStates([...selectedStates, state])
                    } else {
                      setSelectedStates(selectedStates.filter(s => s !== state))
                    }
                  }}
                />
                <Label htmlFor={`state-${state}`} className="text-sm cursor-pointer">
                  {state}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-3">Deity</h3>
          <div className="space-y-2">
            {deities.map((deity) => (
              <div key={deity} className="flex items-center gap-2">
                <Checkbox
                  id={`deity-${deity}`}
                  checked={selectedDeities.includes(deity)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedDeities([...selectedDeities, deity])
                    } else {
                      setSelectedDeities(selectedDeities.filter(d => d !== deity))
                    }
                  }}
                />
                <Label htmlFor={`deity-${deity}`} className="text-sm cursor-pointer">
                  {deity}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategories.includes(category) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => {
                  if (selectedCategories.includes(category)) {
                    setSelectedCategories(selectedCategories.filter(c => c !== category))
                  } else {
                    setSelectedCategories([...selectedCategories, category])
                  }
                }}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="font-semibold mb-3">Rating</h3>
          <Slider defaultValue={[4]} max={5} step={0.5} className="mb-2" />
          <p className="text-sm text-muted-foreground">4.0+ stars</p>
        </div>

        <Button className="w-full">Apply Filters</Button>
      </CardContent>
    </Card>
  )
}
