const pokemons = require("./pokeData");
const trainers = require("./trainerData");
const gyms = require("./gymData");

// 1. Write a function that receives a `gym` object and returns the trainer object for that gym.
const getGymLeader = undefined;

// 2. Write a function that receives a `trainer` object and returns an array of pokemons objects belonging to that trainer.
const getTrainerPokemons = undefined;

// 3. Write a function that replaces pokemonIds from the trainers with the actual pokemons objects belonging to each trainer.
// It gets NO parameters

// trainer currently:
// { id: 1, name: 'Brock', pokemonIds: [74, 95] },

// Expected output:
// { id: 1, name: "Brock", pokemons: [{ id: 74, .... }, { id: 95, .... }] }
const getTrainersPokemons = undefined;

// 4. Write a function that returns the NAMES of cities with gym leaders who have 4 pokemons or more
// It gets NO parameters
// Should return an array of strings
const getBigGyms = undefined;

module.exports = {
  getGymLeader,
  getTrainerPokemons,
  getTrainersPokemons,
  getBigGyms,
};
