import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ASVA AI - AI Referrer Analytics Dashboard",
  description:
    "ASVA AI's advanced analytics dashboard to track traffic from ChatGPT, Perplexity, and other AI tools in Google Analytics 4. Enterprise-grade insights with privacy-first approach.",
  keywords: "ASVA AI, AI referrals, ChatGPT traffic, Google Analytics 4, Perplexity analytics, AI tool tracking, enterprise analytics",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
