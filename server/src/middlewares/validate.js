import { validationResult } from 'express-validator';

export function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    message: 'Données invalides.',
    errors: errors.array().map(({ path, msg }) => ({ field: path, message: msg }))
  });
}
