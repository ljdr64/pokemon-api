const express = require('express');
const path = require('path');

const pokemonsRouter = require('./pokemons.router');

function routerApi(app) {
  const router = express.Router();
  // Ruta para la página "About"
  app.get('/api/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'about.html'));
  });

  // Ruta para la documentación API
  app.get('/api/docs', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'docs.html'));
  });

  // Montar el enrutador de pokemons
  app.use('/api/v1', router);
  router.use('/pokemon', pokemonsRouter);
}

module.exports = routerApi;
