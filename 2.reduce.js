const calculateTotalPokemonWeight = (pokemons) => {
    return pokemons.reduce((totalWeight, currentPokemon) => {
        return totalWeight + parseFloat(currentPokemon.weight)
    }, 0)
}

const calculateAverageSpawnChance = (pokemons) => {

}

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
}