const { config } = require('./../config/config');

module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    ...(config.isProd && {
      dialectOptions: {
        ssl: {
          rejectUnauthorized: true,
          ca: config.dbCACert,
        },
      },
    }),
  },
};
