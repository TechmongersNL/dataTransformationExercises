const { getPokemonById } = require('./1.map-filter-find')
const { categorizePokemonsByRarity } = require('./2.reduce')

const getGymLeader = (gym, trainers) => {
    return trainers.find(trainer => trainer.id === gym.trainerId)
}
const getTrainerPokemons = (trainer, pokemons) => {
    return trainer.pokemonIds.map(id => {
        return getPokemonById(pokemons, id)
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


// Multi step solution:
//
// const getBigGyms = (gyms, trainers) => {
//     return gyms
//         .map(gym => {
//             return {
//                 id: gym.id,
//                 city: gym.city,
//                 gymLeader: getGymLeader(gym, trainers)
//             }
//         })
//         .filter(gym => {
//             return gym.gymLeader.pokemonIds.length > 3
//         })
//         .map(gym => gym.city)
// }

const getBigGyms = (gyms, trainers) => {
    return gyms.reduce((bigGymNames, currentGym) => {
        const gymLeader = getGymLeader(currentGym, trainers)

        if (gymLeader.pokemonIds.length > 3) {
            bigGymNames.push(currentGym.city)
            return bigGymNames
        }

        return bigGymNames
    }, [])
}

const getRarestGym = (gyms, trainers, pokemons) => {
    return gyms
        .map(gym => {
            const gymLeader = getGymLeader(gym, trainers)
            const trainerPokemons = getTrainerPokemons(gymLeader, pokemons)

            return {
                gym,
                pokemonsByRarity: categorizePokemonsByRarity(trainerPokemons)
            }
        })
        .reduce((rarestGymSoFar, currentGym) => {
            const legendaryCountRarestSoFar = rarestGymSoFar.pokemonsByRarity.legendary.length
            const legendaryCountCurrentGym = currentGym.pokemonsByRarity.legendary.length

            if (legendaryCountCurrentGym > legendaryCountRarestSoFar) {
                return currentGym
            }

            return rarestGymSoFar
        })
        .gym
}

module.exports = {
    getGymLeader,
    getTrainerPokemons,
    getTrainersPokemons,
    getBigGyms,
    getRarestGym,
}