const express = require('express');

const PokemonSpeciesService = require('../services/pokemon_species.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  // createPokemonSpeciesSchema,
  // updatePokemonSpeciesSchema,
  getPokemonSpeciesSchema,
  queryPokemonSpeciesSchema,
} = require('../schemas/pokemon_species.schema');
const {
  formatPokemon,
  generatePaginationLinks,
} = require('../utils/pokemon/pokemon.utils');

const router = express.Router();
const service = new PokemonSpeciesService();

router.get(
  '/',
  validatorHandler(queryPokemonSpeciesSchema, 'query'),
  async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 20;
      const offset = parseInt(req.query.offset) || 0;

      const { pokemonSpeciesList, total: totalPokemonSpecies } =
        await service.find(req.query);

      const sortedPokemonSpeciesList = pokemonSpeciesList.sort(
        (a, b) => a.id - b.id
      );

      const paginatedPokemonSpecies = sortedPokemonSpeciesList.slice(0, limit);

      const formattedPokemonSpecies = formatPokemon(
        req,
        paginatedPokemonSpecies,
        'pokemon-species'
      );

      const { prevLink, nextLink } = generatePaginationLinks(
        req,
        offset,
        limit,
        totalPokemonSpecies,
        'pokemon-species'
      );

      res.json({
        count: totalPokemonSpecies,
        next: nextLink,
        previous: prevLink,
        results: formattedPokemonSpecies,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  validatorHandler(getPokemonSpeciesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const pokemonSpecies = await service.findOne(id);
      res.json(pokemonSpecies);
    } catch (error) {
      next(error);
    }
  }
);

// router.post(
//   '/',
//   validatorHandler(createPokemonSpeciesSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const newPokemonSpecies = await service.create(body);
//       res.status(201).json(newPokemonSpecies);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.patch(
//   '/:id',
//   validatorHandler(getPokemonSpeciesSchema, 'params'),
//   validatorHandler(updatePokemonSpeciesSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const pokemonSpecies = await service.update(id, body);
//       res.json(pokemonSpecies);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.delete(
//   '/:id',
//   validatorHandler(getPokemonSpeciesSchema, 'params'),
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
