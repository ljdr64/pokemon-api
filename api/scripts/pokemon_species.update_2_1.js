const axios = require('axios');

async function importPokemonData() {
  try {
    for (let id = 1; id <= 1025; id++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const speciesData = response.data;

      const getId = (url) => {
        if (url === null || url === undefined) {
          return null;
        }
        const lastSlashIndex = url.slice(0, -1).lastIndexOf('/');
        const idString = url.slice(lastSlashIndex + 1, -1);
        return idString;
      };

      const isArrayEmpty = (arr) => {
        return Array.isArray(arr) && arr.length === 0;
      };

      // Crear estructura de evolución por defecto
      let evolution_chain = {
        base_evolution: { id: null, name: null },
        first_evolution: { id: null, name: null },
        second_evolution: { id: null, name: null },
      };

      if (speciesData.evolves_from_species === null) {
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionResponse = await axios.get(evolutionChainUrl);
        const evolutionData = evolutionResponse.data;

        if (isArrayEmpty(evolutionData.chain.evolves_to)) {
          evolution_chain = {
            base_evolution: { id: speciesData.id, name: speciesData.name },
            first_evolution: null,
            second_evolution: null,
          };

          const speciesInfo = {
            name: speciesData.name,
            evolution_chain: evolution_chain,
          };

          const apiResponse = await axios.patch(
            `http://localhost:3000/api/v1/pokemon-species/${id}`,
            speciesInfo
          );

          console.log(
            `Pokemon-Species importado exitosamente: ${speciesInfo.name}`,
            apiResponse.data
          );
        }
      }
    }
  } catch (error) {
    console.error('Error al importar Pokemon-Species:', error.message);
  }
}

importPokemonData();
// Para importar desde la consola, ejecuta el siguiente comando
// desde el directorio raíz del proyecto:
// node api/scripts/pokemon_species.update_2_1.js
