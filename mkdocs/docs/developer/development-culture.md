# Development Culture

At CivicTechJobs, the developers of our team have 3 key tasks:

- Make issues
- Resolve issues
- Review code

This guide will discuss how each of these work at CivicTechJobs. If you have any questions be sure to let us know! We strive to create an inclusive space for developers to learn and achieve their goals.

## Make Issues

> To make an issue, follow [this guide](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue) from GitHub, or take a look at [this section](https://github.com/hackforla/CivicTechJobs/blob/main/CONTRIBUTING.md#making-issues-1) of the CONTRIBUTING.md.

At CivicTechJobs, updating the project starts with creating an issue outlining the situation and changes needed to resolve the situation. When writing an issue, a good rule of thumb is to write as if another developer would be the one to work on the issue. Therefore, being thorough is better than brief. Some good guidelines to follow:

- Write a brief, two sentence summary for the overview. Be sure to note why these changes is needed.
- In the overview, use language with little jargon.
- Action items are usually step by step instructions or a list of requirements.
- Longer explanations or useful documentation, if needed, are placed in the Instruction/Resources section.
- Dependencies should 90% of the time be another issue. If this issue does not exist, it should probably be made and referenced as a dependency.
- Likewise, the dependency should reference the issue it is a dependency for so that there is a trail to release issues with dependencies.
- Check out examples of developer issues, such as [this](https://github.com/hackforla/CivicTechJobs/issues/61), for how to structure and word issues.

After writing out the issue, be sure to [add labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#applying-a-label). At minimum, we need three labels, one each from the "size", "role" and "feature/p-feature" series. In most cases, you should not create your own label. If you are unsure what labels to place, it is okay to leave it be, as another team member will help you when they notice the issue lacks certain labels.

Once an issue is created, and placed in the [Project Management](https://github.com/hackforla/CivicTechJobs/projects/1) project board, the developer is mostly done with the issue. If the issue contains a dependency, it will move into the "Ice Box" column via [GitHub automation](https://github.com/hackforla/CivicTechJobs/blob/bafc2fc1706ac49ec9c2c7cb610a29bddc561339/.github/workflows/issue-trigger.yml#L7), or "New Issue Approval", otherwise.

On rare occasions, a project manager, or other team members, might ping you with questions on the issue. Perhaps the team member did not understand the jargon, or the instructions were unclear. In that case, read their concerns carefully and either answer with a comment, or edit the original issue. Eventually, the issue will be approved, prioritized, and released into the "Prioritized Backlog" column, where developers can work on it.

## Resolve Issues

> To resolve an issue, take a look at [this section](https://github.com/hackforla/CivicTechJobs/blob/main/CONTRIBUTING.md#resolving-issues-1) of the CONTRIBUTING.md.

When choosing an issue to work on from the "Prioritized Backlog" column, it is good to note the "role" and "size" label. This signals the expertise required and time commitment needed to resolve the issue. As a rule of thumb, a smaller issue should take a week, and a larger issue, two or three weeks. This should give you a good idea on what issues is best for you to take at the moment. If you are completely new, we recommend taking smaller issues to understand your limits before pushing them further. That said, you are free to work on whatever you want.

On occasion, when an issue is being worked on for an inordinate amount of time, the team might request an update on your progress. When giving your progress, it is courteous to give an ETA on the issue, and evaluate on your ability to resolve the issue in a reasonable timeframe. If an issue is taking far too long, it might be wise to abandon the issue and work on something that might bring more value to you and the team.

Also, one final note: **Do not contact the team via email or Slack to review your pull request unless it as been 72 hours since it was opened! The team will occasionally comb for pull requests and review them.** If you want to move on to another issue, consider reviewing another developer's pull request (if you are part of the team), contribute to other open source projects, or ask the team for additional tasks.

Most issues can be divided into two broad types: frontend issues, and backend issues.

### Frontend issues

- Usually involves the appearance of the site
- Usually easier than backend issues
- Requires little research
- Is occasionally an audit
- May involve documentation

When working on frontend issues, there will usually be a link to the Figma design. Figma often contains multiple prototypes and future prototypes. When looking for our current design, go to the bottom right corner and look for a pink rectangle. Anything within that represents our most up-to-date design. Use that as a reference for your frontend issues. If the pink rectangle is not there, please request the UI design team to put a pink rectangle on the latest approved design.

On rare circumstances, designs can change in the middle of work. This is something that happens as part of development, but will often be telegraphed during meetings. If a design change, you are free to reassess and abandon your current issue, or code pragmatically to ensure your work would not need a massive overhaul.

### Backend issues

- Usually involves research and discussion
- Can also pertain to [GitHub Actions](https://docs.github.com/en/actions)
- Usually takes some time
- May involve documentation

## Review Code

> To review code, please take a look at this [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews), and this portion of our [CONTRIBUTING.md](https://github.com/hackforla/CivicTechJobs/blob/main/CONTRIBUTING.md#reviewing-code).

Code that should be reviewed is found in the [pull request tab](https://github.com/hackforla/CivicTechJobs/pulls). These are issues that require someone to look over for several criteria:

- Applicability: Were the correct changes made? Where new lines added or removed that are extraneous to the issue?
- Brokenness: Did the changes break the site? Is the changes responsive to view-port changes?
- Cleanliness: Is the new code programmatic or messy? Would the code be hard to maintain in the long run?

When code meets all three criteria, it can then be merged and made a part of the site. Otherwise, the review should indicate changes that needs to be made.

As an advanced project, CivicTechJobs have certain expectations for our developers. One of these is that issues of size 1 or 2 is small enough that we "pre-review" them. This means that we are confident that the developer can resolve these issues without review. Therefore, these issues can be merged directly into our codebase upon resolution. That said, it is still fine to request the team to review your code if feedback is desired.

**Important:** Although issues can be pre-reviewed, do not make a habit of merging without making a pull request. There will be times when you performed an accidental merge, which could be a pain to fix on the command-line.

As one final note, code can be merged solely on one approved review but it is fine to request more reviewers or ask for the team to review it during a developer meeting.
