import pandas as pd
import glob
import json
import os

def process_customer_data(directory):
    # Read the CSV file
    file_path = glob.glob(os.path.join(directory, '*.csv'))[0]
    df = pd.read_csv(file_path, skip_blank_lines=False)

    # Initialize variables
    customer_name = None
    json_rows = []

    # Iterate over the DataFrame
    for index, row in df.iterrows():
        print(row)
        # Check if the row is empty (i.e., it's a separator between customers)
        if row.isnull().all():
            continue

        # Check if the row contains a customer name
        if pd.isnull(row[0]):
            customer_name = row.iloc[0]
            continue

        # Check if the row contains order data
        if not pd.isnull(row[0]):
            # Create a dictionary with the required fields
            order_data = {
                'customer_name': customer_name,
                'order_date': row[0],
                'order_status': row[1],
                'payment_status': row[2],
                'product': row[3],
                'fulfillment_type': row[4],
                'fulfillment_name': row[5],
                'fulfillment_address': row[6]
            }

            # Append the dictionary to the list of JSON rows
            json_rows.append(order_data)

    # Convert the list of dictionaries to JSON
    json_data = json.dumps(json_rows, indent=4)

    return json_data

print(
    process_customer_data(
        "../extract-customer-data/cypress/downloads"
    )
)