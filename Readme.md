# Data transformation exercises

## Today we practice & expand upon: `map`, `filter` and `find`

Why? Because in JavaScript we often have to deal with arrays of objects.

In that case: Use `map`, `filter` and `find`! --

![](https://media.giphy.com/media/iz0gAwkJzWg8g/giphy.gif)

If we have time we will learn about another array method called `reduce`.

## This repo has exercises with tests

- There are test files set up that check the functionality of the functions you have to write.
- Test files end with .test.js, write your code in the corresponding .js file.
- 1.map-filter-find.js are exercises to practice map, filter and find. Choose the appropriate method for each function.
- 2.data-mining.js are more advanced exercises where you have to combine different pieces of data, (gyms, trainers and pokemon) to get the information you need. That can mean nesting maps & find or chaining array methods together in a multi-step process.
- 3.reduce.js are exercises to introduce and practice reduce, one of the more powerful array methods we have (it's super effective!). These are bonus exercises.

## Solutions

The solutions to these exercises can be found on the [feature/solutions](https://github.com/Codaisseur/dataTransFormationExercises/tree/feature/solutions) branch

## How to do these exercises:

```bash
# Clone the repo
git clone git@github.com:Codaisseur/dataTransFormationExercises.git
# change directory
cd dataTransFormationExercises
# Install dependencies
npm install
# Run the exercises
# 1.)
npm run exercise1
# 2.)
npm run exercise2
# 3.)
npm run exercise3
# all
npm run test
```

Running the exercises this way will make use of the `--watch` functionality of jest.

- That means that when you change your code, the tests will be run again (It's super ef.. well you get the idea).
- To stop running the tests you can press `ctrl + c`
