const { Pokemon, PokemonSchema } = require('./pokemon.model');
const {
  PokemonSpecies,
  PokemonSpeciesSchema,
} = require('./pokemon_species.model');

function setupModels(sequelize) {
  Pokemon.init(PokemonSchema, Pokemon.config(sequelize));
  PokemonSpecies.init(PokemonSpeciesSchema, PokemonSpecies.config(sequelize));
}

module.exports = setupModels;
