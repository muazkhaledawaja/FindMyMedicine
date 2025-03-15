import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { HttpStatus } from '../enums/ResponseCodes'
import { ValidationError} from '../errors'

export function validateResult(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(HttpStatus.BAD_REQUEST).json({
      ResponseCode: ValidationError,
      Message: 'Failed at one of the required validations',
      errors: errors.array(),
    })
    return
  }
  next()
}
