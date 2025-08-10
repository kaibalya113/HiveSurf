# Google Form Setup Steps - Fix Your Form Issues

## 🚨 Current Problem
Your form is not working because it's using placeholder values instead of your actual Google Form configuration.

## ✅ Step-by-Step Solution

### Step 1: Create Your Google Form

1. **Go to**: https://forms.google.com
2. **Click**: "Blank" to create a new form
3. **Title**: "HiveSurf Contact Form"

### Step 2: Add Form Fields

Add these questions in order:

1. **Full Name** (Short answer, Required)
2. **Email Address** (Short answer, Required, Email validation)
3. **Phone Number** (Short answer, Not required)
4. **Company** (Short answer, Not required)
5. **Service Interested In** (Multiple choice, Not required)
   - Options: Digital Marketing, SEO, Social Media Marketing, Content Marketing, PPC Advertising, Web Design, Branding, Other
6. **Message** (Paragraph, Not required)
7. **Source** (Short answer, Not required)
8. **Timestamp** (Short answer, Not required)

### Step 3: Get Your Form URL

1. **Click**: "Send" button in your form
2. **Copy**: The form URL (looks like: `https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform`)
3. **Replace**: `/viewform` with `/formResponse`
4. **Example**: `https://docs.google.com/forms/d/e/1FAIpQLSd.../formResponse`

### Step 4: Get Field IDs

1. **Right-click** on your form page
2. **Select**: "View Page Source"
3. **Press**: Ctrl+F
4. **Search**: "entry."
5. **Note down** each field ID in order:
   - First `entry.` = Name field
   - Second `entry.` = Email field
   - Third `entry.` = Phone field
   - Fourth `entry.` = Company field
   - Fifth `entry.` = Service field
   - Sixth `entry.` = Message field
   - Seventh `entry.` = Source field
   - Eighth `entry.` = Timestamp field

### Step 5: Connect to Google Sheets

1. **In your form**: Go to "Responses" tab
2. **Click**: Google Sheets icon (green spreadsheet)
3. **Choose**: "Create a new spreadsheet"
4. **Name it**: "HiveSurf Contact Form Responses"
5. **Copy**: The spreadsheet URL

### Step 6: Update Your Configuration

1. **Open**: `src/config/formConfig.js`
2. **Replace** the placeholder values:

```javascript
export const googleFormConfig = {
  // Replace with your actual form URL from Step 3
  formUrl: 'https://docs.google.com/forms/d/e/YOUR_ACTUAL_FORM_ID/formResponse',
  
  // Replace with your actual spreadsheet URL from Step 5
  spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_ACTUAL_SPREADSHEET_ID/edit#gid=0',
  
  // Replace with your actual field IDs from Step 4
  fieldIds: {
    name: 'entry.YOUR_ACTUAL_NAME_FIELD_ID',
    email: 'entry.YOUR_ACTUAL_EMAIL_FIELD_ID',
    phone: 'entry.YOUR_ACTUAL_PHONE_FIELD_ID',
    company: 'entry.YOUR_ACTUAL_COMPANY_FIELD_ID',
    service: 'entry.YOUR_ACTUAL_SERVICE_FIELD_ID',
    message: 'entry.YOUR_ACTUAL_MESSAGE_FIELD_ID',
    source: 'entry.YOUR_ACTUAL_SOURCE_FIELD_ID',
    timestamp: 'entry.YOUR_ACTUAL_TIMESTAMP_FIELD_ID'
  },
  
  notificationEmail: 'hiveesurf@gmail.com'
};
```

### Step 7: Set Up Email Notifications

#### Option A: Google Forms Built-in (Simple)
1. **In your form**: Go to "Responses" tab
2. **Click**: Three dots (⋮) next to "Responses"
3. **Select**: "Get email notifications for new responses"
4. **Enter**: hiveesurf@gmail.com
5. **Save**

#### Option B: Google Apps Script (Recommended)
1. **Open your Google Sheets** with form responses
2. **Go to**: Extensions → Apps Script
3. **Replace the code** with:

```javascript
function onFormSubmit(e) {
  var sheet = e.source.getActiveSheet();
  var data = e.values;
  
  // Get form data
  var timestamp = data[0];
  var name = data[1];
  var email = data[2];
  var phone = data[3];
  var company = data[4];
  var service = data[5];
  var message = data[6];
  var source = data[7];
  
  // Create email body
  var emailBody = `
New Contact Form Submission from HiveSurf Website

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Service: ${service}
Message: ${message}
Source: ${source}
Timestamp: ${timestamp}

---
This email was automatically generated from the HiveSurf contact form.
  `;
  
  // Send email
  MailApp.sendEmail({
    to: "hiveesurf@gmail.com",
    subject: "New Contact Form Submission - " + name,
    body: emailBody
  });
}
```

4. **Save the script**
5. **Go to**: Triggers (clock icon)
6. **Click**: "Add Trigger"
7. **Set up**:
   - Function: `onFormSubmit`
   - Event source: `From spreadsheet`
   - Event type: `On form submit`
   - Save

### Step 8: Test Your Form

1. **Save** all your changes
2. **Deploy**: `npm run build` and `npm run deploy`
3. **Test**: Fill out the form on your website
4. **Check**: Google Sheets for new responses
5. **Check**: hiveesurf@gmail.com for email notifications

## 🔧 Troubleshooting

### Form Not Submitting
- ✅ Check that all field IDs are correct
- ✅ Ensure the form URL ends with `/formResponse`
- ✅ Check browser console for errors

### No Email Notifications
- ✅ Verify the Apps Script trigger is set up
- ✅ Check that the email address is correct
- ✅ Test the script manually in Apps Script

### Data Not Appearing in Sheets
- ✅ Check that the form is connected to the correct spreadsheet
- ✅ Verify the form is accepting responses
- ✅ Check form settings for any restrictions

## 📞 Need Help?

If you're still having issues after following these steps:

1. **Check the browser console** for any JavaScript errors
2. **Verify your form URL** is correct
3. **Double-check all field IDs** match your form
4. **Test the form manually** by visiting the Google Form URL directly

The key issue was that your form was using placeholder values (`YOUR_FORM_ID`, `entry.1234567890`) instead of your actual Google Form configuration. Once you update the `formConfig.js` file with your real values, the form should work perfectly! 