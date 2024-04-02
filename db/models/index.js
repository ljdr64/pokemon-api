const { Pokemon, PokemonSchema } = require('./pokemon.model');

function setupModels(sequelize) {
  Pokemon.init(PokemonSchema, Pokemon.config(sequelize));
}

module.exports = setupModels;
