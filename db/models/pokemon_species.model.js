const { Model, DataTypes } = require('sequelize');

const POKEMON_SPECIES_TABLE = 'pokemon_species';

const PokemonSpeciesSchema = {
  base_happiness: DataTypes.INTEGER,
  capture_rate: DataTypes.INTEGER,
  color: DataTypes.STRING,
  egg_groups: DataTypes.JSON,
  evolution_chain: DataTypes.JSON,
  generation: DataTypes.STRING,
  growth_rate: DataTypes.STRING,
  habitat: DataTypes.STRING,
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  is_baby: DataTypes.BOOLEAN,
  name: DataTypes.STRING,
  shape: DataTypes.STRING,
};

class PokemonSpecies extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: POKEMON_SPECIES_TABLE,
      modelName: 'PokemonSpecies',
      timestamps: false,
    };
  }
}

module.exports = {
  POKEMON_SPECIES_TABLE,
  PokemonSpeciesSchema,
  PokemonSpecies,
};
