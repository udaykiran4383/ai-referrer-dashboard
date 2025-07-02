"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"

interface PageData {
  page: string
  sessions: number
  bounceRate: number
}

interface TopPagesTableProps {
  data: PageData[]
}

export function TopPagesTable({ data }: TopPagesTableProps) {
  const getBounceRateColor = (rate: number) => {
    if (rate < 0.3) return "bg-green-100 text-green-800"
    if (rate < 0.5) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Landing Pages</CardTitle>
        <CardDescription>Pages with the most AI referral traffic</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead className="text-right">Sessions</TableHead>
              <TableHead className="text-right">Bounce Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((page, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{page.page}</TableCell>
                <TableCell className="text-right">{page.sessions}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="secondary" className={getBounceRateColor(page.bounceRate)}>
                    {(page.bounceRate * 100).toFixed(0)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
