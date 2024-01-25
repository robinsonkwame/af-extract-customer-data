import pandas as pd
import glob
import json
import os

def process_customer_data(directory):
    # Read the CSV file
    file_path = glob.glob(os.path.join(directory, '*.csv'))[0]
    df = pd.read_csv(file_path, skip_blank_lines=False, header=None)

    # Initialize variables
    customer_name = None
    phone_numbers = []
    aux_data = []
    order_data = []
    json_rows = []

    # Iterate over the DataFrame
    for index, row in df.iterrows():
        # Check if the row is empty (i.e., it's a separator between customers)
        if row.isnull().all():
            if customer_name is not None:
                # Append the customer data to the list of JSON rows
                json_rows.append({
                    'customer_name': customer_name,
                    'phone_numbers': phone_numbers,
                    'aux_data': aux_data
                })
            # Reset variables for the next customer
            customer_name = None
            phone_numbers = []
            aux_data = []
            continue

        # Check if the row contains a customer name
        if customer_name is None:
            customer_name = row.iloc[0]
            continue

        # Check if the row contains a phone number or auxiliary data
        if len(row) == 1:
            # todo: make phone number like detector
            # phone_numbers.append(row.iloc[0])
            aux_data.append(row.iloc[0])
        else:
            # we're at a data section
            order_data.append(row.to_dict())

        json_rows.append(
            aux_data
        )

        json_rows.append(
            order_data
        )


    # Convert the list of dictionaries to JSON
    json_data = json.dumps(json_rows, indent=4)

    return json_data

# "../extract-customer-data/cypress/downloads"
print(
    process_customer_data(
        "./"
    )
)