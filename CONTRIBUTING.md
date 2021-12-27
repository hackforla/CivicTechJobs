# Welcome to the CivicTechJobs Contributing Guide

##### Note: This guide is for developers. If you are look to contribute as a project manager, go [here](). For UI, go [here](). And lastly, for UX, go [here]().

Thank you for investing your time for our project. Anything you contribute will be reflected on our repository at hackforla/civictechjobs.

Before starting, make sure you read our [code of conduct](). Also, consider joining our organization officially, especially if you enjoyed contributing to us. This allows access to our developer meetings so that you can influence the direction of the project as a whole.

This guide outlines the environmental setup, and steps when working on an issue and creating a PR. Feel free to use the table of contents to jump to specific sections of this guide.

## Required Downloads

Git - [Windows](https://git-scm.com/download/win) - [macOS](https://git-scm.com/download/mac) - [Linux/Unix](https://git-scm.com/download/linux)

<details>
<summary>Note on macOS</summary>
<br>
The macOS version of git involves downloading extra programs, such as Homebrew. In some cases this program can run up to 8GB of storage space, which might be too much for some. In that scenario, a <a href='https://www.datacamp.com/community/tutorials/homebrew-install-use'>miniature version Homebrew can be installed through XCode</a>. But do be warned that the containers for our project also takes up a substantial amount of disk space as well. Do also consider freeing up your disk space by deleting or backing up unneeded files like photos or videos and delete programs that are no longer useful. Your OS's native disk cleaner can also help clear out unused cache files.
<br>
</details>

Docker - [Windows](https://docs.docker.com/desktop/windows/install/) - [macOS](https://docs.docker.com/desktop/mac/install/) - [Linux/Unix](https://docs.docker.com/engine/install/)

## Environmental Setup

1. [Fork our repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository)
2. [Clone our repository to a local version on your PC](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository)
3. [Configuring Git to sync your fork with the original repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo#configuring-git-to-sync-your-fork-with-the-original-repository)

## Running Docker

To run our website, and the Docker container, in the terminal at the root directory of our project, `CivicTechJobs/`, enter the command, `docker compose up`, and visit http://localhost:8000/. You should now see the front page of our website.

### Troubleshooting Errors

<details>
<summary>The command 'docker' could not be found</summary>
<br>
Make sure to turn on Docker by opening the Docker program on your desktop.
<br>
</details>

<details>
<summary>can't find a suitable configuration file in this directory or any parent: not found</summary>
<br>
Make sure that your terminal location is in a directory with a <code>docker-compose.yml</code> file. And make sure that the file is not hidden.
<br>
</details>

## Contributing to our project (for freelancers)

1. Find a developer issue to work on from our [prioritized backlog](https://github.com/hackforla/CivicTechJobs/projects/1#column-10928271). (Hint: look for the 'frontend' or 'backend' label)
2. [From your local repo, create a branch off of main.](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
3. Make changes to the project on that branch based on your issue.
4. [Create a pull request through the forked repo on your Github Account](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork). Be sure to follow the instructions on the pull request template.
5. Done! Now just wait for a team member to get back to you with feedback on your changes!

> Important note: **We do not want to be flooded with pull requests** Please, do **NOT** take on another issue or open a second pull request until the pull request and linked issue are resolved by a team member.

## Contributing to our project (for members of our dev team)

1. Find a developer issue to work on from our [prioritized backlog](https://github.com/hackforla/CivicTechJobs/projects/1#column-10928271). (Hint: look for the 'frontend' or 'backend' label)
2. Assign yourself to the issue. (Hint: see [step 4](https://docs.github.com/en/issues/tracking-your-work-with-issues/assigning-issues-and-pull-requests-to-other-github-users#assigning-an-individual-issue-or-pull-request).)
3. Move the issue from the prioritized backlog to the in progress [https://github.com/hackforla/CivicTechJobs/projects/1#column-10928272] column. (Hint, see [step 5](https://docs.github.com/en/issues/organizing-your-work-with-project-boards/tracking-work-with-project-boards/adding-issues-and-pull-requests-to-a-project-board#adding-issues-and-pull-requests-to-a-project-board-from-the-sidebar).)
4. [From your local repo, create a branch off of main.](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
5. Make changes to the project on that branch based on your issue.
6. [Create a pull request through the forked repo on your Github Account](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork). Be sure to follow the instructions on the pull request template.
7. Done! Now just wait for a team member to get back to you with feedback on your changes!

> Important note: **We do not want to be flooded with pull requests** Please, do **NOT** take on another issue or open a second pull request until the pull request and linked issue are resolved by a team member. To take another issue, please ask the technical lead for an appropriate issue to take.

### Troubleshooting Errors

<details>
<summary>error: insufficient permission for adding an object to repository database </summary>
<br>
You must have created a new file, through Docker, in your local repo. Since this file "belongs" to the container, you need to transfer permission by running, <code>sudo chown -R $USER:$USER .</code>. (See <a href='https://docs.docker.com/samples/django/#create-a-django-project'>step 3</a> for more info.)
<br>
</details>