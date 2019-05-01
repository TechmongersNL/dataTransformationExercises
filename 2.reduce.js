const calculateTotalPokemonWeight = (pokemons) => {
    return pokemons.reduce((totalWeight, currentPokemon) => {
        return totalWeight + parseFloat(currentPokemon.weight)
    }, 0)
}

const calculateAverageSpawnChance = (pokemons) => {
    const totalPokemonCount = pokemons.length
    const averageSpawnChance = pokemons.reduce((totalSpawnChance, currentPokemon) => {
        return totalSpawnChance + currentPokemon.spawn_chance
    }, 0) / totalPokemonCount

    return averageSpawnChance
}

const calculateTotalEggDistance = (pokemons) => {
    return pokemons.reduce((totalDistance, currentPokemon) => {
        if (currentPokemon.egg === "Not in Eggs") {
            return totalDistance
        }

        return totalDistance + parseInt(currentPokemon.egg)
    }, 0)
}

// Alternate solution using ternary operator
// const calculateTotalEggDistance = (pokemons) => {
//     return pokemons.reduce((totalDistance, currentPokemon) => {
//         const distance = currentPokemon.egg === "Not in Eggs" ? 0 : parseInt(currentPokemon.egg)
//         return totalDistance + distance
//     }, 0)
// }

const getHeaviestPokemon = (pokemons) => {
    return pokemons.reduce((heaviestSoFar, currentPokemon) => {
        if (parseInt(heaviestSoFar.weight) > parseInt(currentPokemon.weight)) {
            return heaviestSoFar
        }

        return currentPokemon
    })
}

module.exports = {
    calculateTotalPokemonWeight,
    calculateAverageSpawnChance,
    calculateTotalEggDistance,
    getHeaviestPokemon
}