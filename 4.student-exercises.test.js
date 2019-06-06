const pokemons = require("./pokeData");
const trainers = require("./trainerData");
const gyms = require("./gymData");

const { getNextEvolution } = require("./4.student-exercises");

test("expect next evolution", () => {
  const blastoise = pokemons.find(p => p.name === "Blastoise");
  var evolution = getNextEvolution(blastoise);
  expect(evolution).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.toEqual("Squirtle"),
      num: expect.any(String),
      type: expect.any(Array)
    })
  );
});

// test("expect evolve", () => {
//   // Provide a list of pokemons to be evolved
// });

// test("expect ...", () => {
//   // List of gyms that have psychic pokemons
// });
