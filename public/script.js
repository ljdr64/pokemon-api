document.addEventListener(
  'DOMContentLoaded',
  function () {
    // JSON de ejemplo
    const jsonData1 = {
      abilities: ['static', 'lightning-rod'],
      base_experience: 112,
      height: 4,
      held_items: ['oran-berry', 'light-ball'],
      id: 25,
      name: 'pikachu',
      order: 35,
      sprites: {
        back_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        dream_world:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
        home: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png',
        official_artwork:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      },
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        'special-attack': 50,
        'special-defense': 50,
        speed: 90,
      },
      types: ['electric'],
      weight: 60,
    };

    const jsonError = {
      error: 'No se encontró ningún Pokémon con el ID especificado.',
    };

    const jsonGet = {
      abilities: ['ability'],
      base_experience: 0,
      height: 0,
      held_items: ['item'],
      id: 0,
      name: 'name',
      order: 0,
      sprites: {
        back_default: '{url_img:back_default}',
        front_default: '{url_img:front_default}',
        dream_world: '{url_img:dream_world}',
        home: '{url_img:home}',
        official_artwork: '{url_img:official_artwork}',
      },
      stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        'special-attack': 0,
        'special-defense': 0,
        speed: 0,
      },
      types: ['type'],
      weight: 0,
    };

    // Función para resaltar la sintaxis del JSON
    function syntaxHighlight(json) {
      json = JSON.stringify(json, null, 2);
      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          var cls = 'json-number';
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              cls = 'json-key';
            } else {
              cls = 'json-string';
            }
          } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
          } else if (/null/.test(match)) {
            cls = 'json-null';
          }
          return (
            '<span style="word-wrap: break-word;" class="' +
            cls +
            '">' +
            match +
            '</span>'
          );
        }
      );
    }
    // Función para mostrar el JSON en el visor
    function showJSONInView(jsonData, containerId) {
      const jsonViewer = document.getElementById(containerId);
      if (jsonViewer) jsonViewer.innerHTML = syntaxHighlight(jsonData);
    }

    // Llamar a la función para mostrar el JSON en diferentes contenedores
    showJSONInView(jsonData1, 'json-viewer-1');
    showJSONInView(jsonError, 'json-error');
    showJSONInView(jsonGet, 'json-get');
  },
  { once: true }
);
