"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { TrendingUp, Users } from "lucide-react"

function EmbedContent() {
  const searchParams = useSearchParams()
  const propertyId = searchParams.get("id")
  const [data, setData] = useState({
    totalSessions: 0,
    topSource: { name: "", sessions: 0 },
    trend: 0,
  })

  useEffect(() => {
    if (propertyId) {
      // Simulate fetching data
      setTimeout(() => {
        setData({
          totalSessions: 1247,
          topSource: { name: "ChatGPT", sessions: 347 },
          trend: 12.5,
        })
      }, 1000)
    }
  }, [propertyId])

  if (!propertyId) {
    return (
      <div className="p-4 text-center bg-black min-h-screen flex items-center justify-center">
        <div className="text-red-400">Missing GA4 Property ID</div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 bg-black min-h-screen">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <img src="/asva-logo.png" alt="ASVA AI Logo" className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-white">ASVA AI Analytics</h2>
        </div>
        <p className="text-sm text-gray-300">AI Referral Summary - Last 30 days</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-center text-white">
              <Users className="w-4 h-4 mr-1" />
              Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{data.totalSessions.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-white">Top AI Source</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-white">{data.topSource.name}</div>
            <div className="text-sm text-gray-300">{data.topSource.sessions} sessions</div>
          </CardContent>
        </Card>

        <Card className="text-center bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center justify-center text-white">
              <TrendingUp className="w-4 h-4 mr-1" />
              Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-emerald-400">+{data.trend}%</div>
            <div className="text-sm text-gray-300">vs last month</div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-4 border-t border-gray-800">
        <Badge variant="outline" className="text-xs border-gray-700 text-gray-300">
          Powered by ASVA AI
        </Badge>
      </div>
    </div>
  )
}

export default function EmbedPage() {
  return (
    <Suspense fallback={
      <div className="p-4 text-center bg-black min-h-screen flex items-center justify-center">
        <div className="text-white">Loading ASVA AI Analytics...</div>
      </div>
    }>
      <EmbedContent />
    </Suspense>
  )
}
