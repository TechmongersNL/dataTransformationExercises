const pokemons = require("./pokeData");
const trainers = require("./trainerData");
const gyms = require("./gymData");

const {
  getPsychicTrainersAndGyms,
  getTrainersAndGymsAndPokemons
} = require("./4.student-exercises");

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
