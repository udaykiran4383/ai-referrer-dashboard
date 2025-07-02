"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { ArrowLeft, RefreshCw, TrendingUp, Users, Clock, Globe, AlertCircle } from "lucide-react"
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
  }, [propertyId])

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect to Google Analytics</CardTitle>
            <CardDescription>Authenticate with Google to access your GA4 data and track AI referrals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">GA4 Property ID</label>
              <Input
                placeholder="123456789"
                value={propertyId}
                onChange={(e) => setPropertyId(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">Find this in GA4 under Admin → Property Settings → Property ID (numeric format, not G-XXXXXXXXXX)</p>
            </div>

            <Button className="w-full" onClick={handleGoogleAuth} disabled={!propertyId.match(/^\d{6,12}$/) || isLoading}>
              {isLoading ? "Connecting..." : "Connect with Google"}
            </Button>
            {propertyId && !propertyId.match(/^\d{6,12}$/) && (
              <p className="text-xs text-red-500 text-center">
                Property ID should be 6-12 digits (numeric format)
              </p>
            )}

            <div className="text-center">
              <Link href="/" className="text-sm text-blue-600 hover:underline flex items-center justify-center">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show property input if no property ID
  if (!propertyId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Enter GA4 Property ID</CardTitle>
            <CardDescription>Enter your Google Analytics 4 Property ID (numeric format) to view AI referral data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="123456789" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
            <Button className="w-full" onClick={() => propertyId && fetchAnalyticsData()} disabled={!propertyId.match(/^\d{6,12}$/)}>
              Load Dashboard
            </Button>
            {propertyId && !propertyId.match(/^\d{6,12}$/) && (
              <p className="text-xs text-red-500 text-center">
                Property ID should be 6-12 digits (numeric format)
              </p>
            )}
            <div className="flex justify-between text-sm">
              <button onClick={handleLogout} className="text-red-600 hover:underline">
                Disconnect
              </button>
              <Link href="/" className="text-blue-600 hover:underline">
                Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Only show 'Connected' if both authenticated and property access succeed
  const isConnected = isAuthenticated && hasPropertyAccess;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold">AI Referrer Dashboard</h1>
                <p className="text-sm text-gray-500">Property: {propertyId}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={isConnected ? "default" : "secondary"}>
                {isConnected ? "Connected" : "Disconnected"}
              </Badge>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && !aiReferralData && (
          <Alert className="mb-6">
            <AlertDescription>Loading analytics data...</AlertDescription>
          </Alert>
        )}

        {aiReferralData && (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total AI Sessions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{aiReferralData.totalSessions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top AI Source</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{aiReferralData.sourceBreakdown[0]?.name || "N/A"}</div>
                  <p className="text-xs text-muted-foreground">
                    {aiReferralData.sourceBreakdown[0]?.value || 0} sessions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{aiReferralData.sourceBreakdown.length}</div>
                  <p className="text-xs text-muted-foreground">AI tools detected</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Landing Page</CardTitle>
                  <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{aiReferralData.topPages[0]?.sessions || 0}</div>
                  <p className="text-xs text-muted-foreground truncate">{aiReferralData.topPages[0]?.page || "N/A"}</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sources">AI Sources</TabsTrigger>
                <TabsTrigger value="pages">Top Pages</TabsTrigger>
                <TabsTrigger value="export">Export & Embed</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <AIReferrerChart data={aiReferralData.dailyData} />
              </TabsContent>

              <TabsContent value="sources" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Source Breakdown</CardTitle>
                    <CardDescription>Sessions by AI tool referrer</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aiReferralData.sourceBreakdown.map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: source.color }} />
                            <span className="font-medium">{source.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{source.value}</div>
                            <div className="text-sm text-gray-500">
                              {aiReferralData.totalSessions > 0
                                ? ((source.value / aiReferralData.totalSessions) * 100).toFixed(1)
                                : 0}
                              %
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pages" className="space-y-6">
                <TopPagesTable data={aiReferralData.topPages} />
              </TabsContent>

              <TabsContent value="export" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <ExportData data={aiReferralData} />
                  <EmbedGenerator propertyId={propertyId} />
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
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  )
}
