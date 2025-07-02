import { google } from "googleapis"
import type { OAuth2Client } from "google-auth-library"
import NodeCache from "node-cache"
import { logger } from "../utils/logger"
import moment from "moment"
import dotenv from "dotenv"

dotenv.config()
console.log("GOOGLE_REDIRECT_URI:", process.env.GOOGLE_REDIRECT_URI)

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
  rawSources: Array<string>
}

export class GoogleAnalyticsService {
  private analyticsReporting: any
  private analyticsData: any
  private cache: NodeCache
  private oauth2Client: OAuth2Client

  constructor() {
    this.cache = new NodeCache({ stdTTL: 300 }) // 5 minutes cache
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    )

    // Use both GA4 Data API and Universal Analytics Reporting API
    this.analyticsReporting = google.analyticsreporting({ version: "v4", auth: this.oauth2Client })
    this.analyticsData = google.analyticsdata({ version: "v1beta", auth: this.oauth2Client })
  }

  async setCredentials(accessToken: string, refreshToken?: string) {
    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    })
  }

  async getAuthUrl(): Promise<string> {
    const scopes = ["https://www.googleapis.com/auth/analytics.readonly", "https://www.googleapis.com/auth/analytics"]

    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
    })
  }

  async exchangeCodeForTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    console.log("Google token response:", tokens);
    if (!tokens || !tokens.access_token) {
      throw new Error("Failed to obtain tokens from Google");
    }
    return tokens;
  }

  async getAIReferralData(propertyId: string, startDate = "30daysAgo", endDate = "today"): Promise<AnalyticsData> {
    const cacheKey = `analytics_${propertyId}_${startDate}_${endDate}`
    const cachedData = this.cache.get<AnalyticsData>(cacheKey)

    if (cachedData) {
      logger.info(`Returning cached data for property ${propertyId}`)
      return cachedData
    }

    try {
      logger.info(`Fetching analytics data for property ${propertyId}`)

      // For GA4, we need to use the Data API instead of Reporting API
      const requestBody = {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "sessionSource" }, { name: "date" }],
        metrics: [{ name: "sessions" }, { name: "bounceRate" }, { name: "averageSessionDuration" }],
        dimensionFilter: {
          filter: {
            fieldName: "sessionSource",
            stringFilter: {
              matchType: "FULL_REGEXP",
              value: "(chatgpt\\.com|chat\\.openai\\.com|openai\\.com|perplexity\\.ai|bard\\.google\\.com|claude\\.ai|copilot\\.microsoft\\.com|you\\.com|google\\.com|linkedin\\.com)",
            },
          },
        },
        orderBys: [{ dimension: { dimensionName: "date" } }],
      };
      console.log("[DEBUG] GA4 AI Referral RequestBody:", JSON.stringify(requestBody, null, 2));
      const response = await this.analyticsData.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody,
      })
      console.log("[DEBUG] GA4 AI Referral Raw Response:", JSON.stringify(response.data, null, 2));

      // Also get top pages
      const topPagesRequestBody = {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "sessions" }, { name: "bounceRate" }],
        dimensionFilter: {
          filter: {
            fieldName: "sessionSource",
            stringFilter: {
              matchType: "FULL_REGEXP",
              value: "(chatgpt\\.com|chat\\.openai\\.com|openai\\.com|perplexity\\.ai|bard\\.google\\.com|claude\\.ai|copilot\\.microsoft\\.com|you\\.com|google\\.com|linkedin\\.com)",
            },
          },
        },
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 10,
      };
      console.log("[DEBUG] GA4 Top Pages RequestBody:", JSON.stringify(topPagesRequestBody, null, 2));
      const topPagesResponse = await this.analyticsData.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: topPagesRequestBody,
      })
      console.log("[DEBUG] GA4 Top Pages Raw Response:", JSON.stringify(topPagesResponse.data, null, 2));

      const processedData = this.processGA4Data(response.data, topPagesResponse.data)

      // Cache the processed data
      this.cache.set(cacheKey, processedData)

      logger.info(`Successfully processed GA4 data for property ${propertyId}`)
      return processedData
    } catch (error: any) {
      logger.error("Error fetching GA4 data:", error)
      if (error.response && error.response.data) {
        console.error("[DEBUG] GA4 Error Response:", JSON.stringify(error.response.data, null, 2));
      }

      // If GA4 fails, try fallback with sample data structure
      const fallbackData: AnalyticsData = {
        totalSessions: 0,
        dailyData: [],
        sourceBreakdown: [],
        topPages: [],
        rawSources: [],
      }

      return fallbackData
    }
  }

  private processGA4Data(reportData: any, topPagesData: any): AnalyticsData {
    const aiSourceMap = {
      "chatgpt.com": "chatgpt",
      "chat.openai.com": "chatgpt",
      "openai.com": "chatgpt",
      "perplexity.ai": "perplexity",
      "bard.google.com": "bard",
      "claude.ai": "claude",
      "copilot.microsoft.com": "copilot",
      "you.com": "you",
      "google.com": "google",
      "linkedin.com": "linkedin",
    }

    const colorMap = {
      ChatGPT: "#10B981",
      Perplexity: "#3B82F6",
      "Google Bard": "#F59E0B",
      Claude: "#F97316",
      "Microsoft Copilot": "#06B6D4",
      "You.com": "#8B5CF6",
      Google: "#4285F4",
      LinkedIn: "#0077B5",
      "Other AI Tools": "#6B7280",
    }

    // Process daily data
    const dailyDataMap = new Map()
    const sourceBreakdownMap = new Map()
    let totalSessions = 0
    const rawSourcesSet = new Set<string>()

    if (reportData.rows) {
      reportData.rows.forEach((row: any) => {
        const source = row.dimensionValues[0].value
        rawSourcesSet.add(source)
        const date = moment(row.dimensionValues[1].value, "YYYYMMDD").format("YYYY-MM-DD")
        const sessions = Number.parseInt(row.metricValues[0].value)

        totalSessions += sessions

        // Map source to our AI tool names
        let aiTool = "other"
        for (const [domain, tool] of Object.entries(aiSourceMap)) {
          if (source.toLowerCase().includes(domain)) {
            aiTool = tool
            break
          }
        }

        // Update daily data
        if (!dailyDataMap.has(date)) {
          dailyDataMap.set(date, {
            date,
            chatgpt: 0,
            perplexity: 0,
            bard: 0,
            claude: 0,
            copilot: 0,
            you: 0,
            other: 0,
          })
        }
        dailyDataMap.get(date)[aiTool] += sessions

        // Update source breakdown
        const displayName = this.getDisplayName(aiTool)
        sourceBreakdownMap.set(displayName, (sourceBreakdownMap.get(displayName) || 0) + sessions)
      })
    }

    // Convert maps to arrays
    const dailyData = Array.from(dailyDataMap.values()).sort((a, b) => a.date.localeCompare(b.date))

    const sourceBreakdown = Array.from(sourceBreakdownMap.entries()).map(([name, value]) => ({
      name,
      value,
      color: (colorMap as any)[name] || "#6B7280",
    }))

    // Process top pages
    const topPages: Array<{
      page: string
      sessions: number
      bounceRate: number
    }> = []
    if (topPagesData.rows) {
      topPagesData.rows.forEach((row: any) => {
        topPages.push({
          page: row.dimensionValues[0].value,
          sessions: Number.parseInt(row.metricValues[0].value),
          bounceRate: Number.parseFloat(row.metricValues[1].value),
        })
      })
    }

    return {
      totalSessions,
      dailyData,
      sourceBreakdown,
      topPages,
      rawSources: Array.from(rawSourcesSet),
    }
  }

  private getDisplayName(aiTool: string): string {
    const displayNames = {
      chatgpt: "ChatGPT",
      perplexity: "Perplexity",
      bard: "Google Bard",
      claude: "Claude",
      copilot: "Microsoft Copilot",
      you: "You.com",
      other: "Other AI Tools",
    }
    return (displayNames as any)[aiTool] || "Other AI Tools"
  }

  async validatePropertyAccess(propertyId: string): Promise<boolean> {
    try {
      // Debug: Log propertyId and partial accessToken
      const creds = this.oauth2Client.credentials;
      console.log(`[DEBUG] validatePropertyAccess propertyId: ${propertyId}`);
      if (creds && creds.access_token) {
        console.log(`[DEBUG] validatePropertyAccess accessToken: ${creds.access_token.slice(0, 6)}...`);
      }
      await this.analyticsData.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
          metrics: [{ name: "sessions" }],
          limit: 1,
        },
      })
      return true
    } catch (error: any) {
      logger.error(`Property access validation failed for ${propertyId}:`, error)
      if (error.response && error.response.data) {
        console.error("[DEBUG] validatePropertyAccess Error Response:", JSON.stringify(error.response.data, null, 2));
      }
      return false
    }
  }
}
