const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    browser: 'chrome',
    downloadsFolder: '/e2e/cypress/downloads',
    testingType: 'e2e',
    supportFile: false,
    specPattern: '/e2e/cypress/integration/**/*.cy.{js,jsx,ts,tsx}'
  },
});
