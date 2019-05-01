const getPokeNames = (pokemons) => {
    return pokemons.map(pokemon => pokemon.name)
}

module.exports = {
    getPokeNames
}