// cypress/integration/start_here.cy.js

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


  it('should navigate to various platforms, enter credentials, export customer data, either to an email address or by writing to disk', () => {
  })
})