const { Model, DataTypes } = require('sequelize');

const POKEMON_TABLE = 'pokemons';

const PokemonSchema = {
  abilities: DataTypes.JSON,
  base_experience: DataTypes.INTEGER,
  height: DataTypes.INTEGER,
  held_items: DataTypes.JSON,
  id: DataTypes.INTEGER,
  is_default: {
    type: DataTypes.BOOLEAN,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  order: DataTypes.INTEGER,
  sprites: DataTypes.JSON,
  stats: DataTypes.JSON,
  types: DataTypes.JSON,
  weight: DataTypes.INTEGER,
};

class Pokemon extends Model {
  static associate(models) {
    this.hasMany(models.Product, {
      as: 'products',
      foreignKey: 'pokemonId',
    });
  }

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
