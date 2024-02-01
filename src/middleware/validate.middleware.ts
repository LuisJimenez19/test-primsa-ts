import { NextFunction, Request, Response } from 'express'
import { ZodSchema, ZodError } from 'zod'

export const validateBody =
  (schemaForValidate: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schemaForValidate.parse(req.body)
      return next()
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues
        const responseError = {
          error: true,
          data: req.body,
          msg: issues[0].message
        }
        return res.status(400).json(responseError)
      }

      return res.status(400).json({
        error: true,
        msg: 'Internal server error'
      })
    }
  }
