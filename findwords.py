with open('iqjaw.txt', 'r') as f:
    words = f.read().splitlines()

from tqdm import tqdm
import json

wordstr = ' '.join(words)

words = wordstr.split(" ")

#remove eraab characters from words in list: َ ُ ِ ً ٌ ٍ ّ ْ ٓ ٔ 
words = [word.replace('َ', '') for word in words]
words = [word.replace('ُ', '') for word in words]
words = [word.replace('ِ', '') for word in words]
words = [word.replace('ً', '') for word in words]
words = [word.replace('ٌ', '') for word in words]
words = [word.replace('ٍ', '') for word in words]
words = [word.replace('ّ', '') for word in words]
words = [word.replace('ْ', '') for word in words]
words = [word.replace('ٓ', '') for word in words]
words = [word.replace('ٔ', '') for word in words]
words = [word.replace('ٰ', '') for word in words]

words = [word.replace('ـ', '') for word in words]
words = [word.replace('ثث', 'پ') for word in words]
words = [word.replace('سس', 'ے') for word in words]
words = [word.replace('كك', 'گ') for word in words]
words = [word.replace('حح', 'چ') for word in words]
words = [word.replace('ضض', 'ٹ') for word in words]
words = [word.replace('طط', 'ں') for word in words]
words = [word.replace('؛', 'چهے') for word in words]
words = [word.replace('ظظ', 'ه') for word in words]
words = [word.replace('ـ', '') for word in words]
words = [word.replace('إِ', 'ا') for word in words]
words = [word.replace('إ', 'ا') for word in words]
words = [word.replace('أ', 'ا') for word in words]
words = [word.replace('آ', 'ا') for word in words]
words = [word.replace('‍‍ا', 'ا') for word in words]
words = [word.replace('ؤ', 'و') for word in words]

print("Finished replacements")

histo={}

print("Going through words and building histogram...")
for word in tqdm(words):
    if word in histo:
        histo[word]+=1
    else:
        histo[word]=1

print(len(set(words)))

print(len(words))


huroof=['ث','ں','ة','ء', 'ا', 'و', 'م', 'ز', 'پ', 'خ', 'ح', 'چ', 'ر', 'ت', 'ے', 'ط', 'ظ', 'ه', 'ض', 'د', 'ج', 'ع', 'ل', 'ك', 'گ', 'ن', 'ش', 'ص', 'غ', 'ب', 'ق', 'ف', 'ي', 'ٹ', 'ذ', 'س']
# letters=list("جرزيفست")
import random
letters=random.sample(huroof, 7)
words=set(words)

invalidwords=[]

print("Filtering out words...")
for word in tqdm(words):
    for w in word:
        if w not in letters:
            invalidwords.append(word)

validwords=[]

invalidwords=set(invalidwords)

print("Secondary Filtering...")
for word in tqdm(words):
    if word not in invalidwords and letters[3] in word:
        validwords.append(word) 

for word in validwords:
    print(word)

# from openpyxl import Workbook
# wb = Workbook()
# ws = wb.active
# l=""
# for h in letters:
#     l+=h
# ws.append([l])
# for word in tqdm(validwords):
#     l=[]
#     l.append(word)
#     l.append(histo[word])
#     ws.append(l)
#     # print(l)
# wb.save("words1.xlsx")

x="""
letters={}
validWords={}
""".format(letters, validwords)
print(x)

data={}
data["letters"]=letters;
data["validWords"]=validwords;

data=json.dumps(data, ensure_ascii=False)

print(","+data)

# with open("words.json","r+",encoding="utf-8") as f:
#     datas=json.load(f)
#     print(datas)
#     datas["words"].append(data)
#     print(datas)
#     print()
#     print()
#     print(validwords)
#     print()
#     print()
#     print()
#     json.dump(datas,f,ensure_ascii=False,indent=4)