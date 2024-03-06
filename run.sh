#!/bin/bash

cd extract-customer-data && docker build -t extract-customers -f Dockerfile.cypress . && cd ..
docker run -e WAIT_FOR_THIS_NUMBER_OF_SECONDS=10 --rm -v $(pwd)/cypress/downloads:/e2e/cypress/downloads extract-customers

# Check if an argument is provided
if [ "$#" -eq 1 ]; then
    DEST_PATH="$1"
    # Move *.csv files from cypress and its subdirectories to the specified path
    find ./cypress -type f -name "*.csv" -exec mv {} "$DEST_PATH" \;
else
    echo "No path provided, files will not be moved."
fi

