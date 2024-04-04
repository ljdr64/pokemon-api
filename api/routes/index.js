const express = require('express');

const pokemonsRouter = require('./pokemons.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/pokemon', pokemonsRouter);
}

module.exports = routerApi;
