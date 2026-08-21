import { Category } from '../models/index.js';

export async function listCategories(_req, res, next) {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'slug'],
      order: [['name', 'ASC']]
    });

    res.json(categories);
  } catch (error) {
    next(error);
  }
}
