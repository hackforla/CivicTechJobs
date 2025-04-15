# ESLint Guide - CTJ

The purpose of this page is to document how our ESLint setup is configured. ESLint is responsible for linting the frontend portion of our application.

## ESLint Configuration Documentation for Frontend Developers

Our ESLint configuration is tailored to help us maintain a clean, consistent codebase with special attention to React, TypeScript, Tailwind CSS, and accessibility standards. Below is an overview of the main components and rules in the configuration and how they function.

### Plugins and Extensions
This configuration uses several plugins to enhance linting capabilities:

1. **@eslint/js** - Provides basic JavaScript linting rules.
2. **typescript-eslint** - Adds TypeScript support, integrating rules to enforce TypeScript-specific syntax and best practices.
3. **eslint-plugin-react** - Adds React-specific linting rules to ensure best practices with JSX.
4. **eslint-plugin-prettier** - Enforces code formatting consistency, using Prettier's rules.
5. **eslint-plugin-tailwindcss** - Adds rules specific to Tailwind CSS, helping with class management and preventing misconfigured or conflicting classes.
6. **eslint-plugin-react-hooks** - Enforces React Hooks rules, including hook dependency checking.
7. **eslint-plugin-jsx-a11y** - Adds accessibility rules for JSX, ensuring the markup adheres to accessibility standards.

### Key Configuration Options

1. **File Matching**  
   The configuration applies to all JavaScript, JSX, TypeScript, and TSX files in the project, matching the following patterns:
   - `**/*.js`
   - `**/*.jsx`
   - `**/*.ts`
   - `**/*.tsx`

2. **Global Environment**  
   Sets up global variables specific to browser environments to avoid undefined variable errors.

3. **React Settings**  
   Automatically detects the version of React being used, which optimizes the linting experience.

4. **Rules**

   - **General Rules:**
     - `no-unused-vars`: Warns about variables defined but not used.
     - `no-console`: Warns when `console` statements are used in production code.
     - `indent`: Enforces a 2-space indentation style for code consistency.
     - `no-irregular-whitespace`: Prevents errors caused by unexpected whitespace.

   - **Prettier Integration**:  
     - `prettier/prettier`: Enforces Prettier's formatting rules for a consistent code style.

   - **React-Specific Rules:**
     - `react/no-unescaped-entities`: Disabled globally. To bypass, use `/* eslint-disable react/no-unescaped-entities */` at the top of a file when necessary.
     - `react-hooks/rules-of-hooks`: Ensures hooks are only used within functional components and custom hooks.
     - `react-hooks/exhaustive-deps`: Warns about missing dependencies in effect hooks.

   - **TypeScript Rules:**
     - `@typescript-eslint/no-unused-vars`: Flags unused variables in TypeScript code as errors.

   - **Tailwind CSS Rules:**
     - `tailwindcss/no-contradicting-classname`: Prevents usage of conflicting Tailwind CSS classes.
     - `tailwindcss/no-unnecessary-arbitrary-value`: Warns about arbitrary values in Tailwind that could be simplified.
     - `tailwindcss/classnames-order`: Enforces consistent order of Tailwind CSS classes.

   - **Accessibility Rules (JSX A11y)**:
     - `jsx-a11y/alt-text`: Ensures all `img` elements have an `alt` attribute for accessibility.

5. **Ignored Files and Folders**
   - Certain files and folders are ignored to avoid unnecessary linting errors, such as `node_modules/`, config files (`*.config.js`), and mock data in `tests/__mocks__`.

### Notes on Using ESLint in Development

- **Disabling Rules Temporarily**: If you encounter specific rule warnings or errors that are intentional or irrelevant to your case, you can disable rules at the file or line level using `// eslint-disable` comments.
- **Testing New Plugins or Rules**: When new plugins or rules are added, test them in a few sample files to ensure compatibility and expected behavior.

### Running Linter and Formatter
To help maintain consistent code quality and style across the project, we’ve set up commands for both linting and formatting. Here’s how to use them:

### Linting:

Run the linter using `npm run lint`. This command will analyze all files in the project for potential linting issues. It will attempt to auto-fix any issues it can and will display whether the code passed or failed the check.
If there are any issues that cannot be auto-fixed, the output will provide details so they can be manually reviewed and addressed.

### Formatting:

Run the formatter using `npm run format`. This command will format all JavaScript, TypeScript, and JSON files in the project, skipping any files specified in .gitignore.
These steps help ensure a consistent coding style across the project, minimizing style-related issues and making code easier to read and maintain.
  
This ESLint setup ensures our codebase is both clean and accessible, while supporting best practices in React, TypeScript, and Tailwind CSS usage. For any adjustments to the rules or extensions, reach out to the team for further guidance.

### Recommended Extensions for VS Code
To ensure consistent code quality and style across the team, please install the following extensions in Visual Studio Code:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Additional Resources

[Documentation - ESLint - Pluggable JavaScript Linter](https://eslint.org/docs/latest/)
[What is Prettier? · Prettier](https://prettier.io/docs/)