const pokemons = require('./pokeData')
const { getPokeNames } = require('./1.map-filter-find');

test('getPokeNames: Transforms an array of pokemons into an array of pokemon names', () => {
    const pokemonNames = getPokeNames(pokemons)
    expect(pokemonNames.length).toBe(151)
    expect(pokemonNames[0]).toBe('Bulbasaur')
    expect(pokemonNames[pokemonNames.length - 1]).toBe('Mew')
});

