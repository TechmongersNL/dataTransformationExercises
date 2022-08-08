// 1. Given an a `gym` object and an array of `trainers` returns the trainer object for that gym.
const getGymLeader = (gym, trainers) => {};

// 2. Gets the pokemons belonging to a trainer
const getTrainerPokemons = (trainer, pokemons) => {};

// 3. replaces pokemonIds with the pokemons belonging to a trainer for every trainer on an array
// trainer currently:
// { id: 1, name: 'Brock', pokemonIds: [74, 95] },
// Expected output:
// { id: 1, name: "Brock", pokemons: [{ id: 74, .... }, { id: 95, .... }] }
const getTrainersPokemons = (trainers, pokemons) => {};

// 4. Gets the city NAMES with gym leaders who have 4 pokemons or more
const getBigGyms = (gyms, trainers) => {};

module.exports = {
  getGymLeader,
  getTrainerPokemons,
  getTrainersPokemons,
  getBigGyms,
};
