# af-extract-customer-data
A docker based mono service that uses Cypress to export or copy customer related data from disparate platforms used by Artisanal Futures (AF) related users. 

## Setup Containerized Customer Extraction

### Step 0: Clone this repository
```
git clone https://github.com/robinsonkwame/af-extract-customer-data.git
```
### Step 1: Install and Launch Cypress Studio

**Note**: The script that you are modifying will contain the user's credentials, it is important to keep the container in a security controlled environment.

```
cd af-extract-customer-data
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
# ... it may also helpful to manually add urls that you know contain locations to navigate to, such as `cy.get('a[href*="orders"]').click()``
```
**Note**: that these script will contain the user's credentials, it is important to keep the container in a security controlled environment.

### Step 4: Uncomment the cy.wait() call at the end fo the script.
```
# ... uncomment the cy.wait() at end of script; this allows the browser to wait for the async download call to complete
# and save the start_here.cy.js script!
```

### Step 5: Edit and run ./setup_cron.sh to fetch new customers daily
```
./setup_cron.sh # you can pass a path to move too, as well; now we'll run this script once a day!
```
