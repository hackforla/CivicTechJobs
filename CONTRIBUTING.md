# Welcome to the CivicTechJobs Contributing Guide

> Note: This guide is for developers. If you are looking to contribute as a project manager, UI designer or UX researcher, please [join our organization as a volunteer](https://github.com/hackforla/CivicTechJobs/wiki/Joining-the-Team) and then request to join our team!

Thank you for investing your time to our project. Anything you contribute will be reflected on our repository at [hackforla/civictechjobs](https://github.com/hackforla/CivicTechJobs).

Before starting, make sure you read our [code of conduct](https://github.com/hackforla/codeofconduct). Also, consider [joining our team as a volunteer](https://github.com/hackforla/CivicTechJobs/wiki/Joining-the-Team), especially if you enjoyed contributing to us. This gives you access to our developer meetings and slack channel so that you can influence the direction of the project on a much greater level.

This guide outlines the three ways you can contribute to us as a developer: creating issues, resolving issues, or reviewing a pull requests as either a team member or freelancer.

Pro tip: Use the table of contents in the top-left corner to jump to specific sections of this guide.

Is this your first time working on open source projects? Check out this video [series](https://app.egghead.io/playlists/how-to-contribute-to-an-open-source-project-on-github).

## Contributing to our project

Note: "(team member)" and "(freelancer)" are used at the beginning of an instruction to identify a step specific to one or the other.

### Creating Issues

Locate the appropriate template for your issue from the [new issue screen](https://github.com/hackforla/CivicTechJobs/issues/new/choose) or by clicking  the New Issue button from the [Issues tab](https://github.com/hackforla/CivicTechJobs/issues).  The [Blank Issue](https://github.com/hackforla/CivicTechJobs/issues/new?assignees=&labels=&template=blank-issue.md&title=) or the more detailed [form version](https://github.com/hackforla/CivicTechJobs/issues/new?assignees=&labels=&template=blank-issue-form.yml) are always appropriate. 

(team member) If you need help, feel free to consult your development lead or other members of the team. 

### Resolving Issues

> **Note: Make sure to check out our [installation instructions](https://hackforla.github.io/CivicTechJobs/developer/installation/) to set up your development environment before working on any issues!**

1. Find a developer issue to work on from our [prioritized backlog](https://github.com/hackforla/CivicTechJobs/projects/1#column-10928271). (Hint: look for the `frontend` or `backend` label). The `size` label will signal the amount of work the issue might involve, with a higher number indicating greater work. For a development team member, we encourage taking the topmost `frontend` or `backend` issue, as they are arranged by priority by role.
2. Indicate you are working on the issue as follows:
   - (team member) Assign yourself to the issue. (Hint: see [step 4 of this GitHub article](https://docs.github.com/en/issues/tracking-your-work-with-issues/assigning-issues-and-pull-requests-to-other-github-users#assigning-an-individual-issue-or-pull-request).)
   - (freelancer) If you expect the issue will take more than a day to complete, add a comment to the bug indicating you are working on the bug 
3. (team member) Move the issue from the prioritized backlog to the [in progress](https://github.com/hackforla/CivicTechJobs/projects/1#column-10928272) column. (Hint, see [step 5 of this GitHub article](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/tracking-work-with-project-boards/adding-issues-and-pull-requests-to-a-project-board#adding-issues-and-pull-requests-to-a-project-board-from-the-sidebar).)
4. [From your local repository, create a branch off of main.](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
5. Make changes to the project on that branch based on your issue.
6. [Create a pull request from your fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork). After you had opened the pull request, there will be instructions on the [pull request template](https://github.com/hackforla/CivicTechJobs/blob/main/.github/pull_request_template.md?plain=1) for you to follow.
7. Check that all checks have passed.  This is at the bottom of the pull request.
8. Done! Now just wait for a team member to get back to you with feedback on your changes!  (team member) To take on another issue, please ask the development lead for an appropriate additional issue to take on.

> Important note 1: **We do not want to be flooded with pull requests!** Please, do **NOT** take on another issue or open a second pull request until your current pull request and linked issue are resolved by a team member. 

> Important note 2: **Do not directly contact the team to review your pull request unless it has been over 72 hours since the pull request was opened.** As an open-source project, the team contribute to the project in their free time, which varies from week to week, day to day. Feel free to ask any questions, however!

### Reviewing Code

To review code, please take a look at this [guide from another project](https://github.com/hackforla/website/wiki/How-to-Review-Pull-Requests). Not all the information there will be relevant to this project, but it should nonetheless get you started.

## Frequently Asked Questions

### Error Messages

<details>
<summary>1. error: insufficient permission for adding an object to repository database </summary>
<br>
You must have created a new file, through Docker. Since this file "belongs" to the container, you need to transfer permission by running, <code>sudo chown -R $USER:$USER .</code>. (See <a href='https://docs.docker.com/samples/django/#create-a-django-project'>step 3</a> for more info.)
<br>
</details>

## Additional Resources

[Frontend Architecture](https://hackforla.github.io/CivicTechJobs/developer/frontend/)<br>
[Backend Architecture](https://hackforla.github.io/CivicTechJobs/developer/backend/)<br>
[GitHub Architecture](https://hackforla.github.io/CivicTechJobs/developer/github/)<br>
[Development Culture](https://hackforla.github.io/CivicTechJobs/developer/development-culture/)<br>
[Installation Instructions](https://hackforla.github.io/CivicTechJobs/developer/installation/)<br>
[Design System Helper](https://hackforla.github.io/CivicTechJobs/developer/design-system/)<br>
[DevOps Architecture](https://hackforla.github.io/CivicTechJobs/developer/devops/)<br>
