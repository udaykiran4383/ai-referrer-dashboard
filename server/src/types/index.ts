export interface AnalyticsData {
  totalSessions: number
  dailyData: DailyData[]
  sourceBreakdown: SourceBreakdown[]
  topPages: TopPage[]
}

export interface DailyData {
  date: string
  chatgpt: number
  perplexity: number
  bard: number
  claude: number
  copilot: number
  you: number
  other: number
}

export interface SourceBreakdown {
  name: string
  value: number
  color: string
}

export interface TopPage {
  page: string
  sessions: number
  bounceRate: number
}

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiryDate?: number
}
