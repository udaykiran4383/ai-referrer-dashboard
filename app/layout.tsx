import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Referrer Snapshot - Track ChatGPT & AI Tool Traffic in GA4",
  description:
    "Privacy-first dashboard to track traffic from ChatGPT, Perplexity, and other AI tools in Google Analytics 4. Zero backend, instant setup.",
  keywords: "AI referrals, ChatGPT traffic, Google Analytics 4, Perplexity analytics, AI tool tracking",
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
