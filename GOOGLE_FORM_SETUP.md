# Google Form Setup Guide for HiveSurf

This guide will help you set up a Google Form that integrates with your website and automatically sends data to Google Sheets and emails to hiveesurf@gmail.com.

## Step 1: Create Google Form

1. **Go to Google Forms**: https://forms.google.com
2. **Create a new form** with the title "HiveSurf Contact Form"
3. **Add the following questions**:

### Question 1: Full Name
- Type: Short answer
- Required: Yes
- Question: "Full Name *"

### Question 2: Email Address
- Type: Short answer
- Required: Yes
- Question: "Email Address *"
- Validation: Email

### Question 3: Phone Number
- Type: Short answer
- Required: No
- Question: "Phone Number"

### Question 4: Company
- Type: Short answer
- Required: No
- Question: "Company"

### Question 5: Service Interested In
- Type: Multiple choice
- Required: No
- Question: "Service Interested In"
- Options:
  - Digital Marketing
  - SEO
  - Social Media Marketing
  - Content Marketing
  - PPC Advertising
  - Web Design
  - Branding
  - Other

### Question 6: Message
- Type: Paragraph
- Required: No
- Question: "Message"

### Question 7: Source
- Type: Short answer
- Required: No
- Question: "Source"

### Question 8: Timestamp
- Type: Short answer
- Required: No
- Question: "Timestamp"

## Step 2: Get Form Field IDs

1. **Open your form** in edit mode
2. **Right-click on the page** and select "View Page Source"
3. **Press Ctrl+F** and search for "entry."
4. **Note down the field IDs** for each question:
   - Name: `entry.XXXXXXXXXX`
   - Email: `entry.XXXXXXXXXX`
   - Phone: `entry.XXXXXXXXXX`
   - Company: `entry.XXXXXXXXXX`
   - Service: `entry.XXXXXXXXXX`
   - Message: `entry.XXXXXXXXXX`
   - Source: `entry.XXXXXXXXXX`
   - Timestamp: `entry.XXXXXXXXXX`

## Step 3: Get Form Submission URL

1. **In your form**, click the "Send" button
2. **Copy the form URL** (it will look like: `https://docs.google.com/forms/d/e/1FAIpQLSd.../formResponse`)
3. **Replace the formResponse part** with `formResponse` (if not already there)

## Step 4: Set Up Google Sheets Integration

1. **In your Google Form**, go to "Responses" tab
2. **Click the Google Sheets icon** (green spreadsheet icon)
3. **Choose "Create a new spreadsheet"**
4. **Name it** "HiveSurf Contact Form Responses"
5. **Copy the spreadsheet URL** for later use

## Step 5: Set Up Email Notifications

### Option A: Using Google Forms Built-in Notifications
1. **In your form**, go to "Responses" tab
2. **Click the three dots** (⋮) next to "Responses"
3. **Select "Get email notifications for new responses"**
4. **Enter**: hiveesurf@gmail.com
5. **Save**

### Option B: Using Google Apps Script (Recommended)
1. **Open your Google Sheets** with form responses
2. **Go to Extensions → Apps Script**
3. **Replace the code** with the following:

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
5. **Go back to your Google Sheets**
6. **Go to Extensions → Apps Script**
7. **Click on "Triggers"** (clock icon)
8. **Click "Add Trigger"**
9. **Set up the trigger**:
   - Choose function: `onFormSubmit`
   - Choose event source: `From spreadsheet`
   - Choose event type: `On form submit`
   - Save

## Step 6: Update Your Website Code

1. **Open** `src/components/GoogleForm.js`
2. **Replace the placeholder values**:

```javascript
// Replace YOUR_FORM_ID with your actual form ID
const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

// Replace the entry IDs with your actual field IDs
const formFields = {
  'entry.1234567890': formData.name, // Replace with actual Name field ID
  'entry.1234567891': formData.email, // Replace with actual Email field ID
  'entry.1234567892': formData.phone, // Replace with actual Phone field ID
  'entry.1234567893': formData.company, // Replace with actual Company field ID
  'entry.1234567894': formData.service, // Replace with actual Service field ID
  'entry.1234567895': formData.message, // Replace with actual Message field ID
  'entry.1234567896': source, // Replace with actual Source field ID
  'entry.1234567897': new Date().toISOString() // Replace with actual Timestamp field ID
};
```

3. **Replace the spreadsheet URL**:
```javascript
href="https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit#gid=0"
```

## Step 7: Update Your Components

Replace HubSpotForm with GoogleForm in your components:

### In StartNowModal.js:
```javascript
import GoogleForm from './GoogleForm';

// Replace HubSpotForm with GoogleForm in the JSX
<GoogleForm 
  title="Start Your Journey"
  subtitle="Fill out the form below to get started with HiveSurf."
  className="!mb-0"
  source={sourceCardId ? `${sourceCardId} Modal` : "Start Now Modal"}
  onSuccess={handleFormSubmitted}
/>
```

### In Contact.js:
```javascript
import GoogleForm from '../components/GoogleForm';

// Replace HubSpotForm with GoogleForm in the JSX
<GoogleForm 
  title="Send Us a Message"
  subtitle="Fill out the form below and we'll get back to you within 24 hours."
  source="Contact Page"
/>
```

## Step 8: Test Your Setup

1. **Deploy your website**: `npm run deploy`
2. **Test the form** on your website
3. **Check Google Sheets** for new responses
4. **Check hiveesurf@gmail.com** for email notifications

## Troubleshooting

### Form Not Submitting
- Check that all field IDs are correct
- Ensure the form URL is correct
- Check browser console for errors

### No Email Notifications
- Verify the Apps Script trigger is set up correctly
- Check that the email address is correct
- Test the script manually in Apps Script

### Data Not Appearing in Sheets
- Check that the form is connected to the correct spreadsheet
- Verify the form is accepting responses
- Check form settings for any restrictions

## Benefits of This Setup

✅ **Automatic Data Storage** - All responses go to Google Sheets
✅ **Email Notifications** - Instant emails to hiveesurf@gmail.com
✅ **Beautiful UI** - Matches your website design
✅ **No External Dependencies** - Uses Google's free services
✅ **Easy to Manage** - All data in one place
✅ **Mobile Friendly** - Works on all devices

## Security Notes

- Google Forms are secure and encrypted
- Data is stored in your Google account
- No third-party services involved
- You control all data access

---

**Need Help?** If you encounter any issues during setup, check the Google Forms documentation or contact support. 