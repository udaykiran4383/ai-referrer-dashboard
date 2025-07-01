"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, BarChart } from "lucide-react"

interface ExportDataProps {
  data: any
}

export function ExportData({ data }: ExportDataProps) {
  const exportToCSV = () => {
    const csvData = [
      ["Date", "ChatGPT", "Perplexity", "Google Bard", "Other AI Tools"],
      ...data.dailyData.map((row: any) => [row.date, row.chatgpt, row.perplexity, row.bard, row.other]),
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-referrals-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-referrals-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Export Data</CardTitle>
        <CardDescription>Download your AI referral data in various formats</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={exportToCSV} className="w-full justify-start">
          <FileText className="w-4 h-4 mr-2" />
          Export as CSV
        </Button>

        <Button onClick={exportToJSON} variant="outline" className="w-full justify-start bg-transparent">
          <Download className="w-4 h-4 mr-2" />
          Export as JSON
        </Button>

        <Button variant="outline" className="w-full justify-start bg-transparent" disabled>
          <BarChart className="w-4 h-4 mr-2" />
          Export Chart (Coming Soon)
        </Button>
      </CardContent>
    </Card>
  )
}
