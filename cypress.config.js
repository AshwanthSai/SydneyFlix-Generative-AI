const { defineConfig } = require("cypress");

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
    tmdbTestEmail: 'test@Sydneflix',
    tmdbTestPassword: 'test@Sydneflix',
  },
});
