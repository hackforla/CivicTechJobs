# Welcome to the CivicTechJobs Contributing Guide

> Note: This guide is for developers. If you are look to contribute as a project manager, UI designer or UX researcher, please [join our parent organization as a volunteer](https://github.com/hackforla/CivicTechJobs/wiki/Joining-the-Team) and then request to join our team!

Thank you for investing your time to our project. Anything you contribute will be reflected on our repository at [hackforla/civictechjobs](https://github.com/hackforla/CivicTechJobs).

Before starting, make sure you read our [code of conduct](https://github.com/hackforla/codeofconduct). Also, consider [joining our team as a volunteer](https://github.com/hackforla/CivicTechJobs/wiki/Joining-the-Team), especially if you enjoyed contributing to us. This gives you access to our developer meetings and slack channel so that you can influence the direction of the project on a much greater level.

This guide outlines the three ways you can contribute to us as a developer: creating issues, resolving issues, or reviewing a pull requests. Moreover, this guide is split into freelancer and development team sections. Feel free to skip to the section that you feel is most relevant for you!

Pro tip: Use the table of contents in the top-left corner to jump to specific sections of this guide.

## Contributing to our project (for freelancers)

### Creating Issues

We do not currently have a dedicated issue template for creating issues for contributors outside of our team. For now, please [open a blank issue](https://github.com/hackforla/CivicTechJobs/issues/new) and describe your inquiry as best as you can. Once you are finished, [add your newly opened issue to our Project Management project board](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/tracking-work-with-project-boards/adding-issues-and-pull-requests-to-a-project-board#adding-issues-and-pull-requests-to-a-project-board-from-the-sidebar).

### Resolving Issues

> **Note: Make sure to check out our [installation instructions](https://github.com/hackforla/CivicTechJobs/wiki/Installation-Instructions) to set up your development environment before working on any issues!**

1. Find a developer issue to work on from our [prioritized backlog](https://github.com/hackforla/CivicTechJobs/projects/1#column-10928271). (Hint: look for the `frontend` or `backend` label). The `size` label will signal the amount of work the issue might involve, with a higher number indicating greater work. For a first time contributor, we recommend taking issues with the `good first issue` label or a `size` of 1 or 2.
2. [From your local repo, create a branch off of main.](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
3. Make changes to the project on that branch based on your issue.
4. [Create a pull request through the forked repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork). After you had opened the pull request, there will be instructions on the pull request template for you to follow.
5. Done! Now just wait for a team member to get back to you with feedback on your changes!

> Important note: **We do not want to be flooded with pull requests** Please, do **NOT** take on another issue or open a second pull request until your current pull request and linked issue are resolved by a team member.

## Contributing to our project (for members of our dev team)

### Creating Issues

To create an issue as a member of our team, locate the appropriate template for your issue from the [new issue screen](https://github.com/hackforla/CivicTechJobs/issues/new/choose). Typically, you will not go wrong with [Blank Issue](https://github.com/hackforla/CivicTechJobs/issues/new?assignees=&labels=&template=blank-issue.md&title=) or the [form version](https://github.com/hackforla/CivicTechJobs/issues/new?assignees=&labels=&template=blank-issue-form.yml). If you need help, feel free to consult your development lead or other members of the team. Once you are finished, [add your newly opened issue to our Project Management project board](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/tracking-work-with-project-boards/adding-issues-and-pull-requests-to-a-project-board#adding-issues-and-pull-requests-to-a-project-board-from-the-sidebar).

### Resolving Issues

> **Note: Make sure to check out our [installation instructions](https://github.com/hackforla/CivicTechJobs/wiki/Installation-Instructions) to set up your development environment before working on any issues!**

1. Find a developer issue to work on from our [prioritized backlog](https://github.com/hackforla/CivicTechJobs/projects/1#column-10928271). (Hint: look for the `frontend` or `backend` label). The `size` label will signal the amount of work the issue might involve, with a higher number indicating greater work. For a development team member, we encourage taking the topmost `frontend` or `backend` issue, as they are arranged by priority by role.
2. Assign yourself to the issue. (Hint: see [step 4](https://docs.github.com/en/issues/tracking-your-work-with-issues/assigning-issues-and-pull-requests-to-other-github-users#assigning-an-individual-issue-or-pull-request).)
3. Move the issue from the prioritized backlog to the [in progress](https://github.com/hackforla/CivicTechJobs/projects/1#column-10928272) column. (Hint, see [step 5](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/tracking-work-with-project-boards/adding-issues-and-pull-requests-to-a-project-board#adding-issues-and-pull-requests-to-a-project-board-from-the-sidebar).)
4. [From your local repo, create a branch off of main.](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
5. Make changes to the project on that branch based on your issue.
6. [Create a pull request through the forked repo](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork). After you had opened the pull request, there will be instructions on the pull request template for you to follow.
7. Done! Now just wait for a team member to get back to you with feedback on your changes!

> Important note: **We do not want to be flooded with pull requests** Please, do **NOT** take on another issue or open a second pull request until your current pull request and linked issue are resolved by a team member. To take on another issue, please ask the development lead for an appropriate additional issue to take on.

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

[Frontend Architecture](https://github.com/hackforla/CivicTechJobs/wiki/Frontend-Architecture)<br>
[Backend Architecture](https://github.com/hackforla/CivicTechJobs/wiki/Backend-Architecture)<br>
[GitHub Architecture](https://github.com/hackforla/CivicTechJobs/wiki/GitHub-Architecture)<br>
[Development Culture](https://github.com/hackforla/CivicTechJobs/wiki/Development-Culture<br>
