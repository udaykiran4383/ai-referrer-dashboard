import { Router } from "express"
import { GoogleAnalyticsService } from "../services/GoogleAnalyticsService"
import { validateRequest } from "../middleware/validation"
import { authMiddleware } from "../middleware/auth"
import { logger } from "../utils/logger"
import Joi from "joi"
import type { Request, Response, NextFunction } from "express"
import { supabase } from '../utils/supabase';
import axios from 'axios';

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
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" })
    }
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

    // Fetch user info from Google
    let userInfo = null;
    try {
      const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      userInfo = userInfoRes.data;
    } catch (err) {
      userInfo = null;
    }

    // Upsert user in Supabase
    let supabaseUserId = null;
    if (userInfo && userInfo.id) {
      const { data: userUpserted, error: userError } = await supabase.from('ai_referrer_dashboard_users').upsert({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name || null,
        picture: userInfo.picture || null,
        created_at: new Date().toISOString(),
      });
      supabaseUserId = userInfo.id;
    }

    // Insert analytics data in Supabase
    if (supabaseUserId) {
      await supabase.from('ai_referrer_dashboard_analytics').insert({
        user_id: supabaseUserId,
        property_id: propertyId,
        data: data,
        fetched_at: new Date().toISOString(),
      });
    }

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
      if (!req.user) {
        return res.status(401).json({ error: "User not authenticated" })
      }
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
