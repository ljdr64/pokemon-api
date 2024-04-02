const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class PokemonService {
  constructor() {}

  async create(data) {
    const newPokemon = await models.Pokemon.create(data);
    return newPokemon;
  }

  async find() {
    const pokemons = await models.Pokemon.findAll();
    return pokemons;
  }

  async findOne(idOrName) {
    let pokemon;
    if (Number.isInteger(idOrName)) {
      // Si el idOrName es un número, buscar por ID
      pokemon = await models.Pokemon.findByPk(idOrName);
    } else {
      // Si el idOrName es una cadena, buscar por nombre
      pokemon = await models.Pokemon.findOne({ where: { name: idOrName } });
    }

    if (!pokemon) {
      throw boom.notFound('Pokemon not found');
    }

    return pokemon;
  }

  async update(id, changes) {
    const pokemon = await this.findOne(id);
    const rta = await pokemon.update(changes);
    return rta;
  }

  async delete(id) {
    const pokemon = await this.findOne(id);
    await pokemon.destroy();
    return { id };
  }
}

module.exports = PokemonService;
