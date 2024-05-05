const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/v1/pokemon-species/';
const MAX_ID = 1025;
const CONCURRENCY_LIMIT = 10; // Número máximo de solicitudes concurrentes

async function fetchAndUpdatePokemon(id) {
  try {
    // Obtener datos de la especie
    const response = await axios.get(`${BASE_URL}${id}`);
    const speciesData = response.data;

    const speciesInfo = {
      name: speciesData.name,
      evolution_chain: [speciesData.evolution_chain], // Asegurar que sea un array
    };

    // Actualizar datos de la especie
    const apiResponse = await axios.patch(`${BASE_URL}${id}`, speciesInfo);

    console.log(
      `Pokémon-Species importado exitosamente: ${speciesInfo.name}`,
      apiResponse.data
    );
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
// node api/scripts/pokemon_species.update_3.js
