const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://ai-referrer-backend.onrender.com/api"

export interface AuthTokens {
  accessToken: string
  refreshToken?: string
  expiryDate?: number
}

export class AuthService {
  private readonly STORAGE_KEY = "ai_referrer_tokens"

  async getAuthUrl(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/google-auth-url`)
    const data = await response.json()

    if (!data.success) {
      throw new Error("Failed to get authentication URL")
    }

    return data.authUrl
  }

  async exchangeCodeForTokens(code: string): Promise<AuthTokens> {
    const response = await fetch(`${API_BASE_URL}/auth/google-callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.error || "Failed to exchange code for tokens")
    }

    return data.tokens
  }

  storeTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tokens))
  }

  getStoredTokens(): AuthTokens | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) return null

    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }

  clearTokens(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.STORAGE_KEY)
    }
  }

  isTokenExpired(tokens: AuthTokens): boolean {
    if (!tokens.expiryDate) return false
    return Date.now() >= tokens.expiryDate
  }
}
