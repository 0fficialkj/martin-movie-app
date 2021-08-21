# Welcome to Martin's Movie App!

In this `README.md` file, there will be intructions on how to set up the app locally.

## Prerequisites

1. Node.js

## Quick start

### Clone and install

```sh
# Clone
$ git clone
$ cd martin-movie-app

# Install dependencies
$ npm install
```

### Local setup

Create a `.env` file in the root directory of the project.

```sh
# Add these variables
# API key will be sent to you directly for security purposes
REACT_APP_MOVIE_DATABASE_API_URL=https://api.themoviedb.org/3/discover/movie?api_key=
REACT_APP_MOVIE_DATABASE_API_KEY=
```

### Run!

This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```sh
# In the project directory, you can run:
$ npm start
```

### Test

This launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```sh
# In the project directory, you can run:
$ npm test
```

### Build

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```sh
# In the project directory, you can run:
$ npm run build
```
