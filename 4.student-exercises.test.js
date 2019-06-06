const pokemons = require("./pokeData");
const trainers = require("./trainerData");
const gyms = require("./gymData");

const {
  getPsychicTrainersAndGyms,
  getTrainersAndGymsAndPokemons,
  getGymsWithPokemons
} = require("./4.student-exercises");

/**
 * This function should return an array of trainer objects
 * that also include an array of pokemons and an object of gym
 */
test("getTrainersAndGymsAndPokemons", () => {
  // Get an array of trainers that contain their gyms and pokemons
  const trainersAndGymsAndPokemons = getTrainersAndGymsAndPokemons(
    gyms,
    trainers,
    pokemons
  );
  expect(trainersAndGymsAndPokemons.length).toBe(9);
  // Expect each trainer to have a gym object
  expect(trainersAndGymsAndPokemons.map(trainer => trainer.gym)).toEqual(
    expect.any(Object)
  );
  // Expect each trainer to have a pokemon array
  expect(trainersAndGymsAndPokemons.map(trainer => trainer.pokemons)).toEqual(
    expect.any(Array)
  );
});

/**
 * This function should return an array of trainers that have
 * at least one psychic pokemon. In each trainer object an array
 * of their own pokemons and an object representing their gym should exist
 */
test(`getPsychicTrainersAndGyms: expect a list of trainers with psychic pokemons.
    also include (all) their pokemons and their gym`, () => {
  const result = getPsychicTrainersAndGyms(gyms, trainers, pokemons);
  expect(result.length).toEqual(2);
  expect(result[0].name).toBe("Sabrina");
  expect(result[1].name).toBe("Misty");
  // Results should also contain gym
  expect(result[0].gym).toEqual(expect.any(Object));
  expect(result[1].gym).toEqual(expect.any(Object));
  expect(result[0].gym.city).toBe("Saffron City");
  expect(result[1].gym.city).toBe("Cerulean City");
  // Results should also contain array of pokemons
  expect(result[0].pokemons).toEqual(expect.any(Array));
  expect(result[1].pokemons).toEqual(expect.any(Array));
  expect(result[0].pokemons.length).toBe(4);
  expect(result[1].pokemons.length).toBe(2);
});

/**
 * Returns an array of objects with the id and name of pokemon and an array
 * of gym objects where these pokemons can be found.
 */
test("getGymsWithPokemons: expect a list of gyms where certain pokemons can be found", () => {
  const result = getGymsWithPokemons(
    gyms,
    trainers,
    pokemons,
    "Gloom",
    "Starmie"
  );
  // Expect the result to be an array
  result.forEach(pokemon => {
    // It is an array of pokemons
    expect(pokemon).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        trainers: expect.any(Array), // Should contain a list of trainers
        gyms: expect.any(Array) // Should contain a list of gyms
      })
    );
  });
  // Length of array should be 2
  expect(result.length).toEqual(2);
  // Check owners
  expect(result[0].trainers.length).toEqual(2);
  expect(result[1].trainers.length).toEqual(1);
  expect(result[0].trainers[0].name).toBe("Brock");
  expect(result[0].trainers[1].name).toBe("Erika");
  expect(result[1].trainers[0].name).toBe("Misty");
  // Check Gyms
  expect(result[0].gyms.length).toEqual(2);
  expect(result[1].gyms.length).toEqual(1);
  expect(result[0].gyms[0].city).toBe("Celadon City");
  expect(result[0].gyms[1].city).toBe("Pewter City");
  expect(result[1].gyms[0].city).toBe("Cerulean City");
});
