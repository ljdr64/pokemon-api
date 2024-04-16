const { Pool } = require('pg');

const { config } = require('./../../config/config');

let URI = config.dbUrl;

const poolOptions = {
  connectionString: URI,
};

// Agregar la configuración SSL solo si estamos en un entorno de producción
if (config.isProd) {
  poolOptions.ssl = {
    rejectUnauthorized: true, // Requiere SSL
    ca: config.dbCACert, // Utiliza el certificado SSL personalizado
  };
}

const pool = new Pool(poolOptions);

module.exports = pool;
