# Backend

## Requirements

To run and develop this project, you will need Node.js and npm installed.

### Node Installation

- #### Windows and Mac OS

  Download the installer from the [official Node.js website](https://nodejs.org/) and follow the installation instructions.  
  This will also install npm.

- #### Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

  ```bash
  $ sudo apt install nodejs
  $ sudo apt install npm
  ```

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following commands to see what version you have installed.

```bash
$ node -v
v12.14.0

$ npm -v
6.13.4
```

The above versions are what have been used for development, however, other versions may also work.

---

## Setup

After forking the repo, clone and redirect to the backend folder.

```bash
$ git clone https://github.com/<github-username>/git-brunching
$ cd git-brunching/backend
```

Install all required dependencies by running

```bash
$ npm i
```

---

## Run Commands

#### Production

`$ npm start`

- This will build then run the project for production.
- The connection address will be displayed in the console.

#### Development

`$ npm run dev`

- This will build the project for development use.
- Nodemon will monitor the project files and automatically restart the server whenever new changes are saved.
- The connection address will be displayed in the console.

#### Testing

`$ npm run test`

- Run all unit tests and display a report.

#### Linting

`$ npm run lint`

- This will inspect all files and report any linting issues.
- This project follows the popular [Airbnb style guide.](https://github.com/airbnb/javascript)

`$ npm run lintfix`

- Attempts to autofix any linting violations.  
  \*Note. This may not be able to fix everything. Which means you will need to manually fix them.

Before making a pull request. Please ensure your code passes all tests and linting.  
Prettier is an optional extension for most common IDE's. This will help with formatting/linting as you code.

---

## File Structure

Please follow the existing file structure.

#### Create a new endpoint

- Create a new file in the 'routes' folder. The file name should reflect the endpoint.
- All routes should start with:

  ```javascript
  import express from 'express';

  const router = express.Router();
  ```

- Keep all GET, POST, PATCH and DELETE methods inside this one folder
- Export the new route with:
  ```javascript
  export default router;
  ```
- There is an example 'exampleEndpoint.js' to refer to.

#### Mounting the endpoint

- Import your new endpoint into app.js. This should be done under the `// Routes` comment by using:
  ```javascript
  import <endpointName> from './routes/<endpointFileName>';
  ```
- Under the `// Inject all routes` comment, add your new endpoint to the app.
  ```javascript
  app.use('/<url/path/to/call/endpoint>', <endpointName>);
  ```
