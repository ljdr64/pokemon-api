const axios = require('axios');

async function importPokemonData() {
  try {
    for (let id = 842; id <= 842; id++) {
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
      let evolution_chain_base = {
        base_evolution: { id: null, name: null },
        first_evolution: { id: null, name: null },
        second_evolution: { id: null, name: null },
      };

      let evolution_chain_first = {
        base_evolution: { id: null, name: null },
        first_evolution: { id: null, name: null },
        second_evolution: { id: null, name: null },
      };

      if (!(speciesData.evolves_from_species === null)) {
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionResponse = await axios.get(evolutionChainUrl);
        const evolutionData = evolutionResponse.data;

        const areAllEvolvesToEmpty = evolutionData.chain.evolves_to.every(
          (item) => isArrayEmpty(item.evolves_to)
        );

        if (
          speciesData.evolves_from_species.name ===
            evolutionData.chain.species.name &&
          areAllEvolvesToEmpty
        ) {
          console.log(speciesData.name);

          const baseId = parseInt(getId(evolutionData.chain.species.url), 10);

          evolution_chain_base = {
            base_evolution: {
              id: baseId,
              name: evolutionData.chain.species.name,
            },
            first_evolution: {
              id: parseInt(
                getId(evolutionData.chain.evolves_to[0]?.species.url),
                10
              ),
              name: evolutionData.chain.evolves_to[0]?.species.name,
            },
            second_evolution: null,
          };

          evolution_chain_first = {
            base_evolution: {
              id: baseId,
              name: speciesData.evolves_from_species.name,
            },
            first_evolution: {
              id: speciesData.id,
              name: speciesData.name,
            },
            second_evolution: null,
          };

          const speciesBaseInfo = {
            name: speciesData.evolves_from_species.name,
            evolution_chain: evolution_chain_base,
          };

          const speciesFirstInfo = {
            name: speciesData.name,
            evolution_chain: evolution_chain_first,
          };

          const apiResponseBase = await axios.patch(
            `http://localhost:3000/api/v1/pokemon-species/${baseId}`,
            speciesBaseInfo
          );

          const apiResponseFirst = await axios.patch(
            `http://localhost:3000/api/v1/pokemon-species/${id}`,
            speciesFirstInfo
          );

          console.log(
            `Pokemon-Species importado exitosamente: ${speciesData.name}`,
            apiResponseBase.data,
            apiResponseFirst.data
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
// node api/scripts/pokemon_species.update_2_2.js
