const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class PokemonService {
  constructor() {}

  async create(data) {
    const newPokemon = await models.Pokemon.create(data);
    return newPokemon;
  }

  async find(query) {
    const options = {};
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    // Realizar la consulta para obtener los Pokémon paginados y el número total
    const result = await models.Pokemon.findAndCountAll(options);
    const pokemons = result.rows;
    const totalPokemons = result.count;

    // Devolver tanto los Pokémon como el número total
    return { pokemons, total: totalPokemons };
  }

  async findOne(id) {
    const pokemon = await models.Pokemon.findByPk(id);
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
