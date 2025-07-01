import { Router } from "express"
import { GoogleAnalyticsService } from "../services/GoogleAnalyticsService"
import { validateRequest } from "../middleware/validation"
import { logger } from "../utils/logger"
import Joi from "joi"

const router = Router()
const analyticsService = new GoogleAnalyticsService()

// Get Google OAuth URL
router.get("/google-auth-url", async (req, res, next) => {
  try {
    const authUrl = await analyticsService.getAuthUrl()
    res.json({
      success: true,
      authUrl,
    })
  } catch (error) {
    logger.error("Error generating auth URL:", error)
    next(error)
  }
})

// Handle Google OAuth callback (redirect endpoint)
router.get("/google/callback", async (req, res, next) => {
  try {
    const { code, error } = req.query

    if (error) {
      logger.error("OAuth error:", error)
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard?error=oauth_error`)
    }

    if (!code) {
      return res.redirect(`${process.env.FRONTEND_URL}/dashboard?error=missing_code`)
    }

    const tokens = await analyticsService.exchangeCodeForTokens(code as string)

    // Redirect back to frontend with tokens (in a real app, you'd want to use a more secure method)
    const tokenString = Buffer.from(
      JSON.stringify({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      }),
    ).toString("base64")

    res.redirect(`${process.env.FRONTEND_URL}/dashboard?tokens=${tokenString}`)
  } catch (error) {
    logger.error("Error in Google callback:", error)
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?error=callback_error`)
  }
})

// Exchange authorization code for tokens (API endpoint)
router.post(
  "/google-callback",
  validateRequest({
    body: Joi.object({
      code: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { code } = req.body
      const tokens = await analyticsService.exchangeCodeForTokens(code)

      res.json({
        success: true,
        tokens: {
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiryDate: tokens.expiry_date,
        },
      })
    } catch (error) {
      logger.error("Error in Google callback:", error)
      next(error)
    }
  },
)

export { router as authRouter }
