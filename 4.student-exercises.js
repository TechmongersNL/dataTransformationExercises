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

module.exports = {
  getPsychicTrainersAndGyms,
  getTrainersAndGymsAndPokemons
};
