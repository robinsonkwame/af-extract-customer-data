import os
import json
import requests

# Load environment variables
CUSTOMER_DATA_PATH = os.getenv('CUSTOMER_DATA_PATH')

# Load credentials
with open('/path/to/credentials.json', 'r') as file:
    credentials = json.load(file)

def download_customer_data():
    # Define the URL of the user platform
    url = os.getenv('CYPRESS_USER_PLATFORM_URL')

    # Define the headers for the request
    headers = {
        'Content-Type': 'application/json'
    }

    # Define the payload for the request
    payload = {
        'username': credentials['username'],
        'password': credentials['password']
    }

    # Send a POST request to the user platform
    response = requests.post(url, headers=headers, data=json.dumps(payload))

    # If the request was successful, save the data
    if response.status_code == 200:
        with open(CUSTOMER_DATA_PATH, 'w') as file:
            json.dump(response.json(), file)
    else:
        print(f'Error: {response.status_code}')

if __name__ == '__main__':
    download_customer_data()