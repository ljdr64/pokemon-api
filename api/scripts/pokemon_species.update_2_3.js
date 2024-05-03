const axios = require('axios');

async function importPokemonData() {
  try {
    for (let id = 1019; id <= 1019; id++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const speciesData = response.data;
      console.log(speciesData.name, speciesData.id);

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
      let evolution_chain_second = {
        base_evolution: { id: null, name: null },
        first_evolution: { id: null, name: null },
        second_evolution: { id: null, name: null },
      };

      if (!(speciesData.evolves_from_species === null)) {
        const evolutionChainUrl = speciesData.evolution_chain.url;
        const evolutionResponse = await axios.get(evolutionChainUrl);
        const evolutionData = evolutionResponse.data;

        if (
          !(
            speciesData.evolves_from_species.name ===
            evolutionData.chain.species.name
          )
        ) {
          const firstEvoIndex = evolutionData.chain.evolves_to.findIndex(
            (item) =>
              item.species.name === speciesData.evolves_from_species.name
          );
          const baseId = parseInt(getId(evolutionData.chain.species.url), 10);

          evolution_chain_base = {
            base_evolution: {
              id: baseId,
              name: evolutionData.chain.species.name,
            },
            first_evolution: {
              id: parseInt(
                getId(evolutionData.chain.evolves_to[0].species.url),
                10
              ),
              name: evolutionData.chain.evolves_to[0].species.name,
            },
            second_evolution: {
              id:
                parseInt(
                  getId(
                    evolutionData.chain.evolves_to[0].evolves_to[0]?.species.url
                  ),
                  10
                ) || null,
              name:
                evolutionData.chain.evolves_to[0].evolves_to[0]?.species.name ||
                null,
            },
          };
          if (evolution_chain_base.second_evolution.name === null)
            evolution_chain_base.second_evolution = null;

          evolution_chain_first = {
            base_evolution: {
              id: baseId,
              name: evolutionData.chain.species.name,
            },
            first_evolution: {
              id: parseInt(getId(speciesData.evolves_from_species.url), 10),
              name: speciesData.evolves_from_species.name,
            },
            second_evolution: {
              id: parseInt(
                getId(
                  evolutionData.chain.evolves_to[firstEvoIndex].evolves_to[0]
                    .species.url
                ),
                10
              ),
              name: evolutionData.chain.evolves_to[firstEvoIndex].evolves_to[0]
                .species.name,
            },
          };

          evolution_chain_second = {
            base_evolution: {
              id: baseId,
              name: evolutionData.chain.species.name,
            },
            first_evolution: {
              id: parseInt(getId(speciesData.evolves_from_species.url), 10),
              name: speciesData.evolves_from_species.name,
            },
            second_evolution: {
              id: speciesData.id,
              name: speciesData.name,
            },
          };

          const speciesBaseInfo = {
            name: evolutionData.chain.species.name,
            evolution_chain: evolution_chain_base,
          };

          const speciesFirstInfo = {
            name: speciesData.evolves_from_species.name,
            evolution_chain: evolution_chain_first,
          };

          const speciesSecondInfo = {
            name: speciesData.name,
            evolution_chain: evolution_chain_second,
          };

          console.log(speciesBaseInfo, speciesFirstInfo, speciesSecondInfo);

          const apiResponseBase = await axios.patch(
            `http://localhost:3000/api/v1/pokemon-species/${baseId}`,
            speciesBaseInfo
          );

          const apiResponseFirst = await axios.patch(
            `http://localhost:3000/api/v1/pokemon-species/${parseInt(
              getId(speciesData.evolves_from_species.url)
            )}`,
            speciesFirstInfo
          );

          const apiResponseSecond = await axios.patch(
            `http://localhost:3000/api/v1/pokemon-species/${id}`,
            speciesSecondInfo
          );

          console.log(
            `Pokemon-Species importado exitosamente: ${speciesData.name}`,
            apiResponseBase.data,
            apiResponseFirst.data,
            apiResponseSecond.data
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
// node api/scripts/pokemon_species.update_2_3.js
