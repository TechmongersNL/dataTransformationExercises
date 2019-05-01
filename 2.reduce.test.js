const pokemons = require('./pokeData')
const { calculateTotalPokemonWeight } = require('./2.reduce');

test('calculateTotalPokemonWeight: calculates the combined weight of all 151 pokemon', () => {
    const totalweight = calculateTotalPokemonWeight(pokemons)
    expect(totalweight).toBe(6938.7)
});