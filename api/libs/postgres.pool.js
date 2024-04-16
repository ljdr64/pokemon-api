const { Pool } = require('pg');

const { config } = require('./../../config/config');

let URI = config.dbUrl;

const pool = new Pool({
  connectionString: URI,
  ssl: {
    rejectUnauthorized: true, // Requiere SSL
    ca: config.dbCACert, // Utiliza el certificado SSL personalizado
  },
});

module.exports = pool;
