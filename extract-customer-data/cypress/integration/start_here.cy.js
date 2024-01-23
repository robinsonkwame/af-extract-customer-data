describe('Customer Data Extraction', () => {

  const blockedDomains = [
    'https://browser-intake-datadoghq.com',
  ];

  beforeEach(() => {
    cy.intercept('*', (req) => {
      const absoluteUrl = req.url.startsWith('http') ? req.url : `${req.headers.origin}${req.url}`;

      // Check if the URL contains any of the blocked domains
      if (blockedDomains.some(domain => absoluteUrl.includes(domain))) {
        // Block the request
        req.destroy();
      }
    });
  });

  it('should navigate to various platforms, enter credentials, export customer data, either to an email address or by writing to disk\n\nIMPORTANT:\n\nMANUALLY ADD CY.WAIT(Cypress.env(\'waitForEnv\'));// at end of script\n', () => {
    // Move this to end of script so that browser stays open
    // long enough for browser to download file at end of test
    //
    // cy.wait(Cypress.env('waitForEnv))
  });

  afterEach(() => {
    // NOW WE CHECK THAT ANY FILE WAS DOWNLOADED 
    const downloadsFolder = Cypress.config('downloadsFolder')
    const mask = `${downloadsFolder}/*.csv`

    cy.task('findFiles', mask).then((foundCustomers) => {
      cy.log(`found download ${foundCustomers}`)
      expect(foundCustomers).to.be.a('string')
    })
  });
})