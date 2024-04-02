const Joi = require('joi');

const abilities = Joi.array()
  .items(
    Joi.object({
      ability: Joi.string().required(),
      is_hidden: Joi.boolean().required(),
      slot: Joi.number().integer().required(),
    })
  )
  .required();
const base_experience = Joi.number().integer().required();
const height = Joi.number().integer().required();
const held_items = Joi.array()
  .items(Joi.object({ item: Joi.string() }))
  .required();
const id = Joi.number().integer().required();
const is_default = Joi.boolean().required();
const name = Joi.string().required();
const order = Joi.number().integer().required();
const sprites = Joi.object({
  back_default: Joi.string(),
  front_default: Joi.string(),
}).required();
const stats = Joi.array()
  .items(
    Joi.object({
      base_stat: Joi.number().integer(),
      effort: Joi.number().integer(),
      stat: Joi.string(),
    })
  )
  .required();
const types = Joi.array()
  .items(
    Joi.object({
      slot: Joi.number().integer(),
      type: Joi.string(),
    })
  )
  .required();
const weight = Joi.number().integer().required();

const abilitySchema = Joi.object({
  ability: Joi.string(),
  is_hidden: Joi.boolean(),
  slot: Joi.number().integer(),
}).required();

const typeSchema = Joi.object({
  slot: Joi.number().integer(),
  type: Joi.string(),
}).required();

const statSchema = Joi.object({
  base_stat: Joi.number().integer(),
  effort: Joi.number().integer(),
  stat: Joi.string(),
}).required();

const createPokemonSchema = Joi.object({
  abilities: Joi.array().items(abilitySchema).required(),
  base_experience: Joi.number().integer().required(),
  height: Joi.number().integer().required(),
  held_items: Joi.array()
    .items(Joi.object({ item: Joi.string() }))
    .required(),
  id: Joi.number().integer().required(),
  is_default: Joi.boolean().required(),
  name: Joi.string().required(),
  order: Joi.number().integer().required(),
  sprites: Joi.object({
    back_default: Joi.string().required(),
    front_default: Joi.string().required(),
  }).required(),
  stats: Joi.array().items(statSchema).required(),
  types: Joi.array().items(typeSchema).required(),
  weight: Joi.number().integer().required(),
});

const updatePokemonSchema = Joi.object({
  id: id,
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
})
  .or('id', 'name')
  .required();

const getPokemonSchema = Joi.object({
  id: id,
  name: name,
})
  .or('id', 'name')
  .required();

module.exports = {
  createPokemonSchema,
  updatePokemonSchema,
  getPokemonSchema,
};
