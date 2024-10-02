# How to Edit MkDocs

To make changes to the docs, you have to edit the `.md` files located in the `mkdocs/docs/` folder. To make a new page, you have to create a new `.md` file in the appropriate folder.

MkDocs provides a development server that makes it convenient to see your changes in `localhost` before you deploy them to github.

### Quickstart

To start the development server, simply go to the root of your project in the terminal and run the following command:

```bash
docker-compose -f docker-compose.docs.yml up --watch
```

Next, go to `http://localhost:8005` in your browser.

Now when you save new changes to the `.md` files, the respective page will automatically be updated in the browser.

When you are done editing, the next step is to deploy your changes.

### Deploying your changes

When you are satisfied with your edits, make a pull request so that they can be reviewed.

Once the pull request is approved and merged into `develop`, the changes will be automatically deployed to the official CivicTechJobs documentation site (the site you are reading this page in right now). That's it!

If anything goes wrong, you can investigate the workflow in the project's [github actions page](https://github.com/hackforla/CivicTechJobs/actions)

**Note**: At the moment, the docs are set to deploy from the `develop` branch, using the github action located in `mkdocs-build.yml`. This means that whenever a file is changed inside the `mkdocs/` directory, and is merged into the `develop` branch on github, the changes will be automatically deployed to the official site hosted on github pages. In the near future we will set it to deploy from the `main` branch.

### Recap

To sum it all up, you can make changes in 4 easy steps:

1. Start the development server using `docker-compose -f docker-compose.docs.yml up --watch`
2. Make changes to the `.md` files and observe them in `http://localhost:8005`
3. Open a Pull Request with your new changes
4. Merge the Pull Request into the `develop` branch
