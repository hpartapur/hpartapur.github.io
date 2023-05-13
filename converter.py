import pandas as pd

# Read the Excel file
df = pd.read_excel('Copy of jamiat names.xlsx')

# Initialize an empty dictionary to store the arrays
arrays = {}

# Iterate over the columns (regions)
for column in df.columns:
    # Get the cities for the current region as a list
    cities = df[column].tolist()

    # remove empty from list
    cities = [x for x in cities if str(x) != 'nan']
    
    # Add the list of cities to the dictionary with the region name as the key
    arrays[column] = cities

# Convert the dictionary to a list of lists
result = [array for array in arrays.values()]


# Print the resulting list of lists
print(result)

print (len(result))