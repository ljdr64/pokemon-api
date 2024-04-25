const axios = require('axios');

async function importPokemonData() {
  try {
    for (let id = 906; id <= 1025; id++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const speciesData = response.data;

      // Obtener la URL de la cadena de evolución
      const evolutionChainUrl = speciesData.evolution_chain.url;

      // Segunda solicitud para obtener la cadena de evolución
      const evolutionResponse = await axios.get(evolutionChainUrl);
      const evolutionData = evolutionResponse.data;

      const evolution_chain = {
        base_evolution: evolutionData.chain.species.name || null,
        first_evolution:
          evolutionData.chain.evolves_to[0]?.species.name || null,
        second_evolution:
          evolutionData.chain.evolves_to[0]?.evolves_to[0]?.species.name ||
          null,
      };

      // Procesar los datos
      const speciesInfo = {
        name: speciesData.name,
        id: speciesData.id,
        color: speciesData.color.name,
        base_happiness: speciesData.base_happiness,
        capture_rate: speciesData.capture_rate,
        habitat: speciesData.habitat ? speciesData.habitat.name : null,
        evolution_chain: evolution_chain,
        generation: speciesData.generation.name,
        is_baby: speciesData.is_baby,
        growth_rate: speciesData.growth_rate.name,
        shape: speciesData.shape ? speciesData.shape.name : null,
        egg_groups: speciesData.egg_groups.map((group) => group.name), // Añadir grupos de huevos
      };

      // Mostrar los datos importados en la consola
      console.log('Datos importados de Pokemon-Species:', speciesInfo);

      // Enviar los datos a tu API
      const apiResponse = await axios.post(
        'http://localhost:3000/api/v1/pokemon-species',
        speciesInfo
      );

      // Procesar y guardar los datos del Pokémon en tu base de datos local
      console.log(
        `Pokemon-Species importado exitosamente: ${speciesInfo.name}`,
        apiResponse.data
      );
    }
  } catch (error) {
    console.error('Error al importar Pokemon-Species:', error.message);
  }
}

importPokemonData();
// Para importar desde la consola, ejecuta el siguiente comando
// desde el directorio raíz del proyecto:
// node api/scripts/pokemon_species-1-1025.import.js
