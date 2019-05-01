const getPokeNames = (pokemons) => {
    return pokemons.map(pokemon => pokemon.name)
}

const getPokemonById = (pokemons, id) => {
    return pokemons.find(pokemon => pokemon.id === id)
}

const getRarePokemons = (pokemons) => {
    return pokemons.filter(pokemon => pokemon.spawn_chance < 0.10)
}

const getMidSizedPokemon = (pokemons) => {
    return pokemons.find(pokemon => pokemon.weight === "38.0 kg")
}

module.exports = {
    getPokeNames,
    getPokemonById,
    getRarePokemons,
    getMidSizedPokemon
}