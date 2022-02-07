import { body } from 'express-validator'

export const getLinkValidator = [
  body('url').notEmpty().withMessage('URL is required'),
]
