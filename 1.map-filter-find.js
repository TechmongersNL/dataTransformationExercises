const getPokeNames = pokemons => {
  return pokemons.map(pokemon => pokemon.name);
};

const getPokemonById = (pokemons, id) => {
  const singlePokemon = pokemons.find(pokemon => {
    // console.log('ID OF CURRENT POKEMON:', pokemon.id)
    // console.log("ID WE ARE LOOKING FOR:", id)
    return pokemon.id === id;
  });

  return singlePokemon;
};

const getRarePokemons = pokemons => {
  return pokemons.filter(poke => poke.spawn_chance < 0.1);
};

const getMidSizedPokemon = pokemons => {
  return pokemons.find(poke => poke.weight === "38.0 kg");
};

const getAdultPokemons = pokemons => {
  return pokemons.filter(p => p.egg === "Not in Eggs");
};

const getPokemonImages = pokemons => {
  return pokemons.map(p => p.img);
};

module.exports = {
  getPokeNames,
  getPokemonById,
  getRarePokemons,
  getMidSizedPokemon,
  getAdultPokemons,
  getPokemonImages
};
