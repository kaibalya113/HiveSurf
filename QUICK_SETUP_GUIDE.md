# 🚨 URGENT: Fix Your 404 Error

Your form is getting a 404 error because it's using placeholder values. Here's how to fix it:

## 🔧 Quick Fix Steps

### 1. Create Your Google Form
1. Go to: https://forms.google.com
2. Click "Blank" 
3. Title: "HiveSurf Contact Form"

### 2. Add These Fields (in order):
1. **Full Name** (Short answer, Required)
2. **Email Address** (Short answer, Required)
3. **Phone Number** (Short answer)
4. **Company** (Short answer)
5. **Service Interested In** (Multiple choice)
6. **Message** (Paragraph)
7. **Source** (Short answer)
8. **Timestamp** (Short answer)

### 3. Get Your Form URL
1. Click "Send" in your form
2. Copy the URL (looks like: `https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform`)
3. Replace `/viewform` with `/formResponse`

### 4. Get Field IDs
1. Right-click on your form → "View Page Source"
2. Press Ctrl+F → Search "entry."
3. Note down each `entry.XXXXXXXXXX` in order

### 5. Connect to Google Sheets
1. In your form → "Responses" tab
2. Click Google Sheets icon
3. Create new spreadsheet
4. Copy the spreadsheet URL

### 6. Update Your Config
Open `src/config/formConfig.js` and replace:

```javascript
export const googleFormConfig = {
  formUrl: 'YOUR_ACTUAL_FORM_URL_HERE', // From Step 3
  spreadsheetUrl: 'YOUR_ACTUAL_SPREADSHEET_URL_HERE', // From Step 5
  fieldIds: {
    name: 'entry.YOUR_ACTUAL_NAME_ID', // First entry. from Step 4
    email: 'entry.YOUR_ACTUAL_EMAIL_ID', // Second entry. from Step 4
    phone: 'entry.YOUR_ACTUAL_PHONE_ID', // Third entry. from Step 4
    company: 'entry.YOUR_ACTUAL_COMPANY_ID', // Fourth entry. from Step 4
    service: 'entry.YOUR_ACTUAL_SERVICE_ID', // Fifth entry. from Step 4
    message: 'entry.YOUR_ACTUAL_MESSAGE_ID', // Sixth entry. from Step 4
    source: 'entry.YOUR_ACTUAL_SOURCE_ID', // Seventh entry. from Step 4
    timestamp: 'entry.YOUR_ACTUAL_TIMESTAMP_ID' // Eighth entry. from Step 4
  },
  notificationEmail: 'hiveesurf@gmail.com'
};
```

## 🎯 Example
If your form URL is `https://docs.google.com/forms/d/e/1FAIpQLSd1234567890abcdef/formResponse`
And your field IDs are `entry.1234567890`, `entry.1234567891`, etc.

Then your config should look like:
```javascript
formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSd1234567890abcdef/formResponse',
fieldIds: {
  name: 'entry.1234567890',
  email: 'entry.1234567891',
  // ... etc
}
```

## ✅ After Updating
1. Save the file
2. Test your form
3. Check Google Sheets for responses
4. Check hiveesurf@gmail.com for emails

The 404 error will be fixed once you replace the placeholder values with your actual Google Form details! 