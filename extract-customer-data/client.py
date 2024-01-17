import os
import json
from prisma import Client

# Load environment variables
CUSTOMER_DATA_PATH = os.getenv('CUSTOMER_DATA_PATH')
PRISMA_ENDPOINT = os.getenv('PRISMA_ENDPOINT')
PRISMA_SECRET = os.getenv('PRISMA_SECRET')

# Initialize Prisma client
client = Client(PRISMA_ENDPOINT, PRISMA_SECRET)

def load_customer_data():
    with open(CUSTOMER_DATA_PATH, 'r') as file:
        data = json.load(file)
    return data

def push_customers_to_prisma(data):
    for category in ['west', 'east']:
        for customer in data[category]:
            client.create({
                'id': customer['id'],
                'name': customer['name'],
                'email': customer['email'],
                'category': category
            })

if __name__ == '__main__':
    data = load_customer_data()
    push_customers_to_prisma(data)