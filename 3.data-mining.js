const getTrainerPokemons = (trainer, pokemons) => {
    return trainer.pokemonIds.map(id => {
        return pokemons.find(pokemon => pokemon.id === id)
    })
}

const getTrainersPokemons = (trainers, pokemons) => {
    return trainers.map(trainer => {
        const trainerPokemons = getTrainerPokemons(trainer, pokemons)
        return {
            id: trainer.id,
            name: trainer.name,
            pokemons: trainerPokemons
        }
    })
}



module.exports = {
    getTrainerPokemons,
    getTrainersPokemons
}