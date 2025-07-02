import { Router } from "express"
import { GoogleAnalyticsService } from "../services/GoogleAnalyticsService"
import { validateRequest } from "../middleware/validation"
import { authMiddleware } from "../middleware/auth"
import { logger } from "../utils/logger"
import Joi from "joi"
import type { Request, Response, NextFunction } from "express"

interface AuthenticatedRequest extends Request {
  user?: {
    accessToken: string
    refreshToken?: string
  }
}

const router = Router()
const analyticsService = new GoogleAnalyticsService()

// Validation schemas
const getAnalyticsSchema = Joi.object({
  propertyId: Joi.string()
    .required()
    .pattern(/^[0-9]{6,12}$/)
    .messages({
      'string.pattern.base': 'Property ID must be 6-12 digits (numeric format)',
    }),
  startDate: Joi.string().optional().default("30daysAgo"),
  endDate: Joi.string().optional().default("today"),
})

// Get AI referral analytics data
router.get("/ai-referrals", authMiddleware, validateRequest({ query: getAnalyticsSchema }), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { propertyId, startDate, endDate } = req.query
    const { accessToken, refreshToken } = req.user

    // Set credentials for this request
    await analyticsService.setCredentials(accessToken, refreshToken)

    // Validate property access
    const hasAccess = await analyticsService.validatePropertyAccess(propertyId as string)
    if (!hasAccess) {
      return res.status(403).json({
        error: "Access denied to this Google Analytics property",
      })
    }

    // Get analytics data
    const data = await analyticsService.getAIReferralData(propertyId as string, startDate as string, endDate as string)

    res.json({
      success: true,
      data,
      propertyId,
      dateRange: { startDate, endDate },
    })
  } catch (error) {
    logger.error("Error in /ai-referrals endpoint:", error)
    next(error)
  }
})

// Validate property access
router.post(
  "/validate-property",
  authMiddleware,
  validateRequest({
    body: Joi.object({
      propertyId: Joi.string()
        .required()
        .pattern(/^[0-9]{6,12}$/)
        .messages({
          'string.pattern.base': 'Property ID must be 6-12 digits (numeric format)',
        }),
    }),
  }),
  async (req: AuthenticatedRequest, res, next) => {
    try {
      const { propertyId } = req.body
      const { accessToken, refreshToken } = req.user

      await analyticsService.setCredentials(accessToken, refreshToken)
      const hasAccess = await analyticsService.validatePropertyAccess(propertyId)

      res.json({
        success: true,
        hasAccess,
        propertyId,
      })
    } catch (error) {
      logger.error("Error in /validate-property endpoint:", error)
      next(error)
    }
  },
)

export { router as analyticsRouter }
