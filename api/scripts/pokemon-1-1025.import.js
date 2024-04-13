const axios = require('axios');

async function importPokemonData() {
  try {
    for (let id = 1; id <= 1025; id++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const pokemonData = response.data;
      // Procesar los datos
      const pokemon = {
        abilities: pokemonData.abilities.map((ability) => ability.ability.name),
        base_experience: pokemonData.base_experience,
        height: pokemonData.height,
        held_items: pokemonData.held_items.map((item) => item.item.name),
        id: pokemonData.id,
        name: pokemonData.name,
        order: pokemonData.order,
        sprites: {
          back_default: pokemonData.sprites.back_default,
          front_default: pokemonData.sprites.front_default,
          dream_world: pokemonData.sprites.other.dream_world.front_default,
          home: pokemonData.sprites.other.home.front_default,
          official_artwork:
            pokemonData.sprites.other['official-artwork'].front_default,
        },
        stats: Object.fromEntries(
          pokemonData.stats.map((stat) => [stat.stat.name, stat.base_stat])
        ),
        types: pokemonData.types.map((type) => type.type.name),
        weight: pokemonData.weight,
      };

      // Mostrar los datos importados en la consola
      console.log('Datos importados de Pokemon:', pokemon);

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
    console.error('Error al importar Pokemon:', error.message);
  }
}

importPokemonData();
// Para importar desde la consola, ejecuta el siguiente comando
// desde el directorio raíz del proyecto:
// node api/scripts/pokemon.import
