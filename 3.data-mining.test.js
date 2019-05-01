const pokemons = require('./pokeData')
const trainers = require('./trainerData')


const { getTrainerPokemons, getTrainersPokemons } = require('./3.data-mining');

test('getTrainerPokemons: gets the pokemons belonging to a trainer', () => {
    const ash = trainers.find(trainer => trainer.name === 'Ash')
    const teamAsh = getTrainerPokemons(ash, pokemons)

    expect(teamAsh).toEqual(expect.any(Array))
    expect(teamAsh.map(pokemon => pokemon.name)).toEqual([
        'Pikachu', "Bulbasaur", "Squirtle", "Charizard", "Pidgeotto", "Butterfree"
    ])
});

test(`getTrainersPokemons: replaces trainerIds with 
        the pokemons belonging to a trainer for an array of trainers`, () => {
    const trainersWithPokemons = getTrainersPokemons(trainers, pokemons)

    trainersWithPokemons.forEach(trainer => {
        expect(trainer).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            pokemons: expect.any(Array)
        }))

        trainer.pokemons.forEach(pokemon => {
            expect(pokemon).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                avg_spawns: expect.any(Number),
            }))
        })
    })
})