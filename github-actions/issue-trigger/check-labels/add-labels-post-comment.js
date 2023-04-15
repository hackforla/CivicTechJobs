const fs = require("fs");

// Global Variables
const REQUIRED_LABELS = ['role', 'feature', 'size'];


/*
- The main function checks the current labels of the newly created issue. If any required labels are missing, adds '<label>: missing' to the issue, and post a comment @<issue creator> requesting them to add these labels.
- @param {Object} g - github object  
- @param {Object} c - context object 
*/
async function main({ g, c }) {
  const github = g;
  const context = c;

  const issueLabels = context.payload.issue.labels.map(labelObj => labelObj.name); // array of current issue labels
  console.log(issueLabels)
  const missingLabels = getMissingLabels(issueLabels); // array of missing labels, e.g. ['role: missing', 'size: missing']
  console.log(missingLabels)

  // add labels to issue https://octokit.github.io/rest.js/v19#issues-add-labels
  await github.rest.issues.addLabels({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    labels: missingLabels
  });

  const creator = context.payload.sender.login; // issue creator
  console.log(`creator: ${creator}`);

  // post comment to issue https://octokit.github.io/rest.js/v19#issues-create-comment
  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: generateComment(creator, missingLabels) // comment string read from comment template
  });
}

function getMissingLabels(currentLabels) {
  let missingLabelsArr = [];
  for (const required_label of REQUIRED_LABELS) {
    if (!currentLabels.length) {
      console.log(`Issue has no ${required_label} label.`);
      missingLabelsArr.push(`${required_label}: missing`);
    }
    // if currentLabels is not an empty array, filter to see if any label starts with the required label name, and also check from the 2nd index for the possible 'p-feature' label
    else if (!currentLabels.filter(label => (label.startsWith(required_label) || label.startsWith(required_label, 2))).length) {
      missingLabelsArr.push(`${required_label}: missing`);
    }
  }
  return missingLabelsArr
}

function generateComment(issueCreator, labels) {
  let templateFilePath = './github-actions/issue-trigger/check-labels/comment-template.md';
  let text = fs.readFileSync(templateFilePath).toString('utf-8');
  let labelsStr = labels.join(', '); // join the array into a string
  console.log(labelsStr);
  let comment = text.replace('${issueCreator}', issueCreator).replace('${labels}', labels.join(', ')); // replace placeholder strings with new values
  console.log(`comment: ${comment}`);
  return comment
}

module.exports = main