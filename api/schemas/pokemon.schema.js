const Joi = require('joi');

const abilities = Joi.array().items(Joi.object());
const base_experience = Joi.number().integer();
const height = Joi.number().integer();
const held_items = Joi.array().items(Joi.object());
const id = Joi.number().integer();
const is_default = Joi.boolean();
const name = Joi.string();
const order = Joi.number().integer();
const sprites = Joi.object({
  back_default: Joi.string(),
  front_default: Joi.string(),
});
const stats = Joi.array().items(Joi.object());
const types = Joi.array().items(Joi.object());
const weight = Joi.number().integer();

const createPokemonSchema = Joi.object({
  abilities: abilities.required(),
  base_experience: base_experience.required(),
  height: height.required(),
  held_items: held_items.required(),
  id: id.required(),
  is_default: is_default.required(),
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
  is_default: is_default,
  order: order,
  sprites: sprites,
  stats: stats,
  types: types,
  weight: weight,
});

const getPokemonSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPokemonSchema,
  updatePokemonSchema,
  getPokemonSchema,
};
