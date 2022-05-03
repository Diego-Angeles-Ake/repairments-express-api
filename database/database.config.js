const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './.env' });

const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  storage: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: false,
});

module.exports = {
  sequelize,
};
