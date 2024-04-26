const Joi = require('joi');

const abilities = Joi.array();
const base_experience = Joi.number().integer();
const height = Joi.number().integer();
const held_items = Joi.array();
const id = Joi.number().integer();
const idOrName = Joi.alternatives().try(Joi.number().integer(), Joi.string());
const name = Joi.string();
const order = Joi.number().integer();
const sprites = Joi.object({
  back_default: Joi.string().allow(null),
  front_default: Joi.string().allow(null),
  dream_world: Joi.string().allow(null),
  home: Joi.string().allow(null),
  official_artwork: Joi.string().allow(null),
});
const stats = Joi.object();
const types = Joi.array();
const weight = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createPokemonSchema = Joi.object({
  abilities: abilities.required(),
  base_experience: base_experience.required(),
  height: height.required(),
  held_items: held_items.required(),
  id: id.required(),
  name: name.required(),
  order: order.required(),
  sprites: sprites.required(),
  stats: stats.required(),
  types: types.required(),
  weight: weight.required(),
});

const updatePokemonSchema = Joi.object({
  name: name,
  abilities: abilities,
  base_experience: base_experience,
  height: height,
  held_items: held_items,
  order: order,
  sprites: sprites,
  stats: stats,
  types: types,
  weight: weight,
});

const getPokemonSchema = Joi.object({
  id: idOrName.required(),
});

const queryPokemonSchema = Joi.object({
  limit,
  offset,
});

module.exports = {
  createPokemonSchema,
  updatePokemonSchema,
  getPokemonSchema,
  queryPokemonSchema,
};
