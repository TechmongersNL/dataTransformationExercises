const getPokeNames = (pokemons) => {
    return pokemons.map(pokemon => pokemon.name)
}

const findPokemonById = (pokemons, id) => {
    return pokemons.find(pokemon => pokemon.id === id)
}


module.exports = {
    getPokeNames,
    findPokemonById
}