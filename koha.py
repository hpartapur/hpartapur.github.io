import requests
from requests.auth import HTTPBasicAuth
import json
import pandas as pd
import re
from datetime import datetime
import os
from tqdm import tqdm

# Replace 'username' and 'password' with your actual credentials
username="apiuser"
password = "Apiuser@5253"

username="30495513"
password="30495513"

###1. OBTAIN DATA FROM SOURCES
#use GET request to get list of patrons in Koha
api_endpoint = 'https://library-admin.ajsn.co.ke/api/v1/patrons?_per_page=2000'
response = requests.get(api_endpoint, auth=HTTPBasicAuth(username, password))
if response.status_code == 200:
    print("Koha Data Received Successfully")
    kohadata=response.json()
else:
    print(f"Failed to retrieve Koha data. Status code: {response.status_code}")
    print(response.text)

#use GET request to get list of patrons from Malaf
jhs_webservice = "https://nairobi.jameasaifiyah.edu/JameaWebService/api/library/PatronData?token=yHXJw4xAIdGcax2BSe0rzfw1ZsOPJOOemARu5k1PJ09I6Scha0Zidyq1OXTllMxM"
jhs_response=requests.get(jhs_webservice)
print(jhs_response.status_code)
if jhs_response.status_code == 200:
    print("Malaf Data Received Successfully")
    malaf=jhs_response.json()
else:
    print(f"Failed to retrieve Malaf data. Status code: {jhs_response.status_code}")


###2. COMPARE DATA FROM SOURCES


missing_users=[]
# Create an spreadsheet to compare Malaf and Koha data, and use Userid (ITSNO) to compare values
columns = ['UserId', 
           'patron_id', 
           'Koha_Surname', 'Malaf_Surname', 
           'Koha_Category', 'Malaf_Category',
           'Koha_Cardnumber', 'Malaf_Cardnumber', 
           'Koha_Email', 'Malaf_Email',
           'Koha_DOB', 'Malaf_DOB',
           'Koha_Gender','Malaf_Gender',
           'Koha_FatherEmail', 'Malaf_FatherEmail',
           'Koha_FatherPhone', 'Malaf_FatherPhone', 
           'Koha_MotherEmail', 'Malaf_MotherEmail',
           'Koha_MotherEmail', 'Malaf_MotherPhone', 
           'Koha_TRNO','Malaf_TRNO', 
           'Koha_Class',
           'Malaf_Class',
           "All_Matching",
           "Mismatches"
           ]
df = pd.DataFrame(columns=columns)
#Go through Malaf patrons, and compare that data with data from Koha
for user in tqdm(malaf, desc="Processing Users", unit="user", colour="green"):
    present = False
    for patron in kohadata:
        if patron['userid'] == user['userid']:
            present=True
            userdata=[]
            userdata.append(user['userid'])
            userdata.append(patron['patron_id'])
            userdata.append(patron['surname'])
            userdata.append(user['surname'])
            userdata.append(patron['category_id'])
            userdata.append(user['categorycode'])
            userdata.append(patron['cardnumber'])
            userdata.append(user['cardnumber'])
            userdata.append(patron['email'])
            userdata.append(user['email'])
            userdata.append(patron['date_of_birth'])
            dob=user['dateofbirth']
            if not dob:
                dob = "01/01/1990" #if no dateofbirth in malaf, set it to a default value
            dob=datetime.strptime(dob.strip(), '%d/%m/%Y').strftime('%Y-%m-%d') #change malaf DOB format to Koha-acceptable format
            userdata.append(dob)
            userdata.append(patron['gender'])
            userdata.append(user['sex'])
            userdata.append(patron['secondary_email'])
            userdata.append(user['emailpro'])
            userdata.append(patron['secondary_phone'])
            userdata.append(user['phonepro'])
            userdata.append(patron['altaddress_email'])
            userdata.append(user['B_email'])
            userdata.append(patron['altaddress_phone'])
            userdata.append(user['B_phone'])
            #Also for each patron, need to make a separate GET request for 'extended_attributes', which are TR and Darajah
            attribute_request= "https://library-admin.ajsn.co.ke/api/v1/patrons/"+str(patron['patron_id'])+"/extended_attributes"
            attribute_response= requests.get(attribute_request, auth=HTTPBasicAuth(username, password))
            attributes=attribute_response.json()
            patron['TRNO']=""
            patron['Class']=""
            for attribute in attributes:
                if attribute['type']=="TRNO":
                    patron['TRNO']= attribute['value']
                if attribute['type']=="Class":
                    patron['Class']= attribute['value']
            userdata.append(patron['TRNO'])
            userdata.append(user['trno'])
            userdata.append(patron['Class'])
            userdata.append(user['Class'])
            #Now compare the columns to check if there are any changes needed. If so, change the AllMatching column to False
            matching = True
            mismatches=""
            if userdata[2] != userdata[3]:
                matching = False
                print(userdata[2], userdata[3])
                mismatches+="Surname,"
            if userdata[4] != userdata[5]:
                matching = False
                print(userdata[4], userdata[5])
                mismatches+="Category,"
            if userdata[6] != userdata[7]:
                matching = False
                print(userdata[6], userdata[7])
                mismatches+="Cardnumber,"
            if userdata[8] != userdata[9]:
                matching = False
                print(userdata[8], userdata[9])
                mismatches+="Email,"
            if userdata[10] != userdata[11]:
                matching = False
                print(userdata[10], userdata[11])
                mismatches+="DOB,"
            if userdata[12] != userdata[13]:
                matching = False
                print(userdata[12], userdata[13])
                mismatches+="Gender,"
            if userdata[14] != userdata[15]:
                matching = False
                print(userdata[14], userdata[15])
                mismatches+="FatherEmail,"
            if userdata[16] != userdata[17]:
                matching = False
                print(userdata[16], userdata[17])
                mismatches+="FatherPhone,"
            if userdata[18] != userdata[19]:
                matching = False
                print(userdata[18], userdata[19])
                mismatches+="MotherEmail,"
            if userdata[20] != userdata[21]:
                matching = False
                print(userdata[20], userdata[21])
                mismatches+="MotherPhone,"
            if userdata[22] != userdata[23]:
                matching = False
                print(userdata[22], userdata[23])
                mismatches+="TRNO,"
            if userdata[24] != userdata[25] and userdata[5].startswith("S-"):
                matching = False
                print(userdata[24], userdata[25])
                mismatches+="Class,"
            userdata.append(matching)
            userdata.append(mismatches)
            df.loc[len(df)] = userdata
            if matching == False:
                print(user['surname'], matching)
            break

    #If this user is in Malaf but not in Koha, add them to missing_users that need to be created in Koha
    if present == False:
        missing_users.append(user)
print(df)
# Export Comparison to Excel
df.to_excel('Koha_Malaf.xlsx', index=False)
#Filter to find those who have inconsistencies between Malaf and Koha Data and need to be updated
outdated = df[df['All_Matching'] == False]
print(outdated.to_string())
print("Outdated Patrons: ",len(outdated))


###3. UPDATE OUTDATED PATRONS
#Go through the outdated list, and update each one with values from Malaf in the excel sheet
update_link = "https://library-admin.ajsn.co.ke/api/v1/patrons/"
for index, row in outdated.iterrows():
    updater=update_link+str(row['patron_id'])
    data={
        "surname":row['Malaf_Surname'],
        "cardnumber":row['Malaf_Cardnumber'],
        "category_id":row['Malaf_Category'],
        "email":row['Malaf_Email'],
        "date_of_birth":row['Malaf_DOB'],
        "gender":row['Malaf_Gender'],
        "secondary_email":row['Malaf_FatherEmail'],
        "secondary_phone":row['Malaf_FatherPhone'],
        "altaddress_email":row['Malaf_MotherEmail'],
        "altaddress_phone":row['Malaf_MotherPhone'],
        'library_id':"AJSN",
    }
    if data['cardnumber'] == "":  #Because cardnumber is mandatory value, and cannot be left blank, save their ITS as cardnumber.
        data['cardnumber'] = row['UserId']
    update_response = requests.put(updater, auth=HTTPBasicAuth(username, password),json=data)
    print(update_response.json())

    #Check if updates to extended attributes are necessary, because this is a different request. If so, update
    if row['Malaf_TRNO'] != row['Koha_TRNO'] or row['Malaf_Class'] != row['Koha_Class']:
        attributes = [
            {"type":"TRNO","value":str(row['Malaf_TRNO'])},
            {"type":"Class","value":str(row['Malaf_Class'])},
        ]
        updater+='/extended_attributes'
        update_response = requests.put(updater, auth=HTTPBasicAuth(username, password),json=attributes)
        print(update_response.status_code)




###4. ADD MISSING PATRONS
#Add users not in Koha (new Users) as Patrons
for user in missing_users:
    data={
        "surname":user['surname'],
        "cardnumber":user['cardnumber'],
        "country": "Nairobi",
        "category_id":user['categorycode'],
        "email":user['email'],
        "date_of_birth":user['dateofbirth'],
        "gender":user['sex'],
        "secondary_email":user['emailpro'],
        "secondary_phone":user['phonepro'],
        "altaddress_email":user['B_email'],
        "altaddress_phone":user['B_phone'],
        "userid":user['userid'],
        'library_id':"AJSN",
    }
    if data['cardnumber'] == "":#Because cardnumber is mandatory value, and cannot be left blank, save their ITS as cardnumber.
        data['cardnumber'] = data['userid']
    update_response = requests.post(update_link, auth=HTTPBasicAuth(username, password),json=data)
    print(update_response.json())
print("Newly Created Users: ",len(missing_users))



###5. DEACTIVATE EXTRA PATRONS
expirydate="2024-01-01"
extra_users=[]
#Go through Koha, and find patrons who are either Teachers or Students and are no longer in the Malaf system, and set their account expiry dates in the past
#Do NOT Delete their data, as they may return, or their data may be requested in the future
for patron in kohadata:
    present = False
    for user in malaf:
        if patron['userid'] == user['userid']:
            present=True
    if present==False:
        if patron['category_id'].startswith("T") or patron['category_id'].startswith("S-"): #Make sure student or teacher. Don't deactivate Staff or other account categories
            if patron['expiry_date'] != expirydate: #Check if account hasn't been expired already
                extra_users.append(patron)
                update_link = "https://library-admin.ajsn.co.ke/api/v1/patrons/"+str(patron['patron_id'])
                data={
                "surname":patron['surname'],
                "cardnumber":patron['cardnumber'],
                "country": "Nairobi",
                "category_id":patron['category_id'],
                'expiry_date': expirydate,
                "library_id":"AJSN"
                }
                update_response = requests.put(update_link, auth=HTTPBasicAuth(username, password),json=data)
                print(update_response.json)
print("Expired Users: ",len(extra_users))
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(sender_email, receiver_email, cc_email, subject, body, smtp_server, smtp_port, password):
    # Create the email message
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email  # Primary recipient
    message['Cc'] = cc_email        # CC recipients
    message['Subject'] = subject

    # Add the email body
    message.attach(MIMEText(body, 'plain'))

    # Connect to the SMTP server
    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Secure the connection
        server.login(sender_email, password)
        
        # Send the email to the main recipient and CC recipients
        all_recipients = [receiver_email] + cc_email.split(',')  # Split CC emails into a list
        server.sendmail(sender_email, all_recipients, message.as_string())
        print("Email sent successfully!")

    except Exception as e:
        print(f"Failed to send email: {e}")

    finally:
        server.quit()

list_of_updates = outdated.to_csv(index=False)
new_patron_surnames = [patron['surname'] for patron in missing_users]
deactivated_patron_surnames = [patron['surname'] for patron in extra_users]
updated_patron_surnames = [row['Koha_Surname'] for _, row in outdated.iterrows()]
# Usage
if __name__ == "__main__":
    sender_email = "24653@jameasaifiyah.edu"  # Your email address
    receiver_email = "abdeali.badri@jameasaifiyah.edu"  # Primary recipient's email address
    cc_email = "aliasgar.badri@jameasaifiyah.edu, hpartapur@gmail.com"  # Comma-separated list of CC recipients' emails
    subject = "Koha Script Report"
    body= f"""
    Execution Summary:
    Execution Summary:
    - Total Patrons in Koha: {len(kohadata)}
    - Total Patrons in Malaf: {len(malaf)}
    - Outdated Patrons Updated: {len(outdated)}
    - New Patrons Added: {len(missing_users)}
    - Patrons Deactivated: {len(extra_users)}

Outdated Patrons Updated:
{'\n'.join(updated_patron_surnames)}

Details:
{list_of_updates}

New Patrons Added:
{'\n'.join(new_patron_surnames)}

Patrons Deactivated:
{'\n'.join(deactivated_patron_surnames)}
    """

    print(body)
    # For Gmail SMTP server
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    password ="Nairobi@24653" # Your email account password (or app password if using 2FA)
    # password = os.getenv('EMAIL_PASS')
    send_email(sender_email, receiver_email, cc_email, subject, body, smtp_server, smtp_port, password)
