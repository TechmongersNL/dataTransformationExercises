const pokemons = require("./pokeData");
const {
  getPokeNames,
  getPokemonById,
  getRarePokemons,
  getMidSizedPokemon,
  getAdultPokemons,
  getPokemonImages
} = require("./1.map-filter-find");

describe("LG: using array map/filter/find", () => {
  test("[1/A] getPokeNames: Transforms an array of pokemons into an array of pokemon names", () => {
    const pokemonNames = getPokeNames(pokemons);
    expect(pokemonNames.length).toBe(151);
    expect(pokemonNames[0]).toBe("Bulbasaur");
    expect(pokemonNames[pokemonNames.length - 1]).toBe("Mew");
  });

  test("[1/B] getPokemonById: Gets a pokemon object by their id", () => {
    const id = 25;
    const pokemon = getPokemonById(pokemons, id);
    expect(pokemon).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        height: expect.any(String)
      })
    );
    expect(pokemon.id).toBe(25);
    expect(pokemon.name).toBe("Pikachu");
    expect(pokemon.height).toBe("0.41 m");
  });

  test('[1/C] getRarePokemons: Transforms an array of pokemon into an array of "rare" (spawn_chance is less than 0.1) pokemon', () => {
    const rarePokemon = getRarePokemons(pokemons);
    expect(rarePokemon.length).toBe(81);
    expect(rarePokemon.every(pokemon => pokemon.spawn_chance < 0.1)).toBe(true);
  });

  test('[1/D] getMidSizedPokemon: Gets the pokemon that weighs "38.0 kg"', () => {
    const pokeMonThatWeighs35kg = getMidSizedPokemon(pokemons);
    expect(pokeMonThatWeighs35kg.name).toBe("Fearow");
  });

  test("[1/E] getAdultPokemons: Transforms an array of pokemon into an array of pokemon who cannot be found in eggs", () => {
    const adults = getAdultPokemons(pokemons);
    expect(adults.length).toBe(78);
    expect(adults.every(pokemon => pokemon.egg === "Not in Eggs")).toBe(true);
  });

  test("[1/F] getPokemonImages: Transforms an array of pokemon into an array of imageUrls", () => {
    const imageUrls = getPokemonImages(pokemons);
  });
});
