import { Op } from 'sequelize';
import { Artisan, artisanInclude } from '../models/index.js';
import { sendContact } from '../services/mailer.js';

function formatArtisan(row) {
  const artisan = typeof row.get === 'function' ? row.get({ plain: true }) : { ...row };
  const city = artisan.cityRecord?.name || artisan.city || '';

  delete artisan.email;
  delete artisan.cityRecord;

  return { ...artisan, city };
}

export async function listArtisans(req, res, next) {
  try {
    const where = {};
    const include = artisanInclude.map((item) => ({ ...item }));

    if (req.query.search) {
      const escapedSearch = req.query.search.replace(/[\\%_]/g, '\\$&');
      where.name = { [Op.like]: `%${escapedSearch}%` };
    }

    if (req.query.top === 'true') {
      where.isTop = true;
    }

    if (req.query.category) {
      include[0] = {
        ...include[0],
        required: true,
        include: [{
          ...include[0].include[0],
          where: { slug: req.query.category },
          required: true
        }]
      };
    }

    const rows = await Artisan.findAll({
      where,
      include,
      order: [['name', 'ASC']]
    });

    res.json(rows.map(formatArtisan));
  } catch (error) {
    next(error);
  }
}

export async function getArtisan(req, res, next) {
  try {
    const row = await Artisan.findByPk(req.params.id, { include: artisanInclude });

    if (!row) {
      return res.status(404).json({ message: 'Artisan introuvable.' });
    }

    return res.json(formatArtisan(row));
  } catch (error) {
    return next(error);
  }
}

export async function contactArtisan(req, res, next) {
  try {
    const artisan = await Artisan.findByPk(req.params.id);

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan introuvable.' });
    }

    await sendContact(artisan, req.body);
    return res.status(202).json({
      message: 'Votre demande a bien été prise en compte.'
    });
  } catch (error) {
    return next(error);
  }
}
