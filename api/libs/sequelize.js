const { Sequelize } = require('sequelize');
const pg = require('pg');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const sequelize = new Sequelize(config.dbUrl, {
  dialect: 'postgres',
  logging: console.log,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true, // Requiere SSL
      ca: config.dbCACert, // Utiliza el certificado SSL personalizado
    },
  },
  dialectModule: pg,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
