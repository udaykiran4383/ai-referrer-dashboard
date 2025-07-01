"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Zap, BarChart3, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [propertyId, setPropertyId] = useState("")

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Privacy-First",
      description: "All data processing happens in your browser. Nothing is sent to our servers.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Setup",
      description: "Just enter your GA4 Measurement ID and start tracking AI referrals immediately.",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Visual Analytics",
      description: "Beautiful charts showing AI traffic trends, top pages, and source breakdowns.",
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Export & Embed",
      description: "Download CSV reports or embed charts directly into your dashboards.",
    },
  ]

  const aiSources = [
    { name: "ChatGPT", domain: "chat.openai.com", color: "bg-green-500" },
    { name: "Perplexity", domain: "perplexity.ai", color: "bg-blue-500" },
    { name: "Google Bard", domain: "bard.google.com", color: "bg-yellow-500" },
    { name: "You.com", domain: "you.com", color: "bg-purple-500" },
    { name: "Claude", domain: "claude.ai", color: "bg-orange-500" },
    { name: "Copilot", domain: "copilot.microsoft.com", color: "bg-cyan-500" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold">AI Referrer Snapshot</h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm hover:text-blue-600 transition-colors">
              How it Works
            </Link>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Zero Backend • Privacy First • Open Source
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Track AI Tool Referrals in GA4
          </h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">i</span>
                </div>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Need your GA4 Property ID?</p>
                <p>Go to <strong>Google Analytics → Admin → Property Settings → Property ID</strong>. It's a numeric ID like <code className="bg-blue-100 px-1 rounded">123456789</code> (not the Measurement ID that starts with G-).</p>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Monitor traffic from ChatGPT, Perplexity, and other AI tools without complex GA4 configurations. Get instant
            insights with beautiful charts and export capabilities.
          </p>

          {/* Quick Start */}
          <Card className="max-w-md mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Quick Start</CardTitle>
              <CardDescription>
                <ul className="list-disc pl-5 space-y-2 text-left text-sm text-gray-700">
                  <li>
                    <strong>Step 1:</strong> Enter your <b>Google Analytics 4 (GA4) Property ID</b> below. You can find this in your Google Analytics account under <b>Admin → Property Settings → Property ID</b>. It is a numeric ID like <code>123456789</code> (not the Measurement ID that starts with G-).
                  </li>
                  <li>
                    <strong>Step 2:</strong> Click <b>Launch Dashboard</b>.
                  </li>
                  <li>
                    <strong>Step 3:</strong> On the next page, click <b>Connect with Google</b> and sign in with a Google account that has access to the GA4 property you entered.
                  </li>
                  <li>
                    <strong>Step 4:</strong> If you see an "Access denied" error, make sure you are signed in with a Google account that has at least <b>Viewer</b> or <b>Analyst</b> access to the property. If not, ask your GA4 admin to add you.
                  </li>
                  <li>
                    <strong>Note:</strong> For privacy and security, this platform can only show data for properties you have access to. Your credentials and data are never stored by us.
                  </li>
                  <li>
                    <strong>Important:</strong> We need the <b>Property ID</b> (numeric format like 123456789), not the <b>Measurement ID</b> (G-XXXXXXXXXX format). The Property ID can be found in GA4 under Admin → Property Settings → Property ID.
                  </li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="123456789"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className="text-center"
              />
              <Button asChild className="w-full" disabled={!propertyId.match(/^\d{6,12}$/)}>
                <Link href={`/dashboard?id=${propertyId}`}>
                  Launch Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {propertyId && !propertyId.match(/^\d{6,12}$/) && (
                <p className="text-xs text-red-500 text-center">
                  Property ID should be 6-12 digits (numeric format)
                </p>
              )}
            </CardContent>
          </Card>

          {/* AI Sources Preview */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {aiSources.map((source) => (
              <Badge key={source.name} variant="outline" className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${source.color}`} />
                {source.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose AI Referrer Snapshot?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built for privacy, speed, and simplicity. No complex setup, no data collection, just insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">Simple, secure, and straightforward</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Enter GA4 ID</h3>
              <p className="text-gray-600 text-sm">Simply paste your Google Analytics 4 Measurement ID</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Automatic Detection</h3>
              <p className="text-gray-600 text-sm">Our client-side code detects AI tool referrals in real-time</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">View Insights</h3>
              <p className="text-gray-600 text-sm">Get beautiful charts, export data, or embed widgets</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Track AI Referrals?</h2>
          <p className="text-blue-100 mb-8">
            Join companies already using AI Referrer Snapshot to understand their AI-driven traffic.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/dashboard">
              Start Tracking Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-300">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Eye className="h-6 w-6" />
            <span className="font-semibold">AI Referrer Snapshot</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">Privacy-first AI referral tracking for Google Analytics 4</p>
          <div className="flex justify-center space-x-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
