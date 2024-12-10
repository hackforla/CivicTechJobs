# MKdocs Architecture

```yml
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
│       └── mkdocs-build.yml # Docs
├── backend/
├── dev/
├── frontend/
├── mkdocs/ # Docs
│   ├── docs/
│   └── mkdocs.yml
├── .dockerignore
├── .gitignore
├── CONTRIBUTING.md
├── docker-compose.yml
├── docker-compose.docs.yml # Docs
├── LICENSE
└── README.md
```

_<p style="text-align: center;">Overall project structure</p>_

```yml
├── docs/
│   ├── assets/
│   ├── css/
│   ├── developer/
│   ├── joining-the-team/
│   ├── js/
│   └── misc/
├── index.md
├── resources.md
├── mkdocs.yml
```

_<p style="text-align: center;">mkdocs directory structure</p>_

### Summary

The MkDocs "sub-project" lives in the `mkdocs/` folder. A development server can be run using the `docker-compose.docs.yml` compose script. The mkdocs is set to automatically deploy to github pages using the `mkdocs-build.yml` github action.


### Docker MkDocs

It is important to note that we are using Hack for LA's prebuilt docker mkdocs image for convenient setup. Please see the resources below for more information:

- [Hack for LA - docker-mkdocs repo](https://github.com/hackforla/docker-mkdocs)
- [Hack for LA - docker-mkdocs documentation](https://hackforla.github.io/docker-mkdocs/)
- [Hack for LA - docker-mkdocs dockerhub image](https://hub.docker.com/r/hackforlaops/mkdocs)

This prebuilt docker image makes it easy to get a mkdocs development server running with one command, without having to install python or mkdocs dependencies on your local machine. It also includes common useful plugins that we dont have to worry about installing ourselves, and already includes the `mkdocs-material` theme pre-installed.

Our project implements the HFLA mkdocs image by pulling it inside the `docker-compose.docs.yml` file:

```yml
name: civic-tech-jobs-mkdocs

services:
  mkdocs:
    container_name: mkdocs
    image: hackforlaops/mkdocs:latest
    command: mkdocs serve -a "0.0.0.0:8005"
    ports:
      - "8005:8005"
    volumes:
      - ./mkdocs:/app
    develop:
      watch:
        - action: sync
          path: ./mkdocs
          target: /app
```

Now when we run docker compose up like so:

```sh
docker-compose -f docker-compose.docs.yml up --watch
```

A mkdocs development server is started on `http://localhost:8005`

### MkDocs Deployment

The url for the github pages site is: `https://hackforla.github.io/CivicTechJobs/` (the website you are reading this on right now).

Our github repo is set to publish the docs to Github Pages using the `gh-pages` branch. This setting can be configured in the project's [Pages settings](https://github.com/hackforla/CivicTechJobs/settings/pages).

External Resources:

- [MkDocs Documentation | deployment instructions](https://www.mkdocs.org/user-guide/deploying-your-docs/)
- [Github Pages documentation](https://docs.github.com/en/pages/quickstart)

Relevant PR and Issue:

- [Fix mkdocs deployment #456](https://github.com/hackforla/CivicTechJobs/issues/456)
- [Feat/fix mkdocs #592](https://github.com/hackforla/CivicTechJobs/pull/592)

The docs are set to automatically deploy to github pages using the `mkdocs-build.yml` github action. This action builds the mkdocs and saves the static files into the `gh-pages` branch.

### Github Action for mkdocs deployment

Links to the github action: [Build MkDocs site](https://github.com/hackforla/CivicTechJobs/actions/workflows/mkdocs-build.yml)

```yml
name: Build MkDocs site

on:
  push:
    branches:
      - main
    paths:
      - "mkdocs/**/**.md"
      - "mkdocs/mkdocs.yml"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  deploy-docs:
    runs-on: ubuntu-latest
    if: github.actor != 'github-actions[bot]'
    steps:
      - uses: actions/checkout@v4
      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com
      - uses: actions/setup-python@v5
        with:
          python-version: 3.x
      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV
      - uses: actions/cache@v4
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-
      - name: Install Dependencies
        run: pip install \
          mkdocs-material==9.1.17 \
          mkdocs-autolinks-plugin==0.7.1
      - name: Publish docs
        run: |
          cd mkdocs
          mkdocs gh-deploy --force
```

Workflow Overview

- `name: Build MkDocs site` - The name of this workflow is "Build MkDocs site."
- `on: push: - main` - The workflow is triggered when there’s a push to the `main` branch.
- `paths: ...` - The workflow will only run if the files being pushed are Markdown files (`.md`) or the `mkdocs.yml` configuration file inside the mkdocs directory.
- `workflow_dispatch:` - This allows manual triggering of the workflow via the GitHub Actions interface.
- `permissions: contents: write` - This grants the action permission to write contents to the repository. It's needed for deploying the site, which requires pushing to the `gh-pages` branch.
- `runs-on: ubuntu-latest` - This specifies that the job will run on the latest Ubuntu environment provided by GitHub Actions.
- `if: github.actor != 'github-actions[bot]'` - This condition ensures that the job doesn’t trigger if the GitHub Actions bot is the one making the changes. This prevents infinite loops where the action keeps triggering itself.
- `uses: actions/checkout@v4` - This step checks out the repository code so the workflow can access the files.
- `run: git config user.name github-actions[bot]` - Configures Git to use the `github-actions[bot]` user for any commits or pushes that may happen during the deployment.
- `git config user.email 41898282+github-actions[bot]@users.noreply.github.com` - Sets the email for the github-actions[bot] user.
- `uses: actions/setup-python@v5` - This sets up a Python environment in the GitHub runner, which is necessary for installing and running MkDocs.

Set environment variable for caching

- `run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV`
- This step sets an environment variable called `cache_id` to the current week of the year (`%V`). This value will be used as the key for caching to ensure that the cache is updated weekly.

Cache dependencies

- `uses: actions/cache@v4` - This step caches dependencies (to speed up future builds) in the .cache directory.
- `with: key: mkdocs-material-${{ env.cache_id }}` - The cache key is based on the cache_id, so the cache is refreshed weekly.
- `path: .cache` - Specifies that the cache should be stored in the .cache directory.
- `restore-keys: mkdocs-material-` - This allows for fallback caching if an exact cache match is not found.

Install Dependencies

- `run: pip install mkdocs-material==9.1.17 mkdocs-autolinks-plugin==0.7.1`
- This installs the necessary dependencies for MkDocs to work. In this case:
- `mkdocs-material==9.1.17`: A popular theme for MkDocs.
- `mkdocs-autolinks-plugin==0.7.1`: A plugin that automatically creates links between pages in your documentation based on their titles.

Publish Documentation

- `run: cd mkdocs && mkdocs gh-deploy --force`
- first it changes to the `mkdocs/` directory.
- then it deploys the MkDocs site to GitHub Pages using `mkdocs gh-deploy --force`. The `--force` flag ensures that the contents of the GitHub Pages branch (`gh-pages`) are overwritten with the latest deployment.

##### Summary
This workflow automates the process of building and deploying a MkDocs site when changes are pushed to the `main` branch. It does the following:

1. Checks out the repository and configures Git for pushing changes.
2. Sets up Python and installs the necessary MkDocs dependencies.
3. Caches dependencies to speed up future builds.
4. Deploys the site to GitHub Pages using mkdocs `gh-deploy`.

This workflow ensures the documentation is always up to date and available on GitHub Pages whenever changes are made to relevant Markdown files or the MkDocs configuration.