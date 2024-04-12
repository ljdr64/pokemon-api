document.addEventListener('DOMContentLoaded', function () {
  // JSON de ejemplo
  const jsonData1 = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    abilities: ['Static', 'Lightning Rod'],
    base_experience: 112,
    height: 0.4,
    weight: 6.0,
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      special_attack: 50,
      special_defense: 50,
      speed: 90,
    },
  };

  const jsonError = {
    error: 'No se encontró ningún Pokémon con el ID especificado.',
  };

  const codeGet = { GET: '/pokemon/25' };

  // Función para resaltar la sintaxis del JSON
  function syntaxHighlight(json) {
    json = JSON.stringify(json, null, 4);
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
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }
  // Función para mostrar el JSON en el visor
  function showJSONInView(jsonData, containerId) {
    const jsonViewer = document.getElementById(containerId);
    jsonViewer.innerHTML = syntaxHighlight(jsonData);
  }

  // Llamar a la función para mostrar el JSON en diferentes contenedores
  showJSONInView(jsonData1, 'json-viewer-1');
  showJSONInView(jsonError, 'json-error');
  showJSONInView(codeGet, 'code-get');
});
