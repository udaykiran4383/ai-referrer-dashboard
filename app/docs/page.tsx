import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { ArrowLeft, Code, Zap, Shield, Brain } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-800 bg-black">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <img src="/asva-logo.png" alt="ASVA AI Logo" className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">ASVA AI Documentation</h1>
              <p className="text-gray-400">Enterprise AI Analytics Platform</p>
            </div>
          </div>
          <p className="text-gray-300">
            Learn how to set up and use ASVA AI's advanced analytics platform to track AI tool referrals in your Google Analytics 4.
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Zap className="w-5 h-5 mr-2" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">1. Get your GA4 Property ID</h4>
                <p className="text-sm text-gray-300">
                  Find your GA4 Property ID in Google Analytics under Admin → Property Settings → Property ID. It
                  looks like "123456789" (numeric format, not G-XXXXXXXXXX).
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white">2. Enter your ID</h4>
                <p className="text-sm text-gray-300">
                  Paste your Property ID into the dashboard input field and click "Launch Dashboard".
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white">3. View your data</h4>
                <p className="text-sm text-gray-300">
                  ASVA AI will automatically detect AI referrals and display advanced analytics with predictive insights.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
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
                  <Badge key={index} variant="outline" className="justify-start border-gray-700 text-gray-300">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Shield className="w-5 h-5 mr-2" />
                Enterprise Security & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">SOC 2 Compliant</h4>
                <p className="text-sm text-gray-300">
                  ASVA AI meets enterprise security standards with end-to-end encryption and secure data handling.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white">Direct GA4 Connection</h4>
                <p className="text-sm text-gray-300">
                  Your browser connects directly to Google Analytics using their official JavaScript library.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white">Advanced Analytics</h4>
                <p className="text-sm text-gray-300">
                  Machine learning algorithms provide deeper insights and predictive analytics for AI referral patterns.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Embedding & Exporting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-white">Widget Embed</h4>
                <p className="text-sm text-gray-300">
                  Generate an iframe code to embed your AI referral summary on any website or dashboard.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white">Tracking Script</h4>
                <p className="text-sm text-gray-300">
                  Add our lightweight JavaScript snippet to automatically track AI referrals on your website.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white">Data Export</h4>
                <p className="text-sm text-gray-300">
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
