# PokeInfo API

**API de Pokemon:** Esta es una API de solo GET, conexión a PostgreSQL con Sequelize y ExpressJs.

## Tabla de Contenidos

1. [Instalación](#instalación)
2. [Uso](#uso)
3. [Documentación Adicional](#documentación-adicional)
4. [Configuración de Sequelize](#configuración-de-sequelize)
5. [Archivo package.json](#archivo-packagejson)
6. [Licencia](#licencia)

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias con el comando `npm install`.
3. Configura las variables de entorno creando un archivo `.env` basado en el archivo `.env.example` y completando los valores necesarios.
4. Ejecuta las migraciones de la base de datos con el comando `npm run migrations:run`.
5. Inicia el servidor con el comando `npm start`.

## Uso

## API Endpoints

### Pokemon

- `GET /api/v1/pokemon`: Obtiene todos los Pokemon.
- `GET /api/v1/pokemon/:id`: Obtiene un Pokemon por su ID.
- `GET /api/v1/pokemon/:name`: Obtiene un Pokemon por su nombre.

### Pokemon Species

- `GET /api/v1/pokemon-species`: Obtiene todas las especies de Pokemon.
- `GET /api/v1/pokemon-species/:id`: Obtiene una especie de Pokemon por su ID.

### Ejemplos de Respuesta para Pokemon

#### Ejemplo de respuesta exitosa (200 OK)

##### `GET /api/v1/pokemon/25`

```json
{
  "abilities": ["static", "lightning-rod"],
  "base_experience": 112,
  "height": 4,
  "held_items": ["oran-berry", "light-ball"],
  "id": 25,
  "name": "pikachu",
  "order": 35,
  "sprites": {
    "back_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    "dream_world": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg",
    "home": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png",
    "official_artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
  },
  "stats": {
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "special-attack": 50,
    "special-defense": 50,
    "speed": 90
  },
  "types": ["electric"],
  "weight": 60
}
```

#### Ejemplo de respuesta de error (400 Bad Request)

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"id\" must be a number"
}
```

#### Ejemplo de respuesta de error (404 Not Found)

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Pokemon not found"
}
```

### Ejemplos de Respuesta para Pokemon-Species

#### Ejemplo de respuesta exitosa (200 OK)

##### `GET /api/v1/pokemon-species/25`

```json
{
  "base_happiness": 50,
  "capture_rate": 190,
  "color": "yellow",
  "egg_groups": ["ground", "fairy"],
  "evolution_chain": {
    "base_evolution": {
      "id": 172,
      "name": "pichu"
    },
    "first_evolution": {
      "id": 25,
      "name": "pikachu"
    },
    "second_evolution": {
      "id": 26,
      "name": "raichu"
    }
  },
  "generation": "generation-i",
  "growth_rate": "medium",
  "habitat": "forest",
  "id": 25,
  "is_baby": false,
  "name": "pikachu",
  "shape": "quadruped"
}
```

#### Ejemplo de respuesta de error (400 Bad Request)

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"id\" must be a number"
}
```

#### Ejemplo de respuesta de error (404 Not Found)

```json
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Pokemon-species not found"
}
```

## Documentación de la API de Pokémon

### Propiedades de los Pokémon

- **abilities** ➔ Array of strings. Habilidades que el Pokémon puede tener.
- **base_experience** ➔ Integer. La experiencia base que otorga el Pokémon cuando es derrotado.
- **height** ➔ Integer. Altura del Pokémon en decímetros.
- **held_items** ➔ Array of strings. Objetos que el Pokémon puede tener.
- **id** ➔ Integer. ID único del Pokémon.
- **name** ➔ String. Nombre del Pokémon.
- **order** ➔ Integer. Orden en la Pokedex.
- **sprites** ➔ Object. Enlaces a imágenes del Pokémon.
  - **back_default** ➔ URL. Imagen de la parte trasera del Pokémon.
  - **front_default** ➔ URL. Imagen de la parte delantera del Pokémon.
  - **dream_world** ➔ URL. Imagen de la parte delantera en el estilo "Dream World".
  - **home** ➔ URL. Imagen de la parte delantera en el estilo "Home".
  - **official_artwork** ➔ URL. Imagen de la parte delantera en el estilo "Official Artwork".
- **stats** ➔ Object. Estadísticas base del Pokémon.
  - **attack** ➔ Integer. Ataque físico.
  - **defense** ➔ Integer. Defensa física.
  - **hp** ➔ Integer. Puntos de salud.
  - **special-attack** ➔ Integer. Ataque especial.
  - **special-defense** ➔ Integer. Defensa especial.
  - **speed** ➔ Integer. Velocidad.
- **types** ➔ Array of strings. Tipos a los que pertenece el Pokémon.
- **weight** ➔ Integer. Peso del Pokémon en hectogramos.

### Propiedades de Pokémon Species

- **base_happiness** ➔ Integer. Nivel de felicidad inicial del Pokémon.
- **capture_rate** ➔ Integer. Tasa de captura del Pokémon (entre 0 y 255).
- **color** ➔ String. El color predominante del Pokémon.
- **egg_groups** ➔ Array of strings. Grupos de huevos a los que pertenece el Pokémon.
- **evolution_chain** ➔ Object. Información sobre la cadena evolutiva del Pokémon.
  - **base_evolution** ➔ Object. La primera etapa de la evolución.
    - **id** ➔ Integer.
    - **name** ➔ String.
  - **first_evolution** ➔ Object. La segunda etapa de la evolución (si aplica).
    - **id** ➔ Integer.
    - **name** ➔ String.
  - **second_evolution** ➔ Object. La tercera etapa de la evolución (si aplica).
    - **id** ➔ Integer.
    - **name** ➔ String.
- **generation** ➔ String. La generación a la que pertenece el Pokémon.
- **growth_rate** ➔ String. Tasa de crecimiento del Pokémon (por ejemplo, "rápida" o "lenta").
- **habitat** ➔ String. El hábitat natural del Pokémon.
- **id** ➔ Integer.
- **is_baby** ➔ Boolean. Indica si el Pokémon es un bebé.
- **name** ➔ String. Nombre del Pokémon.
- **shape** ➔ String. La forma física del Pokémon.

## Configuración de Sequelize

La configuración de Sequelize se encuentra en el archivo `libs/sequelize.js`. Asegúrate de actualizar este archivo con la información correcta de tu base de datos PostgreSQL.

## Archivo package.json

El archivo `package.json` incluye todas las dependencias del proyecto, scripts de npm y otra información relevante para el proyecto.

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).
