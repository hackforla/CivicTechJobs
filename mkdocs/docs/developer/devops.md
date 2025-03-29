# DevOps Architecture

```yml
├── .github/
│   └── ISSUE_TEMPLATE/
├── aws/ # DevOps
├── backend/
│    ├── backend/
│          └── settings.py
│    ├── ctj_api/
│    ├── frontend_dist/
│    ├── staticfiles/
│    ├── entrypoint.sh # DevOps
│    ├── manage.py
│    ├── pyproject.toml
│    └── startServer.sh
├── dev/ # DevOps
│    ├── django.dockerfile
│    ├── vite.Dockerfile
│    └── dev.env
├── frontend/
├── mkdocs/
├── stage/  # DevOps
│    ├── Dockerfile
│    └── stage.env
├── .dockerignore # DevOps
├── .gitignore
├── CONTRIBUTING.md
├── docker-compose.docs.yml # DevOps
├── docker-compose.stage.yml # DevOps
├── docker-compose.yml # DevOps
├── LICENSE
└── README.md
```

_<p style="text-align: center;">Overall project structure</p>_

```yml
├── dev/
│    ├── dev.env.example
│    ├── django.dockerfile
│    └── vite.Dockerfile
├── stage/
│    ├── Dockerfile
│    └── stage.env.example
├── .dockerignore
├── docker-compose.docs.yml
├── docker-compose.stage.yml
└── docker-compose.yml
```

_<p style="text-align: center;">DevOps Architecture</p>_

### Summary

**DevOps Tech Stack**: Docker, Daphne, Whitenoise, PostgreSQL

Our devops files can be thought of as a set of files needed to create an exact replica of our environments for our developers. Although the overall structure appears deceptively basic, it only represents a fraction of our devops files. Several of our files, such as the ones that construct our staging environment, contains sensitive information, and as such are not placed in our public repository. For most frontend and backend work, there is never a need to access these files.

> _\*Note: On the rare occasions that there is a need to access the sensitive files for environments other than development, please consult the development lead of the project. They will know exactly what files you need, and what permissions you need to access them._

### Overview of Directories and Files

- **dev/:** contains two dockerfiles and an env file. `django.dockerfile` contains information for our Django server setup. `vite.Dockerfile` contains information to start our vite dev server. `dev.env.example` is an example of the env file needed to configure our dev environment.
- **.dockerignore:** This file tells Docker to ignore certain files when building the container. These are usually files that pertain to docker or git, which are not important when building the webserver.
- **docker-compose.yml:** Contains instructions for docker when we run "docker compose". To know more about what each line does, please consult [Docker's documentation](https://docs.docker.com/compose/compose-file/). This compose file starts the development environment.
- **docker-compose.stage.yml:** Docker compose file for starting the stage environment.
- **docker-compose.docs.yml:** Docker compose file for starting the mkdocs development server.

### Docker

Docker is a platform that allows packaging and virtualizing applications within a container. This gives developers the powerful ability to collaborate in a stable, synchronized environment, and deploying web applications with the greatest of ease. We will not be going too much into Docker here, but we will explain in greater depth some of the Docker configurations we have made.

#### `docker-compose.yml`

This file contains configuration directions for docker compose. It consists of three services: `pgdb` (our database), `vite` (our vite bundler), and `django` (our django server). The vite and django service relies on separate dockerfiles, located in the `dev` directory to build the container. This separation of dockerfiles enable each container to be build with its own set of dependencies. It also makes rebuilding the container simple when dependencies are migrated to a newer version.

For those of you used to creating applications without Docker, most would run vite and django in separate terminals, so that they can both run at the same time. For the purposes of brevity, the different services can be considered to be Docker's way of running separate terminals.

One will also notice that the Django command uses a placeholder server name, `0.0.0.0:8000`. This placeholder is important, since Docker creates an isolated environment. As a result, servers that are run in Docker does not recognize a browser from outside of that environment. Without this server name, localhost:8000 will not reach the server, as the server would recognize your browser as coming from a foreign machine. Therefore, all warnings related to 0.0.0.0, should they pop-up, should be ignored.

The vite frontend and django backend dev servers are split into `localhost:5175` and `localhost:8000`, respectively. 

#### `*.dockerfile`

Dockerfiles are files that define how a container is built. Although containerization is a deep concept, to put it briefly, you can think of containers as separate "mini-computers", each programmed to do one thing. Some containers, such as our `pgdb` container does not require a dockerfile to configure it, as it works out of the box. On the otherhand, our `vite` and `django` containers need dockerfile to built out the files we need to run it effectively.

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

#### Development

Our development environment is entirely defined by our `docker-compose.yml`, and the files inside of `dev/`. More information about those files can be found above.

Of note, however, is the `dev.env.example` file. This file is only a sample, but lists out all the environmental variables needed to run our site. While most of them are prefilled, some uses `<>` to indicate placeholders, which must be filled in by the developer.

#### Staging

You can view the staging environment with the following URL: [https://civictechjobs-stage.vrms.io/](https://civictechjobs-stage.vrms.io/)

The main stage file is `docker-compose.stage.yml`. This docker compose file sets up a staging environment in our local machine.

The following is a brief overview of how the stage environment is set up:
1. First build the React frontend with `vite build`.
2. Copy the `/frontend/dist` folder contents into `/backend/frontend_dist`
3. In the backend, build the django staticfiles with the command `python manage.py collecstatic`
4. Run the django migration commands to set up the postgres database.
5. Use daphne to start the python web server: `daphne -b 0.0.0.0 -p 8000 backend.asgi:application`

The `stage.env.example` contains environment variables used to configure the staging environment.

The `/stage/Dockerfile` sets up the Django server. It first uses a JavaScript container to build the React frontend, then copies the files into a django container. Finally, it  uses the `/backend/entrypoint.sh` script to build and start the server.

Our Django web server uses Whitenoise to serve the static html, css and js files. In other words, whitenoise serves the static frontend files.

#### AWS staging

More information on our AWS staging files can be found in the `/aws` directory, and github action files. To access this information, please ask for the required permissions from the development lead.

We plan to replace some of these files with Terraform scripts.

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
- python manage.py createsuperruser
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
[How to use Django with Daphne](https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/daphne/)<br>
[Making React and Django play well together - the "hybrid app" model - Fractal Ideas](https://fractalideas.com/blog/making-react-and-django-play-well-together-hybrid-app-model)<br>
[Feature: Set up stage environment in docker by LoTerence · Pull Request #613 · hackforla/CivicTechJobs · GitHub](https://github.com/hackforla/CivicTechJobs/pull/613)<br>