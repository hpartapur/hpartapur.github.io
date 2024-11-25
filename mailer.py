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

# Usage
if __name__ == "__main__":
    sender_email = "24653@jameasaifiyah.edu"  # Your email address
    receiver_email = "yskagalwala@jameasaifiyah.edu"  # Primary recipient's email address
    cc_email = "cc1@example.com, cc2@example.com"  # Comma-separated list of CC recipients' emails
    subject = "Tashjee Request"
    body = """Taslimaat Janab,
    This is a humble request for Tashjee for the following Talabat in AVIT.
    26776 - Hatim Lilya
    25323 - Husain Bhai Tabha
    26356 - Ibrahim BS Moiny
    27534 - Aliasger Taksali
    26825 - Taher Parsola
    27668 - Idris Sabit
    24653 - Hatim Bhai Partapur

    Masjid ma microphone ni khidmat kare che (Weekly)
    Tilawat al-Dua ma microphone ni khidmat kare che (Weekly)

    Shukran.
    """

    # For Gmail SMTP server
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    password = "Nairobi@24653"  # Your email account password (or app password if using 2FA)

    send_email(sender_email, receiver_email, cc_email, subject, body, smtp_server, smtp_port, password)
