"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartData {
  date: string
  chatgpt: number
  perplexity: number
  bard: number
  other: number
}

interface AIReferrerChartProps {
  data: ChartData[]
}

export function AIReferrerChart({ data }: AIReferrerChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Referral Trends</CardTitle>
        <CardDescription>Daily sessions from AI tools over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                }
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) =>
                  new Date(value).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <Legend />
              <Line type="monotone" dataKey="chatgpt" stroke="#10B981" strokeWidth={2} name="ChatGPT" />
              <Line type="monotone" dataKey="perplexity" stroke="#3B82F6" strokeWidth={2} name="Perplexity" />
              <Line type="monotone" dataKey="bard" stroke="#F59E0B" strokeWidth={2} name="Google Bard" />
              <Line type="monotone" dataKey="other" stroke="#8B5CF6" strokeWidth={2} name="Other AI Tools" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
