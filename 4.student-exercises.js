const getTrainersAndGymsAndPokemons = (gyms, trainers, pokemons) => {
  // Combine trainers and pokemons and gyms
  return (
    trainers
      // Map trainers to include their pokemons
      .map(trainer => {
        // Include the trainer's pokemons
        trainer.pokemons = pokemons.filter(pokemon =>
          trainer.pokemonIds.includes(pokemon.id)
        );
        // Include the trainer's gym
        trainer.gym = gyms.find(gym => gym.trainerId === trainer.id);
        return trainer;
      })
  );
};

const getPsychicTrainersAndGyms = (gyms, trainers, pokemons) => {
  return (
    // Step 1: Combine the trainers, gyms and pokemons
    getTrainersAndGymsAndPokemons(gyms, trainers, pokemons)
      // Step 2: Filter out only trainers that have a psychic pokemon
      .filter(trainer =>
        trainer.pokemons.some(pokemon => pokemon.type.includes("Psychic"))
      )
  );
};

const getGymsWithPokemons = (gyms, trainers, pokemons, ...pokemonsToFind) => {
  // Retrieve the pokemon objects
  return (
    pokemons
      // Filter all the pokemons based on the ones we requested to find
      .filter(pokemon => pokemonsToFind.includes(pokemon.name))
      .map(pokemon => {
        // Construct the object to be returned
        return {
          id: pokemon.id,
          name: pokemon.name,
          // Retrieve the trainers that own this pokemon
          trainers: trainers.filter(trainer =>
            trainer.pokemonIds.includes(pokemon.id)
          ),
          // Retrieve the gyms that are owned by these trainers
          gyms: gyms.filter(gym => {
            return trainers
              .filter(trainer => trainer.pokemonIds.includes(pokemon.id))
              .find(trainer => trainer.id === gym.trainerId);
          })
        };
      })
  );

  return getTrainersAndGymsAndPokemons(gyms, trainers, pokemons)
    .filter(trainer =>
      trainer.pokemons.some(pokemon => pokemonsToFind.includes(pokemon.name))
    )
    .map(trainer => {
      return {};
      trainer.gym;
    });
};

module.exports = {
  getPsychicTrainersAndGyms,
  getTrainersAndGymsAndPokemons,
  getGymsWithPokemons
};
