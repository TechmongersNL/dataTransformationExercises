const fs = require('fs')
const gitconfig = require('gitconfig')
const axios = require('axios')

const testAttempted = status => status === 'failed' || status === 'passed'
const testPassed = status => status === 'passed'
const createKey = (test, index) => {
    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    return `[${ALPHABET[index]}] ${test.title}`
}

const createReport = (test, index) => {
    // console.log('test object:', test)
    if(!test) return {}
    return {
        exercise: test.ancestorTitles[0],
        attempted: testAttempted(test.status),
        passed: testPassed(test.status),
        key: createKey(test, index),
        failureMessages: test.failureMessages,
        meta: {
            learning_goals: [
                ...test.ancestorTitles
            ]
        }
    }
}

const getDayNameAndVersion = () => {
    const { name, version } = JSON.parse(fs.readFileSync('./package.json'))
    return `${name}@${version}`
}

const getGitDetails = async () => {
    try {
        let config = await gitconfig.get({ location: 'global'})
        const gitName = (config.user || {}).name || null
        const gitEmail = (config.user || {}).email || null
        return { gitName, gitEmail }
    } catch(err){
        return { gitName: null, gitEmail: null }
    }
}

class MyCustomReporter {
    constructor(globalConfig, options) {
        this._globalConfig = globalConfig;
        this._options = options;
    }
  
    // Called before the total suite starts
    onRunStart(results, options){
        // CONSOLE.LOGS FOR DEBUGGING
        // console.log('RUN START');
        // console.log("Results:", results)  
        // console.log("Options:", options)
    }

    // Called when the total suite has been run
    async onRunComplete(contexts, suiteResults) {
        // CONSOLE.LOGS FOR DEBUGGING
        // console.log('COMPLETE');        
        // console.log('Custom reporter output:');
        // console.log('GlobalConfig: ', this._globalConfig);
        // console.log('Options: ', this._options);
        // console.log('Contexts:', contexts)
        // console.log('Results:', results)

        const exercise = getDayNameAndVersion()
        const { gitName, gitEmail} = await getGitDetails()

        let score = 0
        const testReports = suiteResults.testResults.flat()
            .map(fileResult => {
                score += fileResult.numPassingTests
                return fileResult.testResults
            }).flat()
            .map(createReport)

        // CONSOLE.LOGS FOR DEBUGGING
        // console.log('suiteResults:', suiteResults)
        // console.log('testReports:', testReports)
        // console.log('testResults.testResults:', testReports.testResults)

        const output = {
            evaluator: "STUDENT_LOCAL_JEST_RUN",
            day: exercise,
            context: '(unknown)',
            input: '(unknown)',
            gitName,
            gitEmail,
            evaluation: testReports
        }

        console.log('output:', output)

        //Sending the raw data to the db  
        axios.post('http://localhost:4000/raw_data', output )
          .then(function (response) {
            console.log(response.data.message);
          })
          .catch(function (error) {
            console.log(error);
          });

        // test data for easy testing the post /evaluations request  
        const testOutput = {
            day:'data-transformations@1.2.0',
            gitName:'Andrea',
            gitEmail:'Andrea@gmail.com',
            evaluation:[
                         {
                            exercise: 'Array methods: map, filter & find: 1.1 ',
                            attempted: true,
                            passed: true,
                            key:
                            '[A] getPokeNames: Transforms an array of pokemons into an array of pokemon names',
                            failureMessages: [],
                            meta: { learning_goals: [Array] } 
                        },
                        { 
                            exercise: 'Array methods: map, filter & find: 1.1 ',
                            attempted: true,
                            passed: true,
                            key: '[B] getPokemonById: Gets a pokemon object by their id',
                            failureMessages: [],
                            meta: { learning_goals: [Array] } 
                        },
                        { 
                            exercise: 'Array methods: reduce: 1.1',
                            attempted: true,
                            passed: true,
                            key:
                            '[C] calculateTotalEggDistance: calculates how for you have to walk to hatch one of each pokemon egg',
                            failureMessages: [],
                            meta: [Object] 
                        },
                        { 
                            exercise: 'Array methods: reduce:',
                            attempted: true,
                            passed: false,
                            key:
                                '[D] getHeaviestPokemon: returns the heaviest pokemon from an array of pokemons',
                            failureMessages: [],
                            meta: [Object] 
                        },
                        { 
                            exercise: 'Array methods: map, filter & find: ',
                            attempted: false,
                            passed: false,
                            key:
                                '[E] getAdultPokemons: Transforms an array of pokemon into an array of pokemon who cannot be found in eggs',
                            failureMessages: [],
                            meta: [Object] },
                    ]
        }

          axios.post('http://localhost:4000/evaluations', output )
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
       
    }
       


    // Called before a single test starts
    onTestStart(test){
        // CONSOLE.LOGS FOR DEBUGGING
        // console.log('TEST START');
        // console.log("test", test)  
    }

    // Called once a single test file has been run
    onTestResult(test, testResult, aggregratedResult){
        // CONSOLE.LOGS FOR DEBUGGING
        // console.log('TEST RESULT');
        // console.log('Test:', test);
        // console.log('TestResult:', testResult);
        // console.log('AggregratedResult:', aggregratedResult);
    }

}

// {
//     "evaluator": "STUDENT_LOCAL_JEST_RUN",
//     "exercise": "data-transformations@1.0.0",
//     "context": "(unknown)",
//     "input": "(unknown)",
//     "gitName": "Kelley van Evert",
//     "gitEmail": "hello@kelleyvanevert.nl",
//     "evaluation": [
//       {
//         "key": "ROOT",
//         "children": [
//           {
//             "attempted": true,
//             "passed": true,
//             "key": "getPokeNames: Transforms an array of pokemons into an array of pokeman names",
//             "meta": {
//               "learning_goals": [
//                 "use array map"
//               ]
//             }
//           },
//           {
//             "attempted": false,
//             "passed": false,
//             "key": "[B] getPokemonById: Gets a pokemon object by their id",
//             "meta": {
//               "learning_goals": [
//                 "use array find"
//               ]
//             }
//           },
//           {
//             "attempted": false,
//             "passed": false,
//             "key": "[C] getRarePokemons: Transforms an array of pokemon into an array of \"rare\" (spawn_chance is less than 0.1) pokemon",
//             "meta": {
//               "learning_goals": [
//                 "use array filter"
//               ]
//             }
//           },
//           {
//             "attempted": false,
//             "passed": false,
//             "key": "[D] getMidSizedPokemon: Gets the pokemon that weighs \"38.0 kg\"",
//             "meta": {
//               "learning_goals": [
//                 "use array find"
//               ]
//             }
//           },
//           {
//             "attempted": false,
//             "passed": false,
//             "key": "[E] getAdultPokemons: Transforms an array of pokemon into an array of pokemon who cannot be found in eggs",
//             "meta": {
//               "learning_goals": [
//                 "use array filter"
//               ]
//             }
//           },
//           {
//             "attempted": false,
//             "passed": false,
//             "key": "[F] getPokemonImages: Transforms an array of pokemon into an array of imageUrls",
//             "meta": {
//               "learning_goals": [
//                 "use array map"
//               ]
//             }
//           }
//         ],
//         "score": 17
//       }
//     ]
//   }

module.exports = MyCustomReporter;