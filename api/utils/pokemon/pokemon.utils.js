const generatePaginationLinks = (
  req,
  offset,
  limit,
  totalItems,
  pokemonEndpoint
) => {
  const baseUrl = `${
    req.headers['x-forwarded-proto'] || req.protocol
  }://${req.get('host')}/api/v1/${pokemonEndpoint}`;

  let nextLink = null;
  let prevLink = null;

  if (offset > 0) {
    prevLink = `${baseUrl}?offset=${Math.max(
      offset - limit,
      0
    )}&limit=${limit}`;
  }

  if (offset + limit < totalItems) {
    nextLink = `${baseUrl}?offset=${offset + limit}&limit=${limit}`;
  } else {
    nextLink = null;
  }

  return { prevLink, nextLink };
};

const formatPokemon = (req, pokemonList, pokemonEndpoint) => {
  return pokemonList.map((pokemon) => ({
    name: pokemon.name,
    url: `${req.headers['x-forwarded-proto'] || req.protocol}://${req.get(
      'host'
    )}/api/v1/${pokemonEndpoint}/${pokemon.id}`,
  }));
};

const formatOnePokemon = (req, pokemon, pokemonEndpoint) => {
  return {
    name: pokemon.name,
    url: `${req.headers['x-forwarded-proto'] || req.protocol}://${req.get(
      'host'
    )}/api/v1/${pokemonEndpoint}/${pokemon.id}`,
  };
};

module.exports = { generatePaginationLinks, formatPokemon, formatOnePokemon };
