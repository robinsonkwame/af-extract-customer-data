const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // see issue 1 (https://github.com/robinsonkwame/af-extract-customer-data/issues/1)
    setupNodeEvents(on, config) {
        // Download to ./extract-customer-data instead'before:browser:launch'
        on('before:browser:launch', (browser, launchOptions) => {
          if (browser.family === 'chromium' && browser.name !== 'electron') {
            // Define the custom download directory
            const downloadDirectory = './extract-customer-data/cypress/downloads';

            // Set Chrome preferences for downloads
            launchOptions.preferences.default['download'] = {
              'prompt_for_download': false,
              'directory_upgrade': true,
              'default_directory': downloadDirectory
            };

            return launchOptions;
          }
        });

        return config;
    },
    // see issue 1 (https://github.com/robinsonkwame/af-extract-customer-data/issues/1)
    downloadsFolder: './extract-customer-data/cypress/downloads',
    testingType: 'e2e',
    experimentalStudio: true,
    specPattern: './extract-customer-data/cypress/integration/**/*.cy.{js,jsx,ts,tsx}'
  },
});
