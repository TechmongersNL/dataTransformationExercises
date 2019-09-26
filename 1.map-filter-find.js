const getPokeNames = (pokemons) => {
    return pokemons.map(pokemon => pokemon.name)
}

const getPokemonById = (pokemons, id) => {
    const singlePokemon = pokemons.find((pokemon) => {
        // console.log('ID OF CURRENT POKEMON:', pokemon.id)
        // console.log("ID WE ARE LOOKING FOR:", id)
        return pokemon.id === id

    })

    return singlePokemon
}

const getRarePokemons = (pokemons) => {

}

const getMidSizedPokemon = (pokemons) => {

}

module.exports = {
    getPokeNames,
    getPokemonById,
    getRarePokemons,
    getMidSizedPokemon
}