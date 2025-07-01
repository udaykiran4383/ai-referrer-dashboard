import type { Request, Response, NextFunction } from "express"
import type Joi from "joi"

interface ValidationSchemas {
  body?: Joi.ObjectSchema
  query?: Joi.ObjectSchema
  params?: Joi.ObjectSchema
}

export const validateRequest = (schemas: ValidationSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = []

    // Validate body
    if (schemas.body) {
      const { error } = schemas.body.validate(req.body)
      if (error) {
        errors.push(`Body: ${error.details.map((d) => d.message).join(", ")}`)
      }
    }

    // Validate query
    if (schemas.query) {
      const { error, value } = schemas.query.validate(req.query)
      if (error) {
        errors.push(`Query: ${error.details.map((d) => d.message).join(", ")}`)
      } else {
        req.query = value
      }
    }

    // Validate params
    if (schemas.params) {
      const { error } = schemas.params.validate(req.params)
      if (error) {
        errors.push(`Params: ${error.details.map((d) => d.message).join(", ")}`)
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      })
    }

    next()
  }
}
