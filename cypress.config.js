const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    downloadsFolder: 'cypress/downloads',
    trashAssetsBeforeRuns: true,
    experimentalStudio: true,
    specPattern: './extract-customer-data/cypress/integration/start_here.cy.js',
    setupNodeEvents (on, config) {
        const waitForEnv = process.env.WAIT_FOR_THIS_NUMBER_OF_SECONDS || 10;
        on('task', {
          async findFiles (mask, waitFor = waitForEnv) {
            const globbyModule = await import('globby');
            let response = null

            if (!mask) {
              throw new Error('Missing a file mask to search')
            }

            // sleep and then check if file is there
            await new Promise(r => setTimeout(r, waitFor));

            console.log('searching for files %s', mask)
            const list = await globbyModule.globby(mask)

            if (list.length) {
              console.log('found %d files, first one %s', list.length, list[0])
              response = list[0]
            }
            return response
          }
        })
    }
  },
});
