const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    browser: 'chrome',
    downloadsFolder: 'cypress/downloads',
    testingType: 'e2e',
    supportFile: false,
    specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}'
  },
});
