const { Sequelize } = require('sequelize');
const pg = require('pg');

const { config } = require('./../../config/config');
const setupModels = require('./../../db/models');

const sequelizeOptions = {
  dialect: 'postgres',
  logging: console.log,
  dialectModule: pg,
};

// Agregar la configuración SSL solo si estamos en un entorno de producción
if (config.isProd) {
  sequelizeOptions.dialectOptions = {
    ssl: {
      rejectUnauthorized: true, // Requiere SSL
      ca: config.dbCACert, // Utiliza el certificado SSL personalizado
    },
  };
}

const sequelize = new Sequelize(config.dbUrl, sequelizeOptions);

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
