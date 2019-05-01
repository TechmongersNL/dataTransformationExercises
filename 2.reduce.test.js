const pokemons = require('./pokeData')
const { calculateTotalPokemonWeight, calculateAverageSpawnChance, calculateTotalEggDistance } = require('./2.reduce');

test('calculateTotalPokemonWeight: calculates the combined weight of all 151 pokemon', () => {
    const totalweight = calculateTotalPokemonWeight(pokemons)
    expect(totalweight).toBe(6938.7)
});

test('calculateAverageSpawnChance: calculates the average spawn_chance of a pokemon', () => {
    const averageSpawnChance = calculateAverageSpawnChance(pokemons)
    expect(averageSpawnChance).toBeCloseTo(0.73, 2)
})

test('calculateTotalEggDistance: calculates how for you have to walk to hatch one of each pokemon egg', () => {
    const totalEggDistance = calculateTotalEggDistance(pokemons)
    expect(totalEggDistance).toBe(408)
})