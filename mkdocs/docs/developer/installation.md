# Installation Instructions

This guide runs through the steps needed to create and run a local version of our project.

If you are ever stuck or need clarification, you can contact our team members or the development lead through our [Slack](https://hackforla.slack.com/archives/C02509WHFQQ) or [email](mailto:Civictechjobs@hackforla.org), and schedule a pair programming session with one of our developers. All of us have been through these steps, and am more than happy to help. By helping you, we can better improve our documentation and grow this project!

## Required Downloads

Git - [Windows](https://git-scm.com/download/win) - [macOS](https://git-scm.com/download/mac) - [Linux/Unix](https://git-scm.com/download/linux)<br>
Docker - [Windows](https://docs.docker.com/desktop/windows/install/) - [macOS](https://docs.docker.com/desktop/mac/install/) - [Linux/Unix](https://docs.docker.com/engine/install/)<br>
Prettier - [VSCode Extension](https://github.com/prettier/prettier-vscode)<br>

It is also recommended to install Python, Poetry, Node.js, and NPM in order to do things outside of Docker.

<details>
<summary>Note on macOS</summary>
The macOS version of git involves downloading extra programs, such as Homebrew. In some cases this program can run up to 8GB of storage space, which might be too much for some. In that scenario, a <a href='https://www.datacamp.com/community/tutorials/homebrew-install-use'>miniature version of Homebrew can be installed through XCode</a>. But do be warned that the containers for our project takes up a substantial amount of disk space as well. Do consider freeing up your disk space by deleting or backing up unneeded files, like photos or videos, and delete programs that are no longer useful. Your OS's native disk cleaner can also clear out unused cache files.
</details><br>

## Environmental Setup

1. [Fork our repository.](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository)
2. [Clone our repository to a local version on your PC.](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository)
3. [Configuring Git to sync your fork with the original repository.](https://docs.github.com/en/get-started/quickstart/fork-a-repo#configuring-git-to-sync-your-fork-with-the-original-repository) When configuring, make sure to not blindly copy and paste the commands without making appropriate edits, especially when it involves your username or the repository name.

While developing, make sure to create new branches off of the `develop` branch. To checkout the `develop` branch into your local repository, you can do the following:

1. Navigate to the root of our directory, `CivicTechJobs/`, in the terminal.
2. Run `git remote add upstream https://github.com/hackforla/CivicTechJobs.git` - this command adds the original hackforla CivicTechJobs github repo as a remote to your local repository and names it "upstream".
3. Run `git fetch upstream develop` - this command fetches the `develop` branch.
4. Run `git checkout -b develop upstream/develop` - this command creates and checks out a new branch called "develop" that tracks the upstream `develop` branch.


## Running Docker

1. Navigate to the root of our directory, `CivicTechJobs/`, in the terminal.
2. In `dev/`, create a file named, `dev.env`.
3. In this newly created file, copy and paste the contents of `dev.env.example`. Afterwards, you must edit the lines specified below.
4. Move to the frontend directory `cd frontend` and then `npm install`. When this is finished, move back to the root directory `cd ..`
5. Finally, enter `docker compose up --watch` to run the local server.
6. In a browser, visit `http://localhost:5175` and you should see the front page of our website!
7. Use `http://localhost:8000` to test the backend django server.

<details>
<summary>dev.env lines to edit</summary>
<ul>
   <li>POSTGRES_DB: a name for your database, such as `postgres`</li>
   <li>POSTGRES_USER: a username for your database</li>
   <li>POSTGRES_PASSWORD: a password for your database</li>
   <li>SECRET_KEY: a random string of length 50. You can use your favorite secret key generator to achieve this. To learn more about how Django generate default keys, see [Python's secrets's library](https://docs.python.org/3/library/secrets.html#secrets.token_urlsafe).</li>
   <li>SQL_DATABASE: same as POSTGRES_DB</li>
   <li>SQL_USER: same as POSTGRES_USER</li>
   <li>SQL_PASSWORD: same as POSTGRES_PASSWORD</li>
</ul>
</details>

In development mode, our frontend and backend dev servers are split into two separate processes. The React frontend is hosted on `localhost:5175`, and the django backend API server is hosted on `localhost:8000`. Docker compose sets the two dev servers up so that they can communicate to each other.

<!-- TODO: Fix the linter container  -->
<!-- 
### Linting

Executing `docker compose build linter` following the instructions above also creates a docker image called `linter` that can be used to run various linters/formatters against the source code. The [pre-commit](https://pre-commit.com/) is used to manage the linters/formatters, and the configurations for it can be found at: `CivicTechJobs/.pre-commit-config.yaml`

To run the linters/formatters:

1. Copy the existing `CivicTechJobs/dev/linter.env.example` and create a new file called `CivicTechJobs/dev/linter.env`
2. Fill out all the lines following the instructions in the example doc and save the `linter.env` file
3. Run the linter/formatters using the following command:

- `docker compose run linter` - runs the linters/formatters against the files staged for commit via `git add <file>`
- `docker compose run linter run --all-files` - runs the linters/formatters across all non-excluded files in this repository

_Note_: The linter does not yet incorporate with [hadolint](https://github.com/hadolint/hadolint), a Dockerfile linter. To run hadolint locally, easiest way is via: `docker run --rm --interactive docker.io/hadolint/hadolint < Dockerfile`
 -->

## Frequently Asked Questions

This section might answer some of the burning questions you have. If you cannot find it here, be sure to contact our team members or the development lead through our [Slack](https://hackforla.slack.com/archives/C02509WHFQQ) or [email](mailto:Civictechjobs@hackforla.org).

### Troubleshooting Errors

##### 1. The command 'docker' could not be found

Make sure to turn on Docker by opening the Docker program on your desktop.

##### 2. Docker error: 'unknown flag: --watch'

The `--watch` flag enables hot module reloads during development. This flag requires a later version of Docker Compose(<a href="https://docs.docker.com/compose/how-tos/file-watch/" target="_blank">2.22.0</a>). If you are running into issues or getting errors running `docker compose up --watch`, please make sure you have installed the latest version of Docker and Docker Desktop on your machine.

##### 3. can't find a suitable configuration file in this directory or any parent: not found

Make sure that your terminal location is in a directory with a `docker-compose.yml` file. And make sure that the file is not hidden.

##### 4. code ERR_SOCKET_TIMEOUT

This can result for several reasons, such as having your sockets overloaded. In order to prevent this, the best thing to do is to lower the amount of sockets used when performing npm install. Change this line in `dev/vite.Dockerfile`:

`RUN npm install`

to:

`RUN npm install --maxsockets=1`

This should allow `docker compose up` to work. Be sure to delete the addition once your image and container is set up.

##### 5. [dependency] not found

This sometimes happen when npm did not install successfully. In this scenario, you need to manually install the dependencies inside the container. Generally the command to run a command inside a container is:

`docker compose run [container name] [command to run in container]`

In this scenario, the full command would be:

`docker compose run vite npm install`

##### 6. [webpack-cli] [Error: EACCES: permission denied', open '/code/frontend/templates/frontend/index.html']

In this case, the `index.html` file has incorrect ownership and/or permissions. To fix this, run the following command in the root directory of the CTJ repository:

`sudo chown -R $USER:$USER`

This will utilize superuser permissions to change the user and group ownership of all the files and directories in the current directory to the current user.

## Additional Resources

[Git Documentation](https://git-scm.com/doc)<br>
[Docker Documentation](https://docs.docker.com/)<br>
[Quickstart Guide](developer/quickstart-guide)<br>
[Frontend Architecture](developer/frontend/)<br>
[Backend Architecture](developer/backend/)<br>
[DevOps Architecture](developer/devops/)<br>
[GitHub Architecture](developer/backend/)<br>
