const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    downloadsFolder: 'cypress/downloads',
    trashAssetsBeforeRuns: true,
    specPattern: './cypress/integration/actual-start_here.cy.js',
    supportFile: false,
    setupNodeEvents (on, config) {
        config.env.waitForEnv = 1e3 * parseInt(process.env.WAIT_FOR_THIS_NUMBER_OF_SECONDS) || 10e3;
        on('task', {
          async findFiles (mask) {
            const globbyModule = await import('globby');
            let response = null

            if (!mask) {
              throw new Error('Missing a file mask to search')
            }

            console.log('searching for files in %s', mask)
            const list = await globbyModule.globby(mask)

            if (list.length) {
              console.log('found %d files, first one is %s', list.length, list[0])
              response = list[0]
            }
            return response
          }
        });

        return config;
    }
  },
});
