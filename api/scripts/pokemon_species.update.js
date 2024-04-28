const axios = require('axios');

async function updatePokemonData() {
  try {
    for (let id = 1; id <= 1025; id++) {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      const speciesData = response.data;

      // Obtener la URL de la cadena de evolución
      const evolutionChainUrl = speciesData.evolution_chain.url;

      // Segunda solicitud para obtener la cadena de evolución
      const evolutionResponse = await axios.get(evolutionChainUrl);
      const evolutionData = evolutionResponse.data;

      const getId = (url) => {
        if (url === null || url === undefined) {
          return null;
        }
        const lastSlashIndex = url.slice(0, -1).lastIndexOf('/');
        const idString = url.slice(lastSlashIndex + 1, -1);
        return idString;
      };

      const evolution_chain = {
        base_evolution: {
          id: parseInt(getId(evolutionData.chain.species.url), 10) || null, // Extrae el ID
          name: evolutionData.chain.species.name || null,
        },
        first_evolution: {
          id: parseInt(
            getId(evolutionData.chain.evolves_to[0]?.species.url) || null,
            10
          ),
          name: evolutionData.chain.evolves_to[0]?.species.name || null,
        },
        second_evolution: {
          id: parseInt(
            getId(
              evolutionData.chain.evolves_to[0]?.evolves_to[0]?.species.url
            ) || null,
            10
          ),
          name:
            evolutionData.chain.evolves_to[0]?.evolves_to[0]?.species.name ||
            null,
        },
      };

      const setNullIfNameIsNull = (evolution) =>
        evolution.name === null ? null : evolution; // Si el nombre es null, todo el objeto es null

      // Aplica la función de flecha a cada propiedad en evolution_chain
      const cleaned_evolution_chain = {
        base_evolution: setNullIfNameIsNull(evolution_chain.base_evolution),
        first_evolution: setNullIfNameIsNull(evolution_chain.first_evolution),
        second_evolution: setNullIfNameIsNull(evolution_chain.second_evolution),
      };

      // Procesar los datos
      const speciesInfo = {
        name: speciesData.name,
        evolution_chain: cleaned_evolution_chain,
      };

      // Mostrar los datos importados en la consola
      console.log(
        'Datos importados de Pokemon-Species:',
        cleaned_evolution_chain
      );

      // Enviar los datos a tu API
      const apiResponse = await axios.patch(
        `http://localhost:3000/api/v1/pokemon-species/${id}`,
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

updatePokemonData();
// Para importar desde la consola, ejecuta el siguiente comando
// desde el directorio raíz del proyecto:
// node api/scripts/pokemon_species-1-1025.update.js
