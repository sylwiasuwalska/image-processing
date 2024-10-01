Welcome to the project! Below you'll find a detailed manual for the various scripts included in this project. Each script serves a specific purpose to help you build, test, lint, format, and run project efficiently. 🚀

## Available Scripts

### 1. Build 🛠️

_Command:_ `npm run build`

This script compiles TypeScript files into JavaScript using the TypeScript compiler (`tsc`).

### 2. Test :test_tube:

Command: npm run test
This script first builds the project and then runs the tests using Jasmine. It's a two-step process to ensure code is compiled before testing.

```sh
npm run test
```

### 3. Lint :mag:

Command: npm run lint
This script runs ESLint to analyze code for potential errors and enforce coding standards.

```sh
npm run eslint
```

### 4. Prettier :sparkles:

Command: npm run prettier
This script formats JavaScript files according to the configuration specified in .prettierrc.

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
This script starts project using nodemon, which automatically restarts the server whenever file changes in the directory are detected.

```sh
npm run start
```

## How to Use

1. Install Dependencies: Make sure you have all the necessary dependencies installed by running:

```sh
npm install
```

2. Run Scripts: Use the commands listed above to build, test, lint, format, and start project.

3. Run `npm run build` to build project and run `node dist/index.js` to start production version available locally under localhost:3000.

4. Images that are available to resize: `santamonica`, `fjord`, `icelandwaterfall`, `palmtunnel`, `encenadaport`

5. URL for resizing: `http://localhost:3000/api/resize?image=fjord&width=200&height=800` - you can try width and height parameters of your choice.

## Additional Notes

- Ensure you have npx, npm, tsc, eslint, prettier, jasmine, and nodemon installed globally or locally in your project.
- Customize the .prettierrc and ESLint configuration files to match your coding standards.

Happy coding! :tada:
