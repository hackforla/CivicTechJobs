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
│   └── mkdocs.yml # Docs
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

_<p style="text-align: center;">mkdocs Directory structure</p>_

### Summary

The MkDocs "sub-project" lives in the `mkdocs/` folder. A development server can be run using the `docker-compose.docs.yml` compose script. The mkdocs is set to automatically deploy to github pages using the `mkdocs-build.yml` github action.


### Docker MkDocs

It is important to note that we are using Hack for LA's prebuilt docker mkdocs image for convenient setup. Please see the resources below for more information:

- https://github.com/hackforla/docker-mkdocs
- https://hackforla.github.io/docker-mkdocs/
- https://hub.docker.com/r/hackforlaops/mkdocs

This prebuilt docker image makes it easy to get a mkdocs development server running with one command, without having to install python or mkdocs dependencies on your local machine.


