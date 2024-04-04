const fs = require('fs');
const axios = require('axios');
const path = require('path');

async function importPokemonImages() {
  try {
    for (let id = 1; id <= 151; id++) {
      const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      // Obtener el nombre del archivo de imagen
      const imageName = `${id}.png`;

      // Descargar la imagen desde la URL
      const imageResponse = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });

      // Guardar la imagen localmente
      const imagePath = path.join(__dirname, `images-artwork/${imageName}`);
      fs.writeFileSync(imagePath, imageResponse.data);

      console.log(
        `Imagen del Pokemon #${id} descargada y guardada como ${imageName}.`
      );
    }
  } catch (error) {
    console.error('Error al importar imágenes de Pokémon:', error.message);
  }
}

importPokemonImages();
