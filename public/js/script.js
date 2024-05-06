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

    const jsonData2 = {
      base_happiness: 50,
      capture_rate: 190,
      color: 'yellow',
      egg_groups: ['ground', 'fairy'],
      evolution_chain: [
        {
          base_evolution: {
            id: 172,
            name: 'pichu',
          },
          first_evolution: {
            id: 25,
            name: 'pikachu',
          },
          second_evolution: {
            id: 26,
            name: 'raichu',
          },
        },
      ],
      generation: 'generation-i',
      growth_rate: 'medium',
      habitat: 'forest',
      id: 25,
      is_baby: false,
      name: 'pikachu',
      shape: 'quadruped',
    };

    const jsonError = {
      statusCode: 404,
      error: 'Not Found',
      message: '{resource} not found',
    };

    const jsonError2 = {
      statusCode: 400,
      error: 'Bad Request',
      message: '"id" must be a number',
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

    const jsonGet2 = {
      base_happiness: 0,
      capture_rate: 0,
      color: 'color',
      egg_groups: ['egg_group'],
      evolution_chain: [
        {
          base_evolution: {
            id: 0,
            name: 'base_evolution',
          },
          first_evolution: {
            id: 0,
            name: 'first_evolution',
          },
          second_evolution: {
            id: 0,
            name: 'second_evolution',
          },
        },
      ],
      generation: 'generation',
      growth_rate: 'growth_rate',
      habitat: 'habitat',
      id: 0,
      is_baby: false,
      name: 'name',
      shape: 'shape',
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
    showJSONInView(jsonData2, 'json-viewer-2');
    showJSONInView(jsonError, 'json-error');
    showJSONInView(jsonError2, 'json-error-2');
    showJSONInView(jsonGet, 'json-get');
    showJSONInView(jsonGet2, 'json-get-2');
  },
  { once: true }
);

document.body.innerHTML = document.body.innerHTML.replace(
  /{api_url}/g,
  'pokemon-api-opal.vercel.app'
);
