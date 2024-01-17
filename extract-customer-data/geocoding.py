import os
import json
from shapely.geometry import Point, shape

# Load environment variables
CUSTOMER_DATA_PATH = os.getenv('CUSTOMER_DATA_PATH')
POLYLINE_PATH = os.getenv('POLYLINE_PATH')

def load_polyline():
    with open(POLYLINE_PATH, 'r') as file:
        polyline = json.load(file)
    return shape(polyline)

def load_customer_data():
    with open(CUSTOMER_DATA_PATH, 'r') as file:
        data = json.load(file)
    return data

def categorize_customers(polyline, data):
    categorized_customers = {'west': [], 'east': []}
    for customer in data:
        point = Point(customer['longitude'], customer['latitude'])
        if point.within(polyline):
            categorized_customers['west'].append(customer)
        else:
            categorized_customers['east'].append(customer)
    return categorized_customers

def save_categorized_customers(categorized_customers):
    with open(CUSTOMER_DATA_PATH, 'w') as file:
        json.dump(categorized_customers, file)

if __name__ == '__main__':
    polyline = load_polyline()
    data = load_customer_data()
    categorized_customers = categorize_customers(polyline, data)
    save_categorized_customers(categorized_customers)
