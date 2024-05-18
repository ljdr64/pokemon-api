const express = require('express');

const PokemonService = require('../services/pokemon.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  // createPokemonSchema,
  // updatePokemonSchema,
  getPokemonSchema,
  queryPokemonSchema,
} = require('../schemas/pokemon.schema');
const {
  formatPokemon,
  generatePaginationLinks,
} = require('../utils/pokemon/pokemon.utils');

const router = express.Router();
const service = new PokemonService();

router.get(
  '/',
  validatorHandler(queryPokemonSchema, 'query'),
  async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const offset = parseInt(req.query.offset) || 0;

      const { pokemonList, total: totalPokemon } = await service.find(
        req.query
      );

      console.log('pokeList: ', pokemonList, ', pokeTotal: ', totalPokemon);

      const sortedPokemonList = pokemonList.sort((a, b) => a.id - b.id);

      const paginatedPokemon = sortedPokemonList.slice(0, limit);

      const formattedPokemon = formatPokemon(req, paginatedPokemon, 'pokemon');

      const { prevLink, nextLink } = generatePaginationLinks(
        req,
        offset,
        limit,
        totalPokemon,
        'pokemon'
      );

      res.json({
        count: totalPokemon,
        next: nextLink,
        previous: prevLink,
        results: formattedPokemon,
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

// router.post(
//   '/',
//   validatorHandler(createPokemonSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const newPokemon = await service.create(body);
//       res.status(201).json(newPokemon);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.patch(
//   '/:id',
//   validatorHandler(getPokemonSchema, 'params'),
//   validatorHandler(updatePokemonSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const pokemon = await service.update(id, body);
//       res.json(pokemon);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete(
//   '/:id',
//   validatorHandler(getPokemonSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.delete(id);
//       res.status(201).json({ id });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
