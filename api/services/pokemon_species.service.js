const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class PokemonSpeciesService {
  constructor() {}

  async create(data) {
    const newPokemonSpecies = await models.PokemonSpecies.create(data);
    return newPokemonSpecies;
  }

  async find(query) {
    const options = {};
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    options.order = [['id', 'ASC']];

    const result = await models.PokemonSpecies.findAndCountAll(options);
    const pokemonSpeciesList = result.rows;
    const totalPokemonSpecies = result.count;

    return { pokemonSpeciesList, total: totalPokemonSpecies };
  }

  async findOne(id) {
    const pokemonSpecies = await models.PokemonSpecies.findByPk(id);
    if (!pokemonSpecies) {
      throw boom.notFound('Pokemon-species not found');
    }
    return pokemonSpecies;
  }

  async update(id, changes) {
    const pokemonSpecies = await this.findOne(id);
    const rta = await pokemonSpecies.update(changes);
    return rta;
  }

  async delete(id) {
    const pokemonSpecies = await this.findOne(id);
    await pokemonSpecies.destroy();
    return { id };
  }
}

module.exports = PokemonSpeciesService;
