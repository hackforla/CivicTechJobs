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
  console.log(missingLabels)
  console.log(`owner: ${context.repo.owner}`)


  const addLabelsAction = await github.rest.issues.addLabels({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    labels: missingLabels
  });

  const creator = await context.payload.sender.login;
  console.log(`creator: ${creator}`);

  const postCommentAction = await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: generateComment(creator, missingLabels)
  });
}

function getMissingLabels(currentLabels) {
  let missingLabelsArr = [];
  for (const required_label of REQUIRED_LABELS) {
    if (!currentLabels.length) {
      console.log(`Issue has no ${required_label} label.`)
      missingLabelsArr.push(`${required_label}: missing`);
    }
    else if (!currentLabels.filter(label => (label.startsWith(required_label) || label.startsWith(required_label, 2))).length) {
      missingLabelsArr.push(`${required_label}: missing`);
    }
  }
  return missingLabelsArr
}

function generateComment(creator, labels) {
  let filePathToTemplate = './github-actions/issue-trigger/check-labels/comment-template.md';
  let text = readFileSync(filePathToTemplate).toString('utf-8');
  let labelsStr = labels.join(', ');
  console.log(labelsStr);
  let comment = text.replace('${issueCreator}', creator).replace('${labels}', labels.join(', '));
  console.log(`comment: ${comment}`);
  return comment
}

