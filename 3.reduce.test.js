const pokemons = require("./pokeData");
const {
  calculateTotalPokemonWeight,
  calculateAverageSpawnChance,
  calculateTotalEggDistance,
  getHeaviestPokemon,
  categorizePokemonsByRarity,
} = require("./3.reduce");

test("calculateTotalPokemonWeight: calculates the combined weight of all 151 pokemon", () => {
  const totalweight = calculateTotalPokemonWeight();
  expect(totalweight).toBe(6938.7);
});

test("calculateAverageSpawnChance: calculates the average spawn_chance of a pokemon", () => {
  const averageSpawnChance = calculateAverageSpawnChance();
  expect(averageSpawnChance).toBeCloseTo(0.73, 2);
});

test("calculateTotalEggDistance: calculates how for you have to walk to hatch one of each pokemon egg", () => {
  const totalEggDistance = calculateTotalEggDistance();
  expect(totalEggDistance).toBe(408);
});

test("getHeaviestPokemon: returns the heaviest pokemon from an array of pokemons", () => {
  const heaviestPokemon = getHeaviestPokemon();
  expect(heaviestPokemon.id).toBe(143);
});

test("catergorizePokemonsByRarity: catgorizes an array of pokemons based on spawn_chance", () => {
  const pokemonsByRarity = categorizePokemonsByRarity();
  expect(pokemonsByRarity).toEqual(
    expect.objectContaining({
      common: expect.any(Array),
      rare: expect.any(Array),
      legendary: expect.any(Array),
    })
  );
  expect(pokemonsByRarity.common.length).toBe(66);
  expect(pokemonsByRarity.rare.length).toBe(61);
  expect(pokemonsByRarity.legendary.length).toBe(24);
});

test("getRarestGym: gets the gym with the most legendary (spawn_chance < 0.01) pokemon", () => {
  const rarestGym = getRarestGym();
  expect(rarestGym).toEqual({ id: 1, city: "Saffron City", trainerId: 2 });
});
