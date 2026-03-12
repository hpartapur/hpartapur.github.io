with open('texts.txt', 'r',encoding='utf-8') as f:
    words = f.read().splitlines()


wordstr = ' '.join(words)

words = wordstr.split(" ")

# from tqdm import tqdm

histo = {}

print("Going through words and building histogram...")
for word in words:
    if word in histo:
        histo[word]+=1
    else:
        histo[word]=1

print(len(set(words)))

print(len(words))


import pandas as pd

# Create a list of tuples (key, count) from the dictionary
data = [(key, count) for key, count in sorted(histo.items(), key=lambda item: item[1], reverse=True) if count > 1]

# Convert the list of tuples into a DataFrame
df = pd.DataFrame(data, columns=['Key', 'Count'])

# Write the DataFrame to an Excel file
df.to_excel('output.xlsx', index=False)