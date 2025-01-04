const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    projectId: (process.env?.PROJECT_ID?? process.env?.GITHUB_PROJECT_ID) || '',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      //To log to console. Used for debugging
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
  env: {
    TMDB_TEST_EMAIL: (process.env?.TMDB_TEST_EMAIL?? process.env?.GITHUB_TMDB_TEST_EMAIL) || '',
    TMDB_TEST_PASSWORD: (process.env?.TMDB_TEST_PASSWORD ?? process.env?.GITHUB_TMDB_TEST_PASSWORD) || '',
  },
});


