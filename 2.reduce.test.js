const pokemons = require("./pokeData");
const {
  calculateTotalPokemonWeight,
  calculateAverageSpawnChance,
  calculateTotalEggDistance,
  getHeaviestPokemon,
  categorizePokemonsByRarity
} = require("./2.reduce");

describe("LG: using reduce", () => {
  test("[2/A] calculateTotalPokemonWeight: calculates the combined weight of all 151 pokemon", () => {
    const totalweight = calculateTotalPokemonWeight(pokemons);
    expect(totalweight).toBe(6938.7);
  });

  test("[2/B] calculateAverageSpawnChance: calculates the average spawn_chance of a pokemon", () => {
    const averageSpawnChance = calculateAverageSpawnChance(pokemons);
    expect(averageSpawnChance).toBeCloseTo(0.73, 2);
  });

  test("[2/C] calculateTotalEggDistance: calculates how for you have to walk to hatch one of each pokemon egg", () => {
    const totalEggDistance = calculateTotalEggDistance(pokemons);
    expect(totalEggDistance).toBe(408);
  });

  test("[2/D] getHeaviestPokemon: returns the heaviest pokemon from an array of pokemons", () => {
    const heaviestPokemon = getHeaviestPokemon(pokemons);
    expect(heaviestPokemon.id).toBe(143);
  });

  test("[2/E] catergorizePokemonsByRarity: catgorizes an array of pokemons based on spawn_chance", () => {
    const pokemonsByRarity = categorizePokemonsByRarity(pokemons);
    expect(pokemonsByRarity).toEqual(
      expect.objectContaining({
        common: expect.any(Array),
        rare: expect.any(Array),
        legendary: expect.any(Array)
      })
    );
    expect(pokemonsByRarity.common.length).toBe(66);
    expect(pokemonsByRarity.rare.length).toBe(61);
    expect(pokemonsByRarity.legendary.length).toBe(24);
  });
});
