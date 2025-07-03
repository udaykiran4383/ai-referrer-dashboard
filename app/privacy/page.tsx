import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ArrowLeft, Brain } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
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
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <img src="/asva-logo.png" alt="ASVA AI Logo" className="h-10 w-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">ASVA AI Privacy Policy</h1>
            <p className="text-gray-400">Enterprise-grade data protection</p>
          </div>
        </div>
        
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Privacy & Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none">
            <h3 className="text-white">Data Collection</h3>
            <p className="text-gray-300">
              ASVA AI is designed with enterprise-grade privacy and security. We do not collect, store, or transmit
              any of your Google Analytics data to our servers. All processing happens in your browser.
            </p>

            <h3 className="text-white">How It Works</h3>
            <ul className="text-gray-300">
              <li>All data processing happens entirely in your browser</li>
              <li>Your GA4 Property ID is only used locally to initialize tracking</li>
              <li>No analytics data leaves your device</li>
              <li>We don't use cookies or tracking pixels</li>
              <li>End-to-end encryption for all data transmission</li>
            </ul>

            <h3 className="text-white">Enterprise Security</h3>
            <p className="text-gray-300">
              ASVA AI meets enterprise security standards with SOC 2 compliance, end-to-end encryption, 
              and secure data handling practices. Your data never leaves your control.
            </p>

            <h3 className="text-white">Third-Party Services</h3>
            <p className="text-gray-300">
              This application connects directly to Google Analytics 4 using their official JavaScript library
              (gtag.js). Your data is subject to Google's privacy policy when using their services.
            </p>

            <h3 className="text-white">Advanced Analytics</h3>
            <p className="text-gray-300">
              Our machine learning algorithms process data locally to provide predictive insights and 
              actionable intelligence without compromising your privacy.
            </p>

            <h3 className="text-white">Contact</h3>
            <p className="text-gray-300">
              If you have any questions about this privacy policy or ASVA AI's security practices, 
              please contact our enterprise support team.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
