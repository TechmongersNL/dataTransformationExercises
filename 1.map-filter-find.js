const pokemons = require("./pokeData");

// 1. Write a function that transforms an array of pokemons into an array of pokemon names
const getPokeNames = () => {
  return pokemons.map((pokemon) => pokemon.name);
};

// 2. Write a function that recieves as parameter an `id` and gets the pokemon object with that same id
const getPokemonById = undefined;

// 3. Write a function that transforms an array of pokemon into an array of "rare" (spawn_chance is less than 0.1) pokemon
const getRarePokemons = undefined;

// 4. Write a function that gets the pokemon that weighs "38.0 kg"
const getMidSizedPokemon = undefined;

// 5. Write a function that transforms an array of all pokemon into an array of pokemon who cannot be found in eggs
const getAdultPokemons = undefined;

// 6. Write a function that transforms an array of pokemon into an array of imageUrls
const getPokemonImages = undefined;

module.exports = {
  getPokeNames,
  getPokemonById,
  getRarePokemons,
  getMidSizedPokemon,
  getAdultPokemons,
  getPokemonImages,
};
