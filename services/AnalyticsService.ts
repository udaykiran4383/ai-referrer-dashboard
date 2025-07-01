import type { AuthTokens } from "./AuthService"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export interface AnalyticsData {
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

export class AnalyticsService {
  async getAIReferralData(
    propertyId: string,
    tokens: AuthTokens,
    startDate = "30daysAgo",
    endDate = "today",
  ): Promise<AnalyticsData> {
    const response = await fetch(
      `${API_BASE_URL}/analytics/ai-referrals?propertyId=${propertyId}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "X-Refresh-Token": tokens.refreshToken || "",
        },
      },
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch analytics data")
    }

    return data.data
  }

  async validatePropertyAccess(propertyId: string, tokens: AuthTokens): Promise<boolean> {
    const response = await fetch(`${API_BASE_URL}/analytics/validate-property`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
        "X-Refresh-Token": tokens.refreshToken || "",
      },
      body: JSON.stringify({ propertyId }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to validate property access")
    }

    return data.hasAccess
  }
}
