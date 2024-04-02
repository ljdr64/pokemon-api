const { Sequelize } = require('sequelize');
const pg = require('pg');

const { config } = require('./../../config/config');
const setupModels = require('./../../db/models');

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: console.log,
  dialectModule: pg,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
