import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { config } from './config.js';
import { apiNotFound, handleError } from './middlewares/errors.js';
import { apiRouter } from './routes/apiRoutes.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
  origin: config.clientOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  maxAge: 86400
}));
app.use(express.json({ limit: '20kb' }));
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200,
  standardHeaders: 'draft-7',
  legacyHeaders: false
}));
app.use('/api', apiRouter);
app.use('/api', apiNotFound);
app.use(handleError);
