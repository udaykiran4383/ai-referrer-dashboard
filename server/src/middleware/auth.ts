import type { Request, Response, NextFunction } from "express"

interface AuthenticatedRequest extends Request {
  user?: {
    accessToken: string
    refreshToken?: string
  }
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access token required" })
  }

  const accessToken = authHeader.substring(7)
  const refreshToken = req.headers["x-refresh-token"] as string

  req.user = {
    accessToken,
    refreshToken,
  }

  next()
}
