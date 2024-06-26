const { Model, DataTypes } = require('sequelize');

const POKEMON_TABLE = 'pokemons';

const PokemonSchema = {
  abilities: DataTypes.JSON,
  base_experience: DataTypes.INTEGER,
  height: DataTypes.INTEGER,
  held_items: DataTypes.JSON,
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  name: DataTypes.STRING,
  order: DataTypes.INTEGER,
  sprites: DataTypes.JSON,
  stats: DataTypes.JSON,
  types: DataTypes.JSON,
  weight: DataTypes.INTEGER,
};

class Pokemon extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: POKEMON_TABLE,
      modelName: 'Pokemon',
      timestamps: false,
    };
  }
}

module.exports = { POKEMON_TABLE, PokemonSchema, Pokemon };
