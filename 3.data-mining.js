const getGymLeader = (gym, trainers) => {
  return trainers.find(t => t.id === gym.trainerId);
};

const getTrainerPokemons = (trainer, pokemons) => {
  return pokemons.filter(p => trainer.pokemonIds.includes(p.id));
};

const getTrainersPokemons = (trainers, pokemons) => {
  return trainers.map(t => ({
    id: t.id,
    name: t.name,
    pokemons: t.pokemonIds.map(id => pokemons.find(p => p.id === id))
  }));
};

const getTrainersPokemonsAlt = (trainers, pokemons) => {
  return trainers.map(t => {
    const { pokemonIds, ...trainer } = t;
    const pokeList = pokemonIds.map(id => pokemons.find(p => p.id === id));
    return {
      ...trainer,
      pokemons: pokeList
    };
  });
};

const getBigGyms = (gyms, trainers) => {
  const bigGyms = gyms.filter(
    gym => trainers.find(t => t.id === gym.trainerId).pokemonIds.length >= 4
  );
  return bigGyms.map(gym => gym.city);
};

function getPokemonSpawnRateForGym(gym, trainers, pokemons) {
  return pokemons
    .filter(poke =>
      trainers.find(t => t.id === gym.trainerId).pokemonIds.includes(poke.id)
    )
    .map(poke => parseFloat(poke.spawn_rate));
}

const getRarestGym = (gyms, trainers, pokemons) => {
  return gyms.reduce((acc, gym) => {
    if (!acc.city) return gym;
    const newPokemons = getPokemonSpawnRateForGym(gym, trainers, pokemons);
    const currentPokemons = getPokemonSpawnRateForGym(acc, trainers, pokemons);
    const newLegendaryAmount = newPokemons.filter(sr => sr < 0.01).length;
    const currentLegendaryAmount = currentPokemons.filter(sr => sr < 0.01)
      .length;
    return newLegendaryAmount > currentLegendaryAmount ? gym : acc;
  }, {});
};

module.exports = {
  getGymLeader,
  getTrainerPokemons,
  getTrainersPokemons: getTrainersPokemonsAlt,
  getBigGyms,
  getRarestGym
};
