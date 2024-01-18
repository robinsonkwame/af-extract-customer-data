# af-extract-customer-data
A docker based mono service that uses Cypress to export or copy customer related data from disparate platforms used by Artisanal Futures (AF) related users. 

## Setup
```
export CYPRESS_CACHE_FOLDER=./cypress_cache_folder && npm install
```

## Setup platform click throughs and customer data export
```
npm run testrunner # luanches Cypress Studio
 # Using Cypress Studio, type in a series of platform urls, point and click your way
 # within the platform to export, via email or file download, customer data
```
