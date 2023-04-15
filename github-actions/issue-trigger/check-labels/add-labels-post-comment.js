var fs = require("fs");

// Constant variables
const REQUIRED_LABELS = ['role', 'feature', 'size'];


/*
 * Check the labels of an issue, and add/remove labels as necessary
 * @param {Object} g - github object  
 * @param {Object} c - context object 
 * @returns - returns an object with the action's result, which is passed on to the next action
 */
async function main({ g, c }) {
  const github = g;
  const context = c;

  const currentLabels = await context.payload.issue.labels.map(labelObj => labelObj.name);
  console.log(currentLabels)
  const missingLabels = getMissingLabels(context);


  await github.rest.issues.addLabels({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    labels: missingLabels
  });

  const creator = await context.payload.sender.login;

  await octokit.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: await generateComment(context, creator, missingLabels),
  });
}

function getMissingLabels(currentLabels) {
  let missingLabelsArr = [];
  for (const required_label of REQUIRED_LABELS) {
    if (!currentLabels.length) {
      missingLabelsArr.append(`${required_label}: missing`);
    }
    if (!currentLabels.filter(label => label.startsWith(required_label)).length) {   
      missingLabelsArr.append(`${required_label}: missing`);
    }
  }
  return missingLabelsArr
}

async function generateComment(creator, labels) {
  let data = fs.readFile('add-labels-comment-template.md', (err, data) => {
    if (err) throw err;
    return data
  });
  let text = await data.toString('utf-8');
  let comment = text.replace('${issueCreator}', creator).replace('${labels}', labels.join(', '));
  return comment
}


module.exports = main