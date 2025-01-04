const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
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
    tmdbTestEmail: (process.env?.tmdbTestEmail ?? secrets?.GITHUB_TMDB_TEST_EMAIL) || '',
    tmdbTestPassword: (process.env?.tmdbTestPassword ?? secrets?.GITHUB_TMDB_TEST_PASSWORD) || '',
    projectId: (process.env?.projectId ?? secrets?.GITHUB_PROJECT_ID) || '',
    cypressRecordKey: (process.env?.cypressRecordKey ?? secrets?.GITHUB_CYPRESS_RECORD_KEY) || ''
  },
});


