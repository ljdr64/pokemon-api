const express = require('express');

const PokemonService = require('../services/pokemon.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPokemonSchema,
  updatePokemonSchema,
  getPokemonSchema,
  queryPokemonSchema,
} = require('../schemas/pokemon.schema');

const router = express.Router();
const service = new PokemonService();

router.get(
  '/',
  validatorHandler(queryPokemonSchema, 'query'),
  async (req, res, next) => {
    try {
      // Definir el límite de elementos por página
      const limit = parseInt(req.query.limit) || 20; // Por defecto, mostraremos 20 elementos por página

      // Calcular el offset basado en el número de página y el límite
      const offset = parseInt(req.query.offset) || 0; // Por defecto, el desplazamiento será 0 si no se proporciona

      const { pokemons, total: totalPokemons } = await service.find(req.query);

      // Ordenar los Pokémon por su ID numérica
      pokemons.sort((a, b) => a.id - b.id);

      // Obtener los Pokémon para la página solicitada
      const paginatedPokemons = pokemons.slice(0, 20);

      // Formatear los Pokémon para la respuesta
      const formattedPokemons = paginatedPokemons.map((pokemon) => ({
        name: pokemon.name,
        url: `${req.protocol}://${req.get('host')}/api/v1/pokemon/${
          pokemon.id
        }`,
      }));

      // Crear enlaces para la paginación
      let nextLink = null;
      let prevLink = null;

      if (offset > 0)
        prevLink = `${req.protocol}://${req.get('host')}${
          req.baseUrl
        }?offset=${Math.max(offset - limit, 0)}&limit=${limit}`;

      if (offset + limit < totalPokemons) {
        nextLink = `${req.protocol}://${req.get('host')}${req.baseUrl}?offset=${
          offset + limit
        }&limit=${limit}`;
      } else {
        nextLink = null;
      }

      // Enviar la respuesta con los resultados paginados y enlaces de paginación
      res.json({
        count: totalPokemons,
        next: nextLink,
        previous: prevLink,
        results: formattedPokemons,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getPokemonSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const pokemon = await service.findOne(id);
      res.json(pokemon);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createPokemonSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPokemon = await service.create(body);
      res.status(201).json(newPokemon);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorHandler(getPokemonSchema, 'params'),
  validatorHandler(updatePokemonSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const pokemon = await service.update(id, body);
      res.json(pokemon);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getPokemonSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
