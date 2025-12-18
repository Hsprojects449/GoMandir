import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { IndianRupee, TrendingUp } from 'lucide-react'

const expenses = [
  { category: 'Transportation', amount: 12450, percentage: 35 },
  { category: 'Accommodation', amount: 14000, percentage: 40 },
  { category: 'Food & Meals', amount: 5600, percentage: 16 },
  { category: 'Temple Donations', amount: 2000, percentage: 6 },
  { category: 'Miscellaneous', amount: 1000, percentage: 3 },
]

const total = expenses.reduce((sum, exp) => sum + exp.amount, 0)

export function ExpenseSummary({ tripId }: { tripId: string }) {
  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="font-serif text-xl flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Expense Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div key={expense.category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{expense.category}</span>
                <span className="font-semibold flex items-center">
                  <IndianRupee className="h-3 w-3" />
                  {expense.amount.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${expense.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Subtotal</span>
            <span className="font-medium flex items-center">
              <IndianRupee className="h-4 w-4" />
              {total.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Per Person</span>
            <span className="font-medium flex items-center">
              <IndianRupee className="h-4 w-4" />
              {Math.round(total / 4).toLocaleString()}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-lg font-bold">
          <span>Total Budget</span>
          <span className="text-primary flex items-center">
            <IndianRupee className="h-5 w-5" />
            {total.toLocaleString()}
          </span>
        </div>

        <Badge variant="secondary" className="w-full justify-center py-2">
          Within Budget
        </Badge>
      </CardContent>
    </Card>
  )
}
