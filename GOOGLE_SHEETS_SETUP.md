# Google Sheets Setup

This project already sends booking form data to a Google Sheets webhook using:

`VITE_GOOGLE_SHEETS_WEBHOOK_URL`

The website side is ready. You only need to connect a Google Sheet to it.

## Files already prepared in this project

- `google-apps-script/Code.gs`
- `.env.example`

The Apps Script in this repo now:

- saves every booking row to Google Sheets
- sends a notification email to:
  - `sumithnalla24@ifheindia.org`
  - `sri866576@gmail.com`

## What to do in VS Code

1. Open `google-apps-script/Code.gs`
2. Keep that file ready to copy
3. Create a new local file named `.env`
4. Add this line:

```env
VITE_GOOGLE_SHEETS_WEBHOOK_URL=
```

5. Leave it blank for now until you get the deployed Google Apps Script URL

## What you must do externally in Google

### 1. Create the Google Sheet

1. Open Google Sheets
2. Create a new spreadsheet
3. Name it something like `MSR Bookings`

### 2. Create the Apps Script

1. In that sheet, click `Extensions`
2. Click `Apps Script`
3. Delete the default code
4. Copy-paste everything from `google-apps-script/Code.gs`
5. Save it
6. Run `testEmail` once inside Apps Script and approve permissions for:
   - Google Sheets
   - Gmail

### 3. Deploy it as a webhook

1. Click `Deploy`
2. Click `New deployment`
3. Choose `Web app`
4. Set:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
5. Click `Deploy`
6. Copy the `Web app URL`

If you already deployed it before:

1. Click `Deploy`
2. Click `Manage deployments`
3. Edit your existing web app deployment
4. Select the new version
5. Deploy again

### 4. Paste the URL back into VS Code

1. Open your local `.env`
2. Update it like this:

```env
VITE_GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/PASTE_YOUR_ID/exec
```

3. Save the file
4. Restart your dev server

## How to view booking details

Every booking will be added as a new row in your Google Sheet with these columns:

- `submittedAt`
- `service`
- `name`
- `phone`
- `address`
- `source`

## How to test

1. Run the website
2. Open the booking form
3. Submit a test entry
4. Open your Google Sheet
5. Confirm a new row was added
6. Confirm both email inboxes received the `New Booking Added` message

## If it does not save

Check these things:

- The `.env` file exists in the project root
- `VITE_GOOGLE_SHEETS_WEBHOOK_URL` is filled in
- The Apps Script was deployed as a `Web app`
- Access is set to `Anyone`
- You restarted the dev server after editing `.env`
- You pasted the latest `google-apps-script/Code.gs` into Apps Script
- You re-deployed the Apps Script after updating the code
- Gmail permissions were approved by running `testEmail` or `doPost`
