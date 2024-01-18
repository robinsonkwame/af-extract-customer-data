const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testingType: 'e2e',
    experimentalStudio: true,
    specPattern: './extract-customer-data/cypress/integration/**/*.cy.{js,jsx,ts,tsx}'
  },
});
