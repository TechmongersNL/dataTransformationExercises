const axios = require("axios");
const gitconfig = require("gitconfig");
const fs = require("fs");

const pkg = JSON.parse(fs.readFileSync(__dirname + "/package.json"));

const EXERCISE_SET_NAME = pkg.name + "@" + pkg.version;

let config = {
  tried: false,
  user: {
    name: "[Unknown student]",
    email: "unknown_student@codaisseur.com"
  }
};

module.exports = output => {
  report(output);

  return output;
};

async function report(output) {
  // Try to find git user's name & email
  if (!config.tried) {
    config.user.name = (await gitconfig.get("user.name")) || config.user.name;
    config.user.email =
      (await gitconfig.get("user.email")) || config.user.email;

    config.tried = true;
  }

  const children = output.testResults
    .map(({ testResults }) => testResults.map(process_it_block_results))
    .reduce((a, b) => a.concat(b), []);

  // // We could calculate a score, but it doesn't make much sense, due to
  // //  the way jest tests are run. (Not all tests are always run, and
  // //  you can also disable tests manually.)
  // const score = Math.round(
  //   100 * (children.filter(child => child.passed).length / children.length)
  // );

  const evaluation = {
    key: "ROOT",
    children
    // score
  };

  const exerciseResponse = {
    // evaluated: false,
    evaluator: "STUDENT_LOCAL_JEST_RUN",
    exercise: EXERCISE_SET_NAME,
    context: "(unknown)",
    input: "(unknown)",
    git_name: config.user.name,
    git_email: config.user.email,
    evaluation
  };

  fs.writeFileSync(
    __dirname + "/reported/" + Date.now() + ".json",
    JSON.stringify(exerciseResponse, null, 2),
    "utf8"
  );

  //  try {
  //    axios.post();
  //  } catch {
  //    console.log("failed posting results :(");
  //  }
}

// See [https://jestjs.io/docs/en/configuration#testresultsprocessor-string]

function process_it_block_results(results) {
  const {
    title,
    ancestorTitles, // messages in describe blocks
    status, // "failed" | "pending" | "passed"
    failureMessages
  } = results;

  // let attempted = true;

  // if (failureMessages[0] && failureMessages[0] === "TODO") {
  //   attempted = false;
  // }

  // if (
  //   failureMessages[0] &&
  //   failureMessages[0].match(/^TypeError: ([a-zA-Z0-9_$]+) is not a function/)
  // ) {
  //   attempted = false;
  // }

  const learning_goals = ancestorTitles
    .filter(title => title.match(/^(LG|Learning goal):/i))
    .map(title => title.replace(/^(LG|Learning goal):\s*/i, ""));

  const descriptions = ancestorTitles.filter(
    title => !title.match(/^(LG|Learning goal):/i)
  );

  return {
    // attempted,
    passed: status === "passed",
    key: title,
    evaluation: JSON.stringify(failureMessages[0]),
    meta: JSON.stringify({
      description:
        descriptions.length > 0 ? descriptions.join(" - ") : undefined,
      learning_goals: learning_goals.length > 0 ? learning_goals : undefined
    })
  };
}
