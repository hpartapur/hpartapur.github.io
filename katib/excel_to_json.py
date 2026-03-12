import pandas as pd

# Load your Excel file
file_path = 'translations.xlsx'  # Change this to your file path
df = pd.read_excel(file_path)

# Ensure the data is in two columns (English and Arabic)
df.columns = ['Key', 'Translation']  # Adjust column names if necessary

# Filter out rows where the 'translation' column is null or empty
df = df[df['Translation'].notnull() & (df['Translation'].str.strip() != '')]

# Convert the data into a list of dictionaries
json_list = [{"english": row['Key'], "arabic": row['Translation']} for index, row in df.iterrows()]

# Print the JSON-like structure
print("LIST = ", json_list)