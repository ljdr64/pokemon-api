const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().required();
const color = Joi.string();
const base_happiness = Joi.number().integer().allow(null);
const capture_rate = Joi.number().integer();
const habitat = Joi.string().allow(null);
const evolutionObject = Joi.object({
  base_evolution: Joi.object().allow(null),
  first_evolution: Joi.object().allow(null),
  second_evolution: Joi.object().allow(null),
});
const evolution_chain = Joi.array().items(evolutionObject);
const generation = Joi.string();
const is_baby = Joi.boolean();
const growth_rate = Joi.string();
const shape = Joi.string().allow(null);
const egg_groups = Joi.array();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createPokemonSpeciesSchema = Joi.object({
  id: id.required(),
  name: name.required(),
  color: color.required(),
  base_happiness: base_happiness.required(),
  capture_rate: capture_rate.required(),
  habitat: habitat.required(),
  evolution_chain: evolution_chain.required(),
  generation: generation.required(),
  is_baby: is_baby.required(),
  growth_rate: growth_rate.required(),
  shape: shape.required(),
  egg_groups: egg_groups.required(),
});

const updatePokemonSpeciesSchema = Joi.object({
  name: name,
  color: color,
  base_happiness: base_happiness,
  capture_rate: capture_rate,
  habitat: habitat,
  evolution_chain: evolution_chain,
  generation: generation,
  is_baby: is_baby,
  growth_rate: growth_rate,
  shape: shape,
  egg_groups: egg_groups,
});

const getPokemonSpeciesSchema = Joi.object({
  id: id.required(),
});

const queryPokemonSpeciesSchema = Joi.object({
  limit,
  offset,
});

module.exports = {
  createPokemonSpeciesSchema,
  updatePokemonSpeciesSchema,
  getPokemonSpeciesSchema,
  queryPokemonSpeciesSchema,
};
