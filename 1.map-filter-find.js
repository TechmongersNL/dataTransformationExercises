const getPokeNames = (pokemons) => {
    return pokemons.map(pokemon => pokemon.name)
}

const getPokemonById = (pokemons, id) => {
    return pokemons.find(pokemon => pokemon.id === id)
}

const getRarePokemons = (pokemons) => {
    return pokemons.filter(pokemon => pokemon.spawn_chance < 0.10)
}

module.exports = {
    getPokeNames,
    getPokemonById,
    getRarePokemons
}