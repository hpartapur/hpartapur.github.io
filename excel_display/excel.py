import pandas as pd
import arabic_reshaper
from bidi.algorithm import get_display
# Read the Excel file
data = pd.read_excel('zeroscanned.xlsx')

# Display the data
print(data)

#take the header and final row, and combine their values into a dictionary, and then print the dictionary
header = data.columns.values.tolist()
final_row = data.iloc[-1].values.tolist()
dictionary = dict(zip(header, final_row))

#remove the items in which the value is NaN
dictionary = {k: v for k, v in dictionary.items() if pd.notnull(v)}
print(dictionary)
import matplotlib.pyplot as plt
from io import BytesIO
import base64



# Extract the keys and values from the dictionary
keys = list(dictionary.keys())
values = list(dictionary.values())

# Generate the bar chart
plt.bar(keys, values)
plt.xlabel('ككنتي')
plt.ylabel('غير حاضرين مؤمنين')
plt.title('رثثورضض')

# Convert the chart to an image
image_stream = BytesIO()
plt.savefig(image_stream, format='png')
image_stream.seek(0)
image_base64 = base64.b64encode(image_stream.getvalue()).decode('utf-8')

# Generate the HTML content
html_content = '''
<!DOCTYPE html>
<html>
  <head>
  <link rel="stylesheet" href="style.css">
    <meta charset="UTF-8">
    <title>Clustered Bar Chart</title>
  </head>
  <body>
    <h1 dir=rtl>كتنا مؤمنين يه scan نتهي كرايو</h1>
    <img src="data:image/png;base64,{}" alt="Clustered Bar Chart">
  </body>
</html>
'''.format(image_base64)

# Write the HTML content to a file
with open('clustered_bar_chart.html', 'w',encoding='utf-8') as file:
    file.write(html_content)
