import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { ArrowLeft, Code, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Documentation</h1>
          <p className="text-gray-600">
            Learn how to set up and use AI Referrer Snapshot to track AI tool referrals in your Google Analytics 4.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">1. Get your GA4 Measurement ID</h4>
                <p className="text-sm text-gray-600">
                  Find your GA4 Measurement ID in Google Analytics under Admin → Data Streams → Web Stream Details. It
                  looks like "G-XXXXXXXXXX".
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">2. Enter your ID</h4>
                <p className="text-sm text-gray-600">
                  Paste your Measurement ID into the dashboard input field and click "Start Tracking".
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">3. View your data</h4>
                <p className="text-sm text-gray-600">
                  The dashboard will automatically detect AI referrals and display charts, tables, and export options.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Supported AI Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "ChatGPT (chat.openai.com)",
                  "Perplexity (perplexity.ai)",
                  "Google Bard (bard.google.com)",
                  "You.com (you.com)",
                  "Claude (claude.ai)",
                  "Microsoft Copilot (copilot.microsoft.com)",
                ].map((tool, index) => (
                  <Badge key={index} variant="outline" className="justify-start">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Zero Backend Architecture</h4>
                <p className="text-sm text-gray-600">
                  All processing happens in your browser. No data is sent to our servers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Direct GA4 Connection</h4>
                <p className="text-sm text-gray-600">
                  Your browser connects directly to Google Analytics using their official JavaScript library.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Open Source</h4>
                <p className="text-sm text-gray-600">Our code is open source and available for review on GitHub.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Embedding & Exporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Widget Embed</h4>
                <p className="text-sm text-gray-600">
                  Generate an iframe code to embed your AI referral summary on any website or dashboard.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Tracking Script</h4>
                <p className="text-sm text-gray-600">
                  Add our lightweight JavaScript snippet to automatically track AI referrals on your website.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Data Export</h4>
                <p className="text-sm text-gray-600">
                  Export your AI referral data as CSV or JSON for further analysis or reporting.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
