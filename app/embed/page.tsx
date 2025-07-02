"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { TrendingUp, Users } from "lucide-react"

function EmbedContent() {
  const searchParams = useSearchParams()
  const measurementId = searchParams.get("id")
  const [data, setData] = useState({
    totalSessions: 0,
    topSource: { name: "", sessions: 0 },
    trend: 0,
  })

  useEffect(() => {
    if (measurementId) {
      // Simulate fetching data
      setTimeout(() => {
        setData({
          totalSessions: 1247,
          topSource: { name: "ChatGPT", sessions: 347 },
          trend: 12.5,
        })
      }, 1000)
    }
  }, [measurementId])

  if (!measurementId) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">Missing GA4 Measurement ID</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 bg-white min-h-screen">
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold">AI Referral Summary</h2>
        <p className="text-sm text-gray-500">Last 30 days</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-center">
              <Users className="w-4 h-4 mr-1" />
              Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalSessions.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Top AI Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{data.topSource.name}</div>
            <div className="text-sm text-gray-500">{data.topSource.sessions} sessions</div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-green-600">+{data.trend}%</div>
            <div className="text-sm text-gray-500">vs last month</div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-4 border-t">
        <Badge variant="outline" className="text-xs">
          Powered by AI Referrer Snapshot
        </Badge>
      </div>
    </div>
  )
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
      <EmbedContent />
    </Suspense>
  )
}
