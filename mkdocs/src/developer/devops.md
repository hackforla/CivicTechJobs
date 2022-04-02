# DevOps Architecture

```yml
├── .github/
│   └── ISSUE_TEMPLATE/
├── app/
│    ├── config/
│          └── settings.py
│    ├── frontend/
│    ├── server/
│    ├── .babelrc
│    ├── manage.py
│    ├── requirements.txt
│    ├── package.json
│    ├── package-lock.json
│    └── webpack.config.js
├── dev/ # DevOps
│    ├── django.dockerfile
│    ├── webpack.dockerfile
│    └── dev.env
├── .dockerignore # DevOps
├── .gitignore
├── jsconfig.json
├── CONTRIBUTING.md
├── docker-compose.yml # DevOps
├── LICENSE
└── README.md
```

_<p style="text-align: center;">Overall project structure</p>_

```yml
├── dev/
│    ├── django.dockerfile
│    ├── webpack.dockerfile
│    └── dev.env.example
├── .dockerignore
├── docker-compose.yml
```

_<p style="text-align: center;">DevOps Architecture</p>_

## Summary

**DevOps Tech Stack**: Docker, Gunicorn, Nginx, PostgreSQL, test

Our devops files can be thought of as a set of files needed to create an exact replica of our environments for our developers. Although the overall structure appears deceptively basic, it only represents a fraction of our devops files. Several of our files, such as the ones that construct our staging environment, contains sensitive information, and as such as not placed in our public repository. For most frontend and backend work, there is never a need to access these files.

> ###### _\*Note: On the rare occasions that there is a need to access the sensitive files for environments other than development, please consult the development lead of the project. They will know exactly what files you need, and what permissions you need to access them._

## Overview of Directories and Files

- **dev/:** contains two dockerfiles and an env file. `django.dockerfile` contains information for our Django server setup. `webpack.dockerfile` contains information to start our webpack watch plugin. `dev.env.example` is an example of the env file needed to configure our dev environment.
- **.dockerignore:** This file tells Docker to ignore certain files when building the container. These are usually files that pertain to docker or git, which are not important when building the webserver.
- **docker-compose.yml:** Contains instructions for docker when we run "docker compose". To know more about what each line does, please consult [Docker's documentation](https://docs.docker.com/compose/compose-file/).

## Docker

Docker is a platform that allows packaging and virtualizing applications within a container. This gives developers the powerful ability to collaborate in a stable, synchonized environment, and deploying web applications with the greatest of ease. We will not be going too much into Docker here, but we will explain in greater depth some of the Docker configurations we have made.

### `docker-compose.yml`

This file contains configuration directions for docker compose. It consists of three services: pgdb (our database), webpack (our webpack bundler), and django (our django server). The webpack and django service relies in separate dockerfiles, located in the `dev` directory to build the container. This separation of dockerfiles enable each container to be build with its own set of dependencies. It also makes rebuilding the container simple when dependencies are migrated to a newer version.

For those of you used to creating applications without Docker, most would run webpack and django in separate terminals, so that they can both run at the same time. For the purposes of brevity, the different services can be considered to be Docker's way of running separate terminals.

One will also notice that the Django command uses a placeholder server name, 0.0.0.0:8000. This placeholder is important, since Docker creates an isolated environment. As a result, servers that are run in Docker does not recognize a browser from outside of that environment. Without this server name, localhost:8000 will not reach the server, as the server would recognize your browser as coming from a foreign machine. Therefore, all warnings related to 0.0.0.0, should they pop-up, should be ignored.

### `*.dockerfile`

Dockerfiles are files that define how a container is built. Although containerization is a deep concept, to put it briefly, you can think of containers as separate "mini-computers", each programmed to do one thing. Some containers, such as our `pgdb` container does not require a dockerfile to configure it, as it works out of the box. On the otherhand, our `webpack` and `django` containers need dockerfile to built out the files we need to run it effectively.

```dockerfile
FROM node:latest

WORKDIR /code


# install app dependencies
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install


# add app
COPY . .
```

_<p style="text-align: center;">Sample dockerfile that copies the package.json from a project and installs all dependencies.</p>_

Dockerfiles are usually named as just `dockerfile`, as that is the default name that docker looks for when constructing our builds. Since our project requires multiple dockerfiles, we name them with `.dockerfile` extensions, a convention that allows VSCode to detect dockerfiles and use appropriate syntax highlighting.

Do note that docker and dockerfiles can be fickle to work with, especially on old devices. Further down this documentation are various tips and commands that can be used with docker to help debug your code. But as always, consulting official documentation is the best way to get accurate, up-to-date information.

## Environments

### Development

Our development environment is entirely defined by our `docker-compose.yml`, and the files inside of `dev/`. More information about those files can be found above.

Of note, however, is the dev.env.example file. This file is only a sample, but lists out all the environmental variables needed to run our website. While most of them are prefilled, some uses `<>` to indicate placeholders, which must be filled in by the developer.

### Staging

More information on our staging files can be found with our staging files. To access this information, please ask for the required permissions from the development lead.

## Useful Commands

```bash
docker compose down -v
```

Useful to completely remove a container and related volumes. This is helpful when fiddling with database settings, which often breaks the database. This command allows the container to be restarted fresh.

```bash
docker compose -f <filename> <docker command>
```

Use this to specify an alternate docker-compose file to run your commands, such as docker-compose-other.yml. This is useful if you want to test out docker for yourself.

```bash
docker compose run <container> <command>
```

This is useful to run one time commands inside your container. Some good commands to run are:

- python manage.py makemigrations
- python manage.py migrate
- pip install -r requirements.txt
- npm install <dependency>

```bash
docker exec -it <container> sh
```

Use this to do heavier debugging inside of your container. What this does is open the shell inside of the container's "mini-computer". This allows you to explore the files inside the container to see if it matches what you would expect after building is finished. This command only works when a container is running, so use `docker compose run -d` to run your container in the background beforehand.

```bash
docker compose build --progress=plain
```

Sometimes when a build is happening, the logs are too opaque to debug if a step goes wrong. This commands makes the logs a bit more verbose so that you might have an easier time debugging.

## Additional Resources

[Docker Documentation](https://docs.docker.com/)<br>
