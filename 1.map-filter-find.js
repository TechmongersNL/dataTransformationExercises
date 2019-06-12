const getPokeNames = (pokemons) => {
    return pokemons.map(pokemon => pokemon.name)
}

const getPokemonById = (pokemons, id) => {
    console.log('hai')
}

module.exports = {
    getPokeNames,
    getPokemonById,
}