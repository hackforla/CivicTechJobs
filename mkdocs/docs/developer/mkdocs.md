# MkDocs guide

We are using mkdocs to handle documentation.

Developers should document their architectural and coding decisions in here, so that other team members can easily reference these docs whenever they are lost or confused or new to the project.

### What is MKdocs?

[MkDocs](https://www.mkdocs.org/) is a static site generator that is designed specifically for building project documentation. It allows you to write documentation using [Markdown](https://www.markdownguide.org/), a lightweight markup language that's easy to use, and generates a clean, professional website that can be hosted on our project's GitHub Pages.

### What should developers document?

Code functionality

- Document the purpose and functionality of the code you write. Describe what each module, class, or function does, especially if it might not be obvious at first glance.
- Example: If you implement a new API endpoint, document what the endpoint does, the request and response formats, and any important business logic involved.

Setup Instructions

- Make sure to document how to set up the project or new features you add. Include all dependencies, environment variables, and steps to get the project running locally or in production.
- Example: If you introduce a new tool like Docker or a new package, make sure to document how to install and configure it.

Common Use Cases

- Document common or important use cases for the code. This is especially useful for other developers who might use your code in the future.
- Example: If you build a new utility or library, include examples showing how it should be used.

Troubleshooting

- Include a section for common issues and how to resolve them. This can be a lifesaver for both new developers and anyone maintaining the project.
- Example: Document errors or challenges you faced during development and their solutions.

Code Examples

- Where applicable, provide sample code or snippets to explain usage. These examples help future developers quickly understand how to use your components or functions.
- Example: If you write a custom hook in React, include an example of how it can be used in a component.

API Documentation

- Ensure that all APIs (REST or GraphQL) have detailed documentation on endpoints, parameters, return types, and possible error codes.
- Example: For each API endpoint, include descriptions of what it does, what data it expects, and the structure of its responses.

### What are best practices for documentation?

Keep it updated and consistent. Be clear and concise. Write in simple terms. Use examples.
