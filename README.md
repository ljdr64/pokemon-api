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

### Endpoints

- `GET /api/v1/pokemon`: Obtiene todos los recursos.
- `GET /api/v1/pokemon/:id`: Obtiene un recurso por su ID.

#### Ejemplo de respuesta exitosa (200 OK)

#### (GET /api/v1/pokemon/25)

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

## Documentación Adicional

### Propiedades de los Pokémon

- **abilities** ➔ Array of strings
- **base_experience** ➔ Integer
- **height** ➔ Integer
- **held_items** ➔ Array of objects
- **id** ➔ Integer
- **name** ➔ String
- **order** ➔ Integer
- **sprites** ➔ Object
- **stats** ➔ Array of objects
- **types** ➔ Array of strings
- **weight** ➔ Integer

## Configuración de Sequelize

La configuración de Sequelize se encuentra en el archivo `libs/sequelize.js`. Asegúrate de actualizar este archivo con la información correcta de tu base de datos PostgreSQL.

## Archivo package.json

El archivo `package.json` incluye todas las dependencias del proyecto, scripts de npm y otra información relevante para el proyecto.

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).
