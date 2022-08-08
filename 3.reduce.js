// 1. Calculates the combined weight of all 151 pokemon
const calculateTotalPokemonWeight = (pokemons) => {};

// 2. Calculates the average spawn_chance of all pokemon
const calculateAverageSpawnChance = (pokemons) => {};

// 3. Calculates how for you have to walk to hatch one of each pokemon egg
const calculateTotalEggDistance = (pokemons) => {};

// 4. Returns the heaviest pokemon from an array of pokemons
const getHeaviestPokemon = (pokemons) => {};

/*
5. Catgorizes an array of pokemons based on spawn_chance

It should return an object like this:
{
   common: [ ], // array of pokemons
   rare: [ ], // array of pokemons
   legendary: [ ], // array of pokemons
}

Common: spawn_chance higher than 0.1
Rare: spawn_chance less than 0.1
Legendary: spawn_chance less than 0.01

*/
const categorizePokemonsByRarity = (pokemons) => {};

// 6. Gets the gym with the most legendary (spawn_chance < 0.01) pokemon
const getRarestGym = (gyms, trainers, pokemons) => {};

module.exports = {
  calculateTotalPokemonWeight,
  calculateAverageSpawnChance,
  calculateTotalEggDistance,
  getHeaviestPokemon,
  categorizePokemonsByRarity,
  getRarestGym,
};
