const axios = require('axios');

const BASE_URL_1 = 'https://pokeapi.co/api/v2/pokemon-species/';
const BASE_URL_2 = 'http://localhost:3000/api/v1/pokemon-species/';
const MAX_ID = 1025;
const CONCURRENCY_LIMIT = 10; // Número máximo de solicitudes concurrentes

async function fetchAndUpdatePokemon(id) {
  try {
    // Obtener datos de la especie
    const response = await axios.get(`${BASE_URL_1}${id}`);
    const speciesData = response.data;
    console.log(
      `Pokémon-Species name: ${speciesData.name}, id:${speciesData.id}`
    );

    const getId = (url) => {
      if (url === null || url === undefined) {
        return null;
      }
      const lastSlashIndex = url.slice(0, -1).lastIndexOf('/');
      const idString = url.slice(lastSlashIndex + 1, -1);
      return idString;
    };

    if (speciesData.evolves_from_species) {
      const evolutionChainUrl = speciesData.evolution_chain.url;
      const evolutionResponse = await axios.get(evolutionChainUrl);
      const evolutionData = evolutionResponse.data;
      const evolution_chain = [];

      // Pokemon first_evolution
      if (
        speciesData.evolves_from_species.name ===
        evolutionData.chain.species.name
      ) {
        const evoSecond = evolutionData.chain.evolves_to.filter(
          (item) => item.species.name === speciesData.name
        );

        if (evoSecond[0].evolves_to.length > 1) {
          evoSecond[0].evolves_to.map((itemEvo) => {
            evolution_chain.push({
              base_evolution: {
                id: parseInt(getId(speciesData.evolves_from_species.url), 10),
                name: speciesData.evolves_from_species.name,
              },
              first_evolution: {
                id: speciesData.id,
                name: speciesData.name,
              },
              second_evolution: {
                id: parseInt(getId(itemEvo.species.url), 10),
                name: itemEvo.species.name,
              },
            });
          });

          const speciesInfo = {
            name: speciesData.name,
            evolution_chain: evolution_chain, // Asegurar que sea un array
          };

          // Actualizar datos de la especie
          // URL Pokemon first_evolution :id
          const apiResponse = await axios.patch(
            `${BASE_URL_2}${id}`,
            speciesInfo
          );

          console.log(
            `Pokémon-Species importado exitosamente: ${speciesInfo.name}`,
            apiResponse.data
          );
        }
      }
    }
  } catch (error) {
    console.error(
      `Error al importar Pokémon-Species con ID ${id}:`,
      error.message
    );
  }
}

const importPokemonSpecies = async () => {
  const pLimit = await import('p-limit'); // Importación dinámica para ESM
  const limit = pLimit.default(CONCURRENCY_LIMIT); // Asegurar acceso a 'default'

  const promises = []; // Array para almacenar las promesas

  for (let id = 1; id <= MAX_ID; id++) {
    // Limitación de la concurrencia usando 'limit'
    promises.push(limit(() => fetchAndUpdatePokemon(id)));
  }

  // Esperar a que todas las promesas se completen
  await Promise.all(promises);

  console.log('Importación de Pokémon-Species completada');
};

importPokemonSpecies();
// Para importar desde la consola, ejecuta el siguiente comando
// desde el directorio raíz del proyecto:
// node api/scripts/pokemon_species.update_3_3_2.js
