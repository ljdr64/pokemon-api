const { Client } = require('pg');

async function getConnection() {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
  await client.connect();
  return client;
}

module.exports = getConnection;
