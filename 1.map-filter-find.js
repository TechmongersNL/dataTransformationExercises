const pokemons = require("./pokeData");

// 1. Transforms an array of pokemons into an array of pokemon names
const getPokeNames = () => {
  return pokemons.map((pokemon) => pokemon.name);
};

// 2. Gets a pokemon object by their id
const getPokemonById = (id) => {};

// 3. Transforms an array of pokemon into an array of "rare" (spawn_chance is less than 0.1) pokemon
const getRarePokemons = () => {};

// 4.  Gets the pokemon that weighs "38.0 kg"
const getMidSizedPokemon = () => {};

// 5. Transforms an array of pokemon into an array of pokemon who cannot be found in eggs
const getAdultPokemons = () => {};

// 6. Transforms an array of pokemon into an array of imageUrls
const getPokemonImages = () => {};

module.exports = {
  getPokeNames,
  getPokemonById,
  getRarePokemons,
  getMidSizedPokemon,
  getAdultPokemons,
  getPokemonImages,
};
