// Google Form Configuration
// Replace these placeholder values with your actual Google Form details

export const googleFormConfig = {
  // Your Google Form submission URL
  // Get this from your Google Form: Share → Copy link → Replace /viewform with /formResponse
  formUrl: 'https://docs.google.com/forms/d/e/1CN2FuDooXV79OaDGhBTZiKx16g4jSfSngIaiO0FgX5A/formResponse',
  
  // Your Google Sheets URL for viewing responses
  // Get this from your Google Sheets connected to the form
  spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1euCID8ufANbpQYixiruShe90F59_PFjDZgFQHbwLOL8/edit?resourcekey=&gid=797401816#gid=797401816',
  
  // Field IDs from your Google Form
  // To get these: Right-click on your form → View Page Source → Search for "entry."
  fieldIds: {
    name: 'entry.1234567890',        // Replace with actual Name field ID
    email: 'entry.1234567891',       // Replace with actual Email field ID
    phone: 'entry.1234567892',       // Replace with actual Phone field ID
    company: 'entry.1234567893',     // Replace with actual Company field ID
    service: 'entry.1234567894',     // Replace with actual Service field ID
    message: 'entry.1234567895',     // Replace with actual Message field ID
    source: 'entry.1234567896',      // Replace with actual Source field ID
    timestamp: 'entry.1234567897'    // Replace with actual Timestamp field ID
  },
  
  // Email address for notifications
  notificationEmail: 'hiveesurf@gmail.com'
};

// IMPORTANT: You still need to get the actual field IDs from your Google Form!
// 
// To get the field IDs:
// 1. Go to your Google Form: https://docs.google.com/forms/d/1CN2FuDooXV79OaDGhBTZiKx16g4jSfSngIaiO0FgX5A/edit
// 2. Right-click on the form → "View Page Source" (or press F12 → Elements tab)
// 3. Press Ctrl+F and search for "entry."
// 4. You'll see entries like "entry.1234567890" - these are your field IDs
// 5. Replace each placeholder above with the actual field ID from your form
// 
// Example of what you'll find in the source:
// - <input name="entry.1234567890" ...> (this would be your Name field)
// - <input name="entry.1234567891" ...> (this would be your Email field)
// etc. 