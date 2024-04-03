const axios = require('axios');

async function importPokemonData() {
  try {
    for (let id = 3; id <= 151; id++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokemonData = response.data;
      // Procesar los datos
      const pokemon = {
        abilities: pokemonData.abilities.map((ability) => ({
          ability: ability.ability.name,
          is_hidden: ability.is_hidden,
          slot: ability.slot,
        })),
        base_experience: pokemonData.base_experience,
        height: pokemonData.height,
        held_items: pokemonData.held_items.map((item) => ({
          item: item.item.name,
        })),
        id: pokemonData.id,
        is_default: pokemonData.is_default,
        name: pokemonData.name,
        order: pokemonData.order,
        sprites: {
          back_default: pokemonData.sprites.back_default,
          front_default: pokemonData.sprites.front_default,
        },
        stats: pokemonData.stats.map((stat) => ({
          base_stat: stat.base_stat,
          effort: stat.effort,
          stat: stat.stat.name,
        })),
        types: pokemonData.types.map((type) => ({
          slot: type.slot,
          type: type.type.name,
        })),
        weight: pokemonData.weight,
      };

      // Mostrar los datos importados en la consola
      console.log('Datos importados de Ivysaur:', pokemon);

      // Enviar los datos a tu API
      const apiResponse = await axios.post(
        'http://localhost:3000/api/v1/pokemon',
        pokemon
      );

      // Procesar y guardar los datos del Pokémon en tu base de datos local
      console.log(
        `Pokemon importado exitosamente: ${pokemonData.name}`,
        apiResponse.data
      );
    }
  } catch (error) {
    console.error('Error al importar Pokémon:', error.message);
  }
}

importPokemonData();
// Para importar desde la consola, ejecuta el siguiente comando
// desde el directorio raíz del proyecto:
// node api/scripts/pokemon.import
