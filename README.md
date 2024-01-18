# af-extract-customer-data
A docker based mono service that uses Cypress to export or copy customer related data from disparate platforms used by Artisanal Futures (AF) related users. 

## Setup Containerized Customer Extraction

### Step 1: Install and Launch Cypress Studio

```
export CYPRESS_CACHE_FOLDER=./cypress_cache_folder && npm install
npm run testrunner # launches Cypress Studio
```

### Step 2: Use Cypress Studio to navigate to the `start_here.cy.js`
```
# Chose E2E
# Chose Chrome
# Select start_here.cy.js
# Note that Chrome is configured to download to directory a
```

### Step 3: Use Cypress Studio to navigate customer platforms, enter credentials, and instrument the browser to export customer data (typically download to disk)
```
# Use Cypress Studio, for example, see [here](https://docs.cypress.io/guides/references/cypress-studio#Step-3---Interact-with-the-Application)
# ... to point and click and download any customer data within the platform
```
Note: that these script will contain the user's credentials, it is important to keep the container in a security controlled environment.