Welcome to the project! Below you'll find a detailed manual for the various scripts included in this project. Each script serves a specific purpose to help you build, test, lint, format, and run your project efficiently. 🚀

## Available Scripts

### 1. Build 🛠️

_Command:_ `npm run build`

This script compiles your TypeScript files into JavaScript using the TypeScript compiler (`tsc`).

### 2. Test :test_tube:

Command: npm run test
This script first builds the project and then runs the tests using Jasmine. It's a two-step process to ensure your code is compiled before testing.

```sh
npm run test
```

### 3. Lint :mag:

Command: npm run lint
This script runs ESLint to analyze your code for potential errors and enforce coding standards.

```sh
npm run eslint
```

### 4. Prettier :sparkles:

Command: npm run prettier
This script formats your JavaScript files according to the configuration specified in .prettierrc.

```sh
npm run prettier
```

### 5. Jasmine :cherry_blossom:

Command: npm run jasmine
This script runs the Jasmine test suite. Use this if you only want to run the tests without building the project first.

```sh
npm run jasmine
```

### 6. Start :rocket:

Command: `npm run start`
This script starts your project using nodemon, which automatically restarts the server whenever file changes in the directory are detected.

```sh
npm run start
```

## How to Use

1. Install Dependencies: Make sure you have all the necessary dependencies installed by running:

```sh
npm install
```

2. Run Scripts: Use the commands listed above to build, test, lint, format, and start your project.

## Additional Notes

- Ensure you have npx, npm, tsc, eslint, prettier, jasmine, and nodemon installed globally or locally in your project.
- Customize the .prettierrc and ESLint configuration files to match your coding standards.

  Happy coding! :tada:
