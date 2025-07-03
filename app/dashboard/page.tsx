"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { ArrowLeft, RefreshCw, TrendingUp, Users, Clock, Globe, AlertCircle, Brain, CheckCircle } from "lucide-react"
import Link from "next/link"
import { AIReferrerChart } from "../../components/ai-referrer-chart"
import { TopPagesTable } from "../../components/top-pages-table"
import { EmbedGenerator } from "../../components/embed-generator"
import { ExportData } from "../../components/export-data"
import { AuthService } from "../../services/AuthService"
import { AnalyticsService } from "../../services/AnalyticsService"

interface AnalyticsData {
  totalSessions: number
  dailyData: Array<{
    date: string
    chatgpt: number
    perplexity: number
    bard: number
    claude: number
    copilot: number
    you: number
    other: number
  }>
  sourceBreakdown: Array<{
    name: string
    value: number
    color: string
  }>
  topPages: Array<{
    page: string
    sessions: number
    bounceRate: number
  }>
}

function DashboardContent() {
  const searchParams = useSearchParams()
  const [propertyId, setPropertyId] = useState(searchParams.get("id") || "")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aiReferralData, setAiReferralData] = useState<AnalyticsData | null>(null)
  const [authService] = useState(() => new AuthService())
  const [analyticsService] = useState(() => new AnalyticsService())
  const [hasPropertyAccess, setHasPropertyAccess] = useState(false)

  useEffect(() => {
    // Debug: Log propertyId and tokens
    const debugTokens = authService.getStoredTokens();
    console.log("[DEBUG] useEffect propertyId:", propertyId);
    console.log("[DEBUG] useEffect tokens:", debugTokens);
    setHasPropertyAccess(false); // Reset on propertyId change

    // Clear analytics data when property ID changes
    if (aiReferralData) {
      setAiReferralData(null)
    }

    // Check if user is returning from OAuth with tokens
    const urlParams = new URLSearchParams(window.location.search)
    const tokensParam = urlParams.get("tokens")
    const error = urlParams.get("error")

    if (error) {
      setError(`Authentication failed: ${error}`)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
      return
    }

    if (tokensParam) {
      try {
        const tokens = JSON.parse(Buffer.from(tokensParam, "base64").toString())
        authService.storeTokens(tokens)
        setIsAuthenticated(true)

        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)

        if (propertyId) {
          fetchAnalyticsData()
        }
      } catch (err) {
        setError("Failed to process authentication tokens")
        console.error("Token processing error:", err)
      }
      return
    }

    // Check for existing tokens
    const tokens = authService.getStoredTokens()
    if (tokens) {
      setIsAuthenticated(true)
      if (propertyId) {
        fetchAnalyticsData()
      }
    }
  }, [propertyId, isAuthenticated])

  const handleOAuthCallback = async (code: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const tokens = await authService.exchangeCodeForTokens(code)
      console.log("[DEBUG] handleOAuthCallback tokens:", tokens);
      authService.storeTokens(tokens)
      setIsAuthenticated(true)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
      if (propertyId) {
        await fetchAnalyticsData()
      }
    } catch (err) {
      setError("Authentication failed. Please try again.")
      console.error("OAuth callback error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const authUrl = await authService.getAuthUrl()
      window.location.href = authUrl
    } catch (err) {
      setError("Failed to initiate authentication. Please try again.")
      console.error("Auth initiation error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAnalyticsData = async () => {
    if (!propertyId || !isAuthenticated) {
      console.log("[DEBUG] fetchAnalyticsData: missing propertyId or not authenticated", propertyId, isAuthenticated);
      setHasPropertyAccess(false);
      return
    }
    setIsLoading(true)
    setError(null)
    try {
      const tokens = authService.getStoredTokens()
      console.log("[DEBUG] fetchAnalyticsData tokens:", tokens);
      if (!tokens) {
        throw new Error("No authentication tokens found")
      }
      // First validate property access
      const hasAccess = await analyticsService.validatePropertyAccess(propertyId, tokens)
      console.log("[DEBUG] validatePropertyAccess response:", hasAccess);
      setHasPropertyAccess(hasAccess);
      if (!hasAccess) {
        setError("Access denied to this Google Analytics property. Please check the property ID and your permissions.");
        return;
      }
      // Fetch analytics data
      const data = await analyticsService.getAIReferralData(propertyId, tokens)
      setAiReferralData(data)
    } catch (err: any) {
      setHasPropertyAccess(false);
      if (err.message.includes("invalid_grant") || err.message.includes("expired")) {
        authService.clearTokens()
        setIsAuthenticated(false)
        setError("Your session has expired. Please authenticate again.")
      } else {
        setError(err.message || "Failed to fetch analytics data")
      }
      console.error("Analytics fetch error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchAnalyticsData()
  }

  const handleLogout = () => {
    authService.clearTokens()
    setIsAuthenticated(false)
    setAiReferralData(null)
    setError(null)
  }

  // Show authentication flow if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <img src="/asva-logo.png" alt="ASVA AI Logo" className="h-8 w-8" />
              </div>
              <div>
                <CardTitle className="text-white">ASVA AI Analytics</CardTitle>
                <p className="text-sm text-gray-400">Connect to Google Analytics</p>
              </div>
            </div>
            <CardDescription className="text-gray-300">
              Authenticate with Google to access your GA4 data and track AI referrals with ASVA AI's advanced analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-900/50 border-red-700/50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-red-200">{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Input
                placeholder="Enter GA4 Property ID (e.g., 123456789)"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-400">
                Find this in Google Analytics → Admin → Property Settings → Property ID
              </p>
            </div>
            <Button
              onClick={handleGoogleAuth}
              disabled={isLoading || !propertyId.match(/^\d{6,12}$/)}
              className="w-full bg-white text-black hover:bg-gray-100"
            >
              {isLoading ? "Connecting..." : "Connect with Google"}
            </Button>
            <div className="text-center">
              <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">ASVA AI Analytics</h1>
              <p className="text-xs text-gray-400">AI Referrer Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleRefresh}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-red-700 text-red-300 hover:bg-red-900/20"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Property ID Input - Only show when no data is loaded or user wants to change */}
        {!aiReferralData && (
          <Card className="mb-8 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Google Analytics Property</CardTitle>
              <CardDescription className="text-gray-300">
                {propertyId ? `Ready to load data for Property ID ${propertyId}` : "Enter your GA4 Property ID to start tracking AI referrals"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  placeholder="123456789"
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button
                  onClick={fetchAnalyticsData}
                  disabled={isLoading || !propertyId.match(/^\d{6,12}$/)}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  {isLoading ? "Loading..." : propertyId ? "Load Data" : "Enter Property ID"}
                </Button>
              </div>
              {propertyId && !propertyId.match(/^\d{6,12}$/) && (
                <p className="text-xs text-red-400">
                  Property ID should be 6-12 digits (numeric format)
                </p>
              )}
              {isLoading && (
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Loading analytics data...</span>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Property Info Display - Show when data is loaded */}
        {aiReferralData && (
          <Card className="mb-8 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Google Analytics Property</CardTitle>
              <CardDescription className="text-gray-300">
                Currently tracking: Property ID {propertyId}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-4">
                <Input
                  placeholder="123456789"
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                />
                <Button
                  onClick={fetchAnalyticsData}
                  disabled={isLoading || !propertyId.match(/^\d{6,12}$/)}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  {isLoading ? "Loading..." : "Change Property"}
                </Button>
              </div>
              {propertyId && !propertyId.match(/^\d{6,12}$/) && (
                <p className="text-xs text-red-400">
                  Property ID should be 6-12 digits (numeric format)
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="mb-8 bg-red-900/50 border-red-700/50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-200">{error}</AlertDescription>
          </Alert>
        )}

        {/* Success Display */}
        {aiReferralData && !error && (
          <Alert className="mb-8 bg-green-900/50 border-green-700/50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription className="text-green-200">
              Successfully loaded analytics data for Property ID {propertyId}
            </AlertDescription>
          </Alert>
        )}

        {/* Analytics Data */}
        {aiReferralData && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Total Sessions</p>
                      <p className="text-2xl font-bold text-white">{aiReferralData.totalSessions.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">AI Sources</p>
                      <p className="text-2xl font-bold text-white">{aiReferralData.sourceBreakdown.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Top Pages</p>
                      <p className="text-2xl font-bold text-white">{aiReferralData.topPages.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300">Data Period</p>
                      <p className="text-2xl font-bold text-white">30d</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Tables */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-gray-900 border-gray-800">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="pages" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Top Pages
                </TabsTrigger>
                <TabsTrigger value="export" className="data-[state=active]:bg-white data-[state=active]:text-black">
                  Export & Embed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">AI Referral Trends</CardTitle>
                    <CardDescription className="text-gray-300">
                      Track traffic from AI tools over the last 30 days
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AIReferrerChart data={aiReferralData.dailyData} />
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Source Breakdown</CardTitle>
                    <CardDescription className="text-gray-300">
                      Distribution of traffic from different AI platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {aiReferralData.sourceBreakdown.map((source, index) => (
                        <div key={index} className="text-center">
                          <div className="w-16 h-16 mx-auto mb-2 rounded-lg flex items-center justify-center text-white font-bold text-sm bg-gray-800">
                            {source.value}
                          </div>
                          <p className="text-sm text-gray-300">{source.name}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pages" className="space-y-6">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Top Pages from AI Referrals</CardTitle>
                    <CardDescription className="text-gray-300">
                      Most visited pages from AI tool traffic
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopPagesTable data={aiReferralData.topPages} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="export" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Export Data</CardTitle>
                      <CardDescription className="text-gray-300">
                        Download your analytics data in various formats
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ExportData data={aiReferralData} />
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white">Embed Charts</CardTitle>
                      <CardDescription className="text-gray-300">
                        Generate embed codes for your dashboards
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <EmbedGenerator measurementId={propertyId} />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading ASVA AI Analytics...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
