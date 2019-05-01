const pokemons = require('./pokeData')
const { getPokeNames, findPokemonById } = require('./1.map-filter-find');

test('getPokeNames: Transforms an array of pokemons into an array of pokemon names', () => {
    const pokemonNames = getPokeNames(pokemons)
    expect(pokemonNames.length).toBe(151)
    expect(pokemonNames[0]).toBe('Bulbasaur')
    expect(pokemonNames[pokemonNames.length - 1]).toBe('Mew')
});

test('findPokemonById: Finds and returns a pokemon object by their id', () => {
    const id = 25
    const pokemon = findPokemonById(pokemons, id)
    expect(pokemon.name).toBe('Pikachu')
    expect(pokemon.height).toBe('0.41 m')
})