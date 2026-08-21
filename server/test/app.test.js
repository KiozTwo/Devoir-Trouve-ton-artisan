import { describe, it, expect, vi } from 'vitest';

vi.mock('../src/models/index.js', () => ({
  sequelize: {
    authenticate: vi.fn().mockResolvedValue()
  },
  Category: {
    findAll: vi.fn().mockResolvedValue([
      { id: 1, name: 'Services', slug: 'services' }
    ])
  },
  Artisan: {
    findAll: vi.fn().mockResolvedValue([]),
    findByPk: vi.fn()
  },
  artisanInclude: [
    { include: [{}] },
    {}
  ]
}));

import request from 'supertest';
import { app } from '../src/app.js';

describe('API', () => {
  it('répond au contrôle de santé', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('retourne les catégories', async () => {
    const response = await request(app).get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body[0].slug).toBe('services');
  });

  it('retourne la liste des artisans', async () => {
    const response = await request(app).get('/api/artisans');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('refuse un identifiant invalide', async () => {
    const response = await request(app).get('/api/artisans/abc');

    expect(response.status).toBe(422);
  });

  it('retourne une erreur si un artisan est introuvable', async () => {
    const response = await request(app).get('/api/artisans/999');

    expect(response.status).toBe(404);
  });

  it('refuse un formulaire incomplet', async () => {
    const response = await request(app)
      .post('/api/artisans/1/contact')
      .send({ name: 'S' });

    expect(response.status).toBe(422);
  });
});

