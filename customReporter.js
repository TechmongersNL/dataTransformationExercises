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
    if(!test) return {}
    return {
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

const getExerciseNameAndVersion = () => {
    const { name, version } = JSON.parse(fs.readFileSync('./package.json'))
    return `${name}@${version}`
}

const getGitDetails = async () => {
    try {
        let config = await gitconfig.get({ location: 'global'})
        const git_name = (config.user || {}).name || null
        const git_email = (config.user || {}).email || null
        return { git_name, git_email }
    } catch(err){
        return { git_name: null, git_email: null }
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

        const exercise = getExerciseNameAndVersion()
        const { git_name, git_email} = await getGitDetails()

        let score = 0
        const testReports = suiteResults.testResults.flat()
            .map(fileResult => {
                score += fileResult.numPassingTests
                return fileResult.testResults
            }).flat()
            .map(createReport)


        // console.log('suiteResults:', suiteResults)
        // console.log('testReports:', testReports)
        // console.log('testResults.testResults:', testReports.testResults)

        const output = {
            evaluator: "STUDENT_LOCAL_JEST_RUN",
            exercise,
            context: '(unknown)',
            input: '(unknown)',
            git_name,
            git_email,
            evaluation: [{
                key: 'ROOT',
                children: testReports,
                score
            }]
        }

        console.log(output)
        
        //Sending the raw data to the db  
        axios.post('http://localhost:4000/raw_data', output )
          .then(function (response) {
            console.log(response.data.message);
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
//     "git_name": "Kelley van Evert",
//     "git_email": "hello@kelleyvanevert.nl",
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