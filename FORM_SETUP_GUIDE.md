# Form Setup Guide - Email & Google Sheets Integration

This guide will help you set up the contact form to send data to both your email and Google Sheets.

## 🚀 Quick Setup Steps

### 1. Create Google Apps Script

1. **Go to [script.google.com](https://script.google.com)**
2. **Click "New Project"**
3. **Replace the default code with the script below**
4. **Save the project** (Ctrl+S or Cmd+S)

### 2. Google Apps Script Code

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (you'll need to create this)
    const spreadsheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID');
    const sheet = spreadsheet.getActiveSheet();
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Prepare row data
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.company || '',
      data.service || '',
      data.message || '',
      data.source || ''
    ];
    
    // Add data to spreadsheet
    sheet.appendRow(rowData);
    
    // Send email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  const emailAddress = 'your-email@gmail.com'; // Replace with your email
  const subject = 'New HiveSurf Lead - ' + (data.name || 'Unknown');
  
  const body = `
    New lead submitted from HiveSurf website:
    
    Name: ${data.name || 'Not provided'}
    Email: ${data.email || 'Not provided'}
    Phone: ${data.phone || 'Not provided'}
    Company: ${data.company || 'Not provided'}
    Service: ${data.service || 'Not provided'}
    Message: ${data.message || 'Not provided'}
    Source: ${data.source || 'Not provided'}
    
    Submitted at: ${new Date().toLocaleString()}
  `;
  
  MailApp.sendEmail(emailAddress, subject, body);
}
```

### 3. Deploy the Script

1. **Click "Deploy" → "New deployment"**
2. **Choose "Web app"**
3. **Set "Execute as" to "Me"**
4. **Set "Who has access" to "Anyone"**
5. **Click "Deploy"**
6. **Copy the deployment URL** (you'll need this for step 5)

### 4. Create Google Sheets

1. **Go to [sheets.google.com](https://sheets.google.com)**
2. **Create a new spreadsheet**
3. **Add these headers in the first row:**
   ```
   Timestamp | Name | Email | Phone | Company | Service | Message | Source
   ```
4. **Copy the Spreadsheet ID from the URL** (the long string between /d/ and /edit)
5. **Replace 'YOUR_SPREADSHEET_ID' in the Google Apps Script with your actual ID**

### 5. Update Configuration

1. **Open `src/config/formConfig.js`**
2. **Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your deployment URL**
3. **Replace `your-email@gmail.com` with your actual email**

### 6. Deploy Your Website

```bash
npm run deploy
```

## 📋 Form Fields

The form includes these fields:

- **Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Company** (optional)
- **Service** (dropdown)
- **Message** (optional)
- **Source** (automatically set)

## 🎯 Services Available

- Digital Marketing
- SEO
- Social Media Marketing
- Content Marketing
- PPC Advertising
- Web Design
- Branding
- Other

## 🔧 Customization

### Adding New Services

1. **Edit `src/config/formConfig.js`**
2. **Add new services to the `SERVICES` array**

### Changing Email Template

1. **Edit the `sendEmailNotification` function in Google Apps Script**
2. **Customize the email subject and body**

### Adding New Fields

1. **Update the form in `CustomContactForm.js`**
2. **Update the Google Apps Script to handle new fields**
3. **Add new columns to your Google Sheet**

## 🚨 Troubleshooting

### Form Not Working
- Check that the Google Apps Script URL is correct
- Ensure the script is deployed as a web app
- Check browser console for errors

### Emails Not Received
- Verify your email address in the script
- Check spam folder
- Ensure MailApp permissions are granted

### Google Sheets Not Updated
- Verify the Spreadsheet ID is correct
- Check that the script has permission to access the sheet
- Ensure the sheet headers match the script

## 📞 Support

If you need help:
1. Check the browser console for errors
2. Verify all URLs and IDs are correct
3. Test the Google Apps Script manually
4. Check Google Apps Script logs for errors

## 🔒 Security Notes

- The form sends data over HTTPS
- Google Apps Script handles data securely
- No sensitive data is stored in the frontend code
- Consider adding CAPTCHA for additional security

---

**Your form is now ready to collect leads and send them to both your email and Google Sheets!** 🎉 