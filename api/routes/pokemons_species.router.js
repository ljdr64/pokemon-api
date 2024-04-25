const express = require('express');

const PokemonSpeciesService = require('../services/pokemon_species.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  // createPokemonSpeciesSchema,
  // updatePokemonSpeciesSchema,
  getPokemonSpeciesSchema,
  queryPokemonSpeciesSchema,
} = require('../schemas/pokemon.schema');

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

      pokemonSpeciesList.sort((a, b) => a.id - b.id);

      const paginatedPokemonSpecies = pokemonSpeciesList.slice(0, 20);

      const formattedPokemonSpecies = paginatedPokemonSpecies.map(
        (pokemonSpecies) => ({
          name: pokemonSpecies.name,
          url: `${req.protocol}://${req.get('host')}/api/v1/pokemon-species/${
            pokemonSpecies.id
          }`,
        })
      );

      let nextLink = null;
      let prevLink = null;

      if (offset > 0) {
        prevLink = `${req.protocol}://${req.get(
          'host'
        )}/api/v1/pokemon-species?offset=${Math.max(
          offset - limit,
          0
        )}&limit=${limit}`;
      }

      if (offset + limit < totalPokemonSpecies) {
        nextLink = `${req.protocol}://${req.get(
          'host'
        )}/api/v1/pokemon-species?offset=${offset + limit}&limit=${limit}`;
      } else {
        nextLink = null;
      }

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
