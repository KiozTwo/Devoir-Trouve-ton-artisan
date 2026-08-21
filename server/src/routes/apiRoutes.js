import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { body, param, query } from 'express-validator';
import { listCategories } from '../controllers/categoryController.js';
import {
  contactArtisan,
  getArtisan,
  listArtisans
} from '../controllers/artisanController.js';
import { validateRequest } from '../middlewares/validate.js';
import { sequelize } from '../models/index.js';

export const apiRouter = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { message: 'Trop de messages envoyés. Réessayez plus tard.' }
});

apiRouter.get('/health', async (_req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: 'ok' });
  } catch {
    res.status(503).json({ status: 'unavailable' });
  }
});

apiRouter.get('/categories', listCategories);

apiRouter.get(
  '/artisans',
  [
    query('search').optional().trim().isLength({ min: 1, max: 100 }),
    query('category').optional().trim().isSlug(),
    query('top').optional().isBoolean(),
    validateRequest
  ],
  listArtisans
);

apiRouter.get(
  '/artisans/:id',
  [param('id').isInt({ min: 1 }), validateRequest],
  getArtisan
);

apiRouter.post(
  '/artisans/:id/contact',
  contactLimiter,
  [
    param('id').isInt({ min: 1 }),
    body('name').trim().isLength({ min: 2, max: 100 }),
    body('email').trim().isEmail().normalizeEmail(),
    body('subject').trim().isLength({ min: 3, max: 150 }),
    body('message').trim().isLength({ min: 10, max: 3000 }),
    body('website').optional({ values: 'falsy' }).isEmpty(),
    validateRequest
  ],
  contactArtisan
);
