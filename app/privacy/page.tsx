import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h3>Data Collection</h3>
            <p>
              AI Referrer Snapshot is designed with privacy as a core principle. We do not collect, store, or transmit
              any of your Google Analytics data to our servers.
            </p>

            <h3>How It Works</h3>
            <ul>
              <li>All data processing happens entirely in your browser</li>
              <li>Your GA4 Measurement ID is only used locally to initialize tracking</li>
              <li>No analytics data leaves your device</li>
              <li>We don't use cookies or tracking pixels</li>
            </ul>

            <h3>Third-Party Services</h3>
            <p>
              This application connects directly to Google Analytics 4 using their official JavaScript library
              (gtag.js). Your data is subject to Google's privacy policy when using their services.
            </p>

            <h3>Open Source</h3>
            <p>
              Our code is open source and available for review. You can verify that no data is being sent to external
              servers beyond Google Analytics.
            </p>

            <h3>Contact</h3>
            <p>If you have any questions about this privacy policy, please contact us through our website.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
