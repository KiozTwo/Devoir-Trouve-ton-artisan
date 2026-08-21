import { DataTypes, Sequelize } from 'sequelize';
import { config } from '../config.js';

const dialectOptions = config.db.ssl
  ? { ssl: { rejectUnauthorized: false } }
  : {};

export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    dialectOptions,
    logging: false,
    define: { timestamps: false }
  }
);

export const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(80), allowNull: false },
  slug: { type: DataTypes.STRING(90), allowNull: false }
}, { tableName: 'categories' });

export const Specialty = sequelize.define('Specialty', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  categoryId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'category_id'
  }
}, { tableName: 'specialties' });

export const City = sequelize.define('City', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(120), allowNull: false }
}, { tableName: 'cities' });

export const Artisan = sequelize.define('Artisan', {
  id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(150), allowNull: false },
  rating: { type: DataTypes.DECIMAL(2, 1), allowNull: false },
  about: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.STRING(254), allowNull: false },
  website: { type: DataTypes.STRING(255) },
  image: { type: DataTypes.STRING(255) },
  isTop: { type: DataTypes.BOOLEAN, field: 'is_top', defaultValue: false },
  specialtyId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'specialty_id'
  },
  cityId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    field: 'city_id'
  }
}, { tableName: 'artisans' });

Category.hasMany(Specialty, { foreignKey: 'categoryId', as: 'specialties' });
Specialty.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Specialty.hasMany(Artisan, { foreignKey: 'specialtyId', as: 'artisans' });
Artisan.belongsTo(Specialty, { foreignKey: 'specialtyId', as: 'specialty' });
City.hasMany(Artisan, { foreignKey: 'cityId', as: 'artisans' });
Artisan.belongsTo(City, { foreignKey: 'cityId', as: 'cityRecord' });

export const artisanInclude = [
  {
    model: Specialty,
    as: 'specialty',
    attributes: ['id', 'name'],
    include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }]
  },
  { model: City, as: 'cityRecord', attributes: ['id', 'name'] }
];
