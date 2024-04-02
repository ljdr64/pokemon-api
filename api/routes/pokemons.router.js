const express = require('express');

const PokemonService = require('../services/pokemon.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createPokemonSchema,
  updatePokemonSchema,
  getPokemonSchema,
} = require('../schemas/pokemon.schema');

const router = express.Router();
const service = new PokemonService();

router.get('/', async (req, res, next) => {
  try {
    const pokemons = await service.find();
    res.json(pokemons);
  } catch (error) {
    next(error);
  }
});

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