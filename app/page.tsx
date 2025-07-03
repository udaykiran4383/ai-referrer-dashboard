"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { ArrowRight, Shield, Zap, BarChart3, Download, Eye, Brain, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [propertyId, setPropertyId] = useState("")

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms provide deeper insights into AI referral patterns.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption. Your data never leaves your control.",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Real-time Insights",
      description: "Monitor AI traffic trends in real-time with predictive analytics and trend forecasting.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Actionable Intelligence",
      description: "Get actionable recommendations to optimize your AI referral strategy.",
    },
  ]

  const aiSources = [
    { name: "ChatGPT", domain: "chat.openai.com", color: "bg-emerald-500" },
    { name: "Perplexity", domain: "perplexity.ai", color: "bg-blue-500" },
    { name: "Google Bard", domain: "bard.google.com", color: "bg-amber-500" },
    { name: "You.com", domain: "you.com", color: "bg-purple-500" },
    { name: "Claude", domain: "claude.ai", color: "bg-orange-500" },
    { name: "Copilot", domain: "copilot.microsoft.com", color: "bg-cyan-500" },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <img src="/asva_ai_logo.png" alt="ASVA AI Logo" className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ASVA AI</h1>
              <p className="text-xs text-gray-400">Analytics Platform</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm text-gray-300 hover:text-white transition-colors">
              How it Works
            </Link>
            <Button asChild className="bg-white text-black hover:bg-gray-100">
              <Link href="/dashboard">Launch Dashboard</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4 bg-gray-800 text-white border-gray-700">
            Powered by ASVA AI • Enterprise Grade • Privacy First
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-white">
            AI Referrer Analytics
          </h1>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8 max-w-3xl mx-auto">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black text-sm font-bold">i</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">Need your GA4 Property ID?</h3>
                  <Button asChild size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
                      Open Google Analytics
                    </a>
                  </Button>
                </div>
                <div className="text-sm text-gray-300 space-y-3">
                  <p><strong>Step-by-step guide:</strong></p>
                  <ol className="list-decimal list-inside space-y-1 ml-2">
                    <li>Go to <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Analytics</a></li>
                    <li>Click the gear icon (⚙️) in the bottom-left corner</li>
                    <li>Under "Property", click "Property settings"</li>
                    <li>Copy the <strong>Property ID</strong> (numeric format like <code className="bg-gray-800 px-1 rounded">123456789</code>)</li>
                  </ol>
                  <div className="bg-gray-800 rounded p-3 mt-3">
                    <p className="text-xs text-gray-400 mb-2">📋 <strong>Important:</strong></p>
                    <ul className="text-xs space-y-1">
                      <li>✅ Use <strong>Property ID</strong> (numeric: <code className="bg-gray-700 px-1 rounded">123456789</code>)</li>
                      <li>❌ Do NOT use <strong>Measurement ID</strong> (format: <code className="bg-gray-700 px-1 rounded">G-XXXXXXXXXX</code>)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            ASVA AI's advanced analytics platform monitors traffic from ChatGPT, Perplexity, and other AI tools. 
            Get enterprise-grade insights with predictive analytics and actionable intelligence.
          </p>

          {/* Quick Start */}
          <Card className="max-w-md mx-auto mb-8 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Quick Start</CardTitle>
              <CardDescription className="text-gray-300">
                <ul className="list-disc pl-5 space-y-2 text-left text-sm">
                  <li>
                    <strong>Step 1:</strong> Get your <b>GA4 Property ID</b> from <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Analytics</a>.
                  </li>
                  <li>
                    <strong>Step 2:</strong> Enter your Property ID below.
                  </li>
                  <li>
                    <strong>Step 3:</strong> Click <b>Launch Dashboard</b>.
                  </li>
                  <li>
                    <strong>Step 4:</strong> Connect with Google and access analytics.
                  </li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="123456789"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className="text-center bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button asChild className="w-full bg-white text-black hover:bg-gray-100" disabled={!propertyId.match(/^\d{6,12}$/)}>
                <Link href={`/dashboard?id=${propertyId}`}>
                  Launch Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {propertyId && !propertyId.match(/^\d{6,12}$/) && (
                <p className="text-xs text-red-400 text-center">
                  Property ID should be 6-12 digits (numeric format)
                </p>
              )}
            </CardContent>
          </Card>

          {/* Visual Guide */}
          <Card className="max-w-4xl mx-auto mb-8 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">📍 Where to Find Your Property ID</CardTitle>
              <CardDescription className="text-gray-300">
                Visual guide to locate your GA4 Property ID in Google Analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800 rounded-lg p-4 font-mono text-xs text-gray-300">
                <div className="mb-4">
                  <div className="text-blue-400 mb-2">Google Analytics Interface:</div>
                  <div className="bg-gray-900 p-3 rounded border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white">Google Analytics</span>
                      <span className="text-gray-500">[Property Dropdown] ▼</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-800 p-2 rounded">
                        <div className="text-cyan-400 mb-1">⚙️ Admin</div>
                        <div className="text-gray-400 ml-2">
                          <div>📊 Property</div>
                          <div className="text-yellow-400 ml-2">→ Property settings ← Click here</div>
                          <div className="text-gray-500 ml-2">→ Data streams</div>
                        </div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded">
                        <div className="text-cyan-400 mb-1">Property Settings</div>
                        <div className="text-gray-400">
                          <div className="text-green-400">Property ID: 123456789 ← Copy this</div>
                          <div>Property Name: My Website</div>
                          <div>Industry Category: Technology</div>
                        </div>
                      </div>
                      <div className="bg-gray-800 p-2 rounded">
                        <div className="text-cyan-400 mb-1">Important Notes</div>
                        <div className="text-gray-400 text-xs">
                          <div className="text-green-400">✅ Property ID: 123456789</div>
                          <div className="text-red-400">❌ Measurement ID: G-XXXXXXXXXX</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
                      🔗 Open Google Analytics Now
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Sources Preview */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {aiSources.map((source) => (
              <Badge key={source.name} variant="outline" className="flex items-center gap-2 border-gray-700 text-gray-300">
                <div className={`w-2 h-2 rounded-full ${source.color}`} />
                {source.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">Why Choose ASVA AI Analytics?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Enterprise-grade AI analytics platform built for modern businesses. 
              Advanced insights with unmatched security and performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-white rounded-lg flex items-center justify-center text-black mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-white">How ASVA AI Works</h2>
            <p className="text-gray-300">Advanced analytics made simple</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Connect GA4</h3>
              <p className="text-gray-300 text-sm">Securely connect your Google Analytics 4 property</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">AI Analysis</h3>
              <p className="text-gray-300 text-sm">Our AI processes your data for intelligent insights</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Get Insights</h3>
              <p className="text-gray-300 text-sm">Access actionable intelligence and predictions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800 bg-black">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <img src="/asva_ai_logo.png" alt="ASVA AI Logo" className="h-6 w-6" />
            </div>
            <span className="text-white font-semibold">ASVA AI</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 ASVA AI. Enterprise-grade AI analytics platform.
          </p>
        </div>
      </footer>
    </div>
  )
}
