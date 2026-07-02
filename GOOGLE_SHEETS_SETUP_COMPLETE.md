# Google Sheets Integration - Complete Setup Guide

## ✅ WHAT HAS BEEN DONE

All code updates have been completed:

1. **Google Apps Script (Code.gs)** - Updated with:
   - Enhanced email notification formatting
   - Support for message field
   - Better error handling
   - Proper Google Sheet column setup

2. **Landing Page (landing-page.js)** - Already configured to:
   - Send submissions to Google Sheets
   - Include: name, phone, service, address, timestamp, source

3. **Contact Form (src/routes/contact.tsx)** - Updated to:
   - Save submissions to Google Sheets
   - Send to both Gmail addresses
   - Show success/error feedback
   - Still open WhatsApp after saving

---

## 📋 STEP-BY-STEP SETUP INSTRUCTIONS

### STEP 1: Create Google Sheet
1. Go to https://sheets.google.com
2. Click **"+ New"** → **"Blank spreadsheet"**
3. Name it: **"servicemsr"**
4. This sheet will auto-create when first submission comes in

### STEP 2: Deploy Google Apps Script

#### A. Open Script Editor
1. Go to https://script.google.com
2. Click **"+ New project"**
3. Name it: **"MSR Booking System"**

#### B. Copy Code
1. Delete any existing code
2. Copy ALL code from: `google-apps-script/Code.gs`
3. Paste into the script editor

#### C. Save & Deploy
1. Click **"Save"** (Ctrl+S)
2. Click **"Deploy"** → **"New Deployment"**
3. Select **"Type"** → choose **"Web app"**
4. Set **"Execute as"** → Your Gmail account
5. Set **"Who has access"** → **"Anyone"**
6. Click **"Deploy"**
7. **COPY THE DEPLOYMENT URL** (something like: `https://script.google.com/macros/s/AKfycb.../exec`)

### STEP 3: Connect Google Sheet to Script

1. In the Apps Script editor, click **"Project Settings"** (gear icon)
2. Copy the **"Script ID"** shown
3. Open your Google Sheet
4. Click **Tools** → **Script editor**
5. Go to **Project Settings**
6. Copy the script ID from Apps Script (from step above)
7. This links them together

### STEP 4: Update .env File

1. Open `.env` file in your project
2. Update the webhook URL:
   ```
   VITE_GOOGLE_SHEETS_WEBHOOK_URL=YOUR_DEPLOYMENT_URL_HERE
   ```
   (Replace with the URL from Step 2 - STEP C)

### STEP 5: Verify Email Configuration

1. In Google Apps Script (Code.gs), verify emails are correct:
   ```javascript
   var NOTIFICATION_EMAIL = "spacialisthomecleaning@gmail.com";
   ```
2. If you need to change emails, edit this code and redeploy

### STEP 6: Test Everything

#### Test via Landing Page:
1. Go to your landing page
2. Fill form: Name, Phone, Service
3. Submit
4. Check:
   - Google Sheet for new row
   - Both email addresses for notification email

#### Test via Contact Form (Web App):
1. Run: `npm run dev`
2. Go to `/contact` page
3. Fill form with: Name, Phone, Service, Message
4. Submit
5. Check Google Sheet and emails again

---

## 📊 What Gets Saved to Google Sheet

**Columns:**
- Submitted At (timestamp)
- Service (cleaning service selected)
- Name (customer name)
- Phone (10-digit number)
- Address (empty for now)
- Message (from contact form, empty for landing page)
- Source (landing-page or contact-form)

---

## 📧 Email Notifications

When someone submits:
- **Both emails receive:** Rich formatted email
- **Includes:** Service, Name, Phone, Address, Message, Timestamp
- **Subject:** "🔔 New Service Request - [Name] - [Service]"

---

## 🔧 Troubleshooting

### Script Not Working?
- Make sure you deployed as "Web app" (not just saved)
- Make sure "Who has access" is set to "Anyone"
- Redeploy if you change email addresses

### Email Not Arriving?
- Check spam folder
- Make sure both email addresses are correct in Code.gs
- Redeploy after changes

### Google Sheet Not Updating?
- Check .env has correct deployment URL
- Make sure webhook URL has `/exec` at the end
- Redeploy the Apps Script after any changes

### Forms Not Sending?
- Open browser DevTools (F12)
- Check Console for errors
- Make sure both URLs in .env and Code.gs are correct

---

## ✨ Summary

✅ Code is ready
✅ Forms will send to Google Sheets
✅ Emails will notify both addresses
✅ All submissions tracked with timestamp

**Now you just need to:**
1. Create the Google Sheet
2. Deploy the Apps Script
3. Get the deployment URL
4. Update .env file
5. Test!
