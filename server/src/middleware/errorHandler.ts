import type { Request, Response, NextFunction } from "express"
import { logger } from "../utils/logger"

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error("Unhandled error:", error)

  // Google API errors
  if (error.code && error.errors) {
    return res.status(error.code).json({
      error: "Google API Error",
      message: error.message,
      details: error.errors,
    })
  }

  // OAuth errors
  if (error.message && error.message.includes("invalid_grant")) {
    return res.status(401).json({
      error: "Authentication expired",
      message: "Please re-authenticate with Google",
    })
  }

  // Default error response
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
  })
}
