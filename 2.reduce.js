const calculateTotalPokemonWeight = pokemons => {
  return pokemons.reduce((totalWeight, currentPokemon) => {
    return totalWeight + parseFloat(currentPokemon.weight);
  }, 0);
};

const calculateAverageSpawnChance = pokemons => {
  return pokemons.reduce((acc, poke) => {
    return parseFloat(poke.spawn_chance / pokemons.length) + acc;
  }, 0);
};

const calculateTotalEggDistance = pokemons => {
  const inEggs = pokemons.filter(poke => poke.egg !== "Not in Eggs");
  return inEggs.reduce((acc, poke) => {
    const distance = poke.egg.split(" ")[0];
    return parseFloat(distance) + acc;
  }, 0);
};

function getPokeWeight(poke) {
  return poke.weight ? parseFloat(poke.weight.split(" ")[0]) : 0;
}

const getHeaviestPokemon = pokemons => {
  return pokemons.reduce((acc, poke) => {
    return getPokeWeight(acc) < getPokeWeight(poke) ? poke : acc;
  }, {});
};

const categorizePokemonsByRarity = pokemons => {
  const byRarity = {
    common: [],
    rare: [],
    legendary: []
  };
  return pokemons.reduce((acc, poke) => {
    const spawnChance = parseFloat(poke.spawn_chance);
    if (spawnChance < 0.01) {
      acc.legendary.push(poke);
    } else if (spawnChance <= 0.1) {
      acc.rare.push(poke);
    } else {
      acc.common.push(poke);
    }
    return acc;
  }, byRarity);
};

/*
categorizePokemonsByRarity should return an object like this:

{
   common: [ ], // array of pokemons
   rare: [ ], // array of pokemons
   legendary: [ ], // array of pokemons
}

Common: spawn_chance higher than 0.1
Rare: spawn_chance less than 0.1
Legendary: spawn_chance less than 0.01

*/

module.exports = {
  calculateTotalPokemonWeight,
  calculateAverageSpawnChance,
  calculateTotalEggDistance,
  getHeaviestPokemon,
  categorizePokemonsByRarity
};
