# How to Publish new Documentation

The goal of this page is to document how to create and publish new changes to the CTJ documentation.

Writing documentation into mkdocs requires some knowledge of [Markdown](https://www.markdownguide.org/).

### Making changes to the mkdocs

What you essentially need to know:

- To make changes to the docs, edit the `.md` files located in the `mkdocs/docs/` folder.
- To make a new page, create a new `.md` file in the appropriate folder.
- To add or edit links in the navmenu, configure the `mkdocs.yml` file.

MkDocs provides a development server that makes it convenient to see your changes in `localhost` before you deploy them to github.

*For more a detailed editing guide please see the official [MkDocs Tutorial](https://www.mkdocs.org/getting-started/)*

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

Once the pull request is approved and the code is merged into the `main` branch, the changes will be automatically deployed to the official CivicTechJobs documentation site (the site you are reading this page in right now). That's it!

If anything goes wrong, you can investigate the workflow in the project's [github actions page](https://github.com/hackforla/CivicTechJobs/actions)

*Check out our [MkDocs Architecture](mkdocs-architecture.md) page for more details on how it all fits together.*

### Recap

To sum it all up, you can make changes in 4 easy steps:

1. Start the development server using `docker-compose -f docker-compose.docs.yml up --watch`
2. Make changes to the `.md` files and observe them in `http://localhost:8005`
3. Open a Pull Request with your new changes
4. Merge the Pull Request into the `main` branch
