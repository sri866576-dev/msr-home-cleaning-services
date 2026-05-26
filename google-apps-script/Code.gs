var NOTIFICATION_EMAILS = [
  "msrvmcm@gmail.com",
].join(",");

var SPREADSHEET_ID = "1Hj2s6MuL4cB1mMKJzS1ler0vHsFcNThWB0w2p4JAkLE";
var SHEET_NAME = "mrmsr";

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ok: true, message: "Google Apps Script is working"}))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.trim() !== "") {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      throw new Error("Invalid SPREADSHEET_ID: " + e.message);
    }
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("No active spreadsheet. Open this script from a Google Sheet and redeploy.");
  }

  return ss;
}

function testEmail() {
  var subject = "MSR Home Cleaning Test";
  var htmlBody =
    "<div style='font-family:Arial,sans-serif;max-width:560px;color:#0f172a;'>" +
    "<h2 style='color:#0284c7;margin-bottom:16px;'>Test Email</h2>" +
    "<p>This is a test email from Apps Script.</p>" +
    "<p>If you received this message, Gmail sending is working correctly.</p>" +
    "</div>";

  GmailApp.sendEmail(NOTIFICATION_EMAILS, subject, "This is a test email from Apps Script.", {
    htmlBody: htmlBody,
  });

  Logger.log("Test email sent to: " + NOTIFICATION_EMAILS);
}

function doPost(e) {
  try {
    var ss = getSpreadsheet_();
    var sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    var data = JSON.parse(e.postData.contents || "{}");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At",
        "Service",
        "Name",
        "Phone",
        "Address",
        "Message",
        "Source",
      ]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold");
      sheet.getRange(1, 1, 1, 7).setBackground("#0284c7");
      sheet.getRange(1, 1, 1, 7).setFontColor("#ffffff");
      sheet.setFrozenRows(1);
      
      sheet.setColumnWidth(1, 180);
      sheet.setColumnWidth(2, 150);
      sheet.setColumnWidth(3, 120);
      sheet.setColumnWidth(4, 120);
      sheet.setColumnWidth(5, 200);
      sheet.setColumnWidth(6, 200);
      sheet.setColumnWidth(7, 100);
    }

    var timestamp = new Date().toISOString();
    
    sheet.appendRow([
      data.submittedAt || timestamp,
      data.service || "Not specified",
      data.name || "",
      data.phone || "",
      data.address || "",
      data.message || "",
      data.source || "website",
    ]);

    sendBookingNotification_(data, timestamp);

    return ContentService
      .createTextOutput(
        JSON.stringify({
          ok: true,
          message: "Data saved successfully and notification sent",
        }),
      )
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("Error in doPost: " + error);
    return ContentService
      .createTextOutput(
        JSON.stringify({
          ok: false,
          error: String(error),
        }),
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendBookingNotification_(data, timestamp) {
  if (!NOTIFICATION_EMAILS || NOTIFICATION_EMAILS.trim() === "") {
    Logger.log("No notification emails configured");
    return;
  }

  var submittedAt = data.submittedAt || timestamp || new Date().toISOString();
  var service = data.service || "General Cleaning";
  var name = data.name || "Unknown";
  var phone = data.phone || "Not provided";
  var address = data.address || "Not provided";
  var message = data.message || "No message";
  var source = data.source || "website";

  var subject = "🔔 New Service Request - " + escapeHtml_(name) + " - " + escapeHtml_(service);

  var htmlBody =
    "<div style='font-family:Arial,sans-serif;max-width:600px;color:#0f172a;background:#ffffff;'>" +
    "<div style='background:#0284c7;color:#ffffff;padding:20px;border-radius:8px 8px 0 0;'>" +
    "<h2 style='margin:0;font-size:20px;'>🎉 New Service Request Received</h2>" +
    "</div>" +
    "<div style='padding:20px;background:#ffffff;border:1px solid #e2e8f0;border-top:none;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr><td style='padding:12px;background:#f8fafc;font-weight:bold;border-bottom:1px solid #e2e8f0;'>Service</td>" +
    "<td style='padding:12px;border-bottom:1px solid #e2e8f0;'>" + escapeHtml_(service) + "</td></tr>" +
    "<tr><td style='padding:12px;background:#f8fafc;font-weight:bold;border-bottom:1px solid #e2e8f0;'>Name</td>" +
    "<td style='padding:12px;border-bottom:1px solid #e2e8f0;'>" + escapeHtml_(name) + "</td></tr>" +
    "<tr><td style='padding:12px;background:#f8fafc;font-weight:bold;border-bottom:1px solid #e2e8f0;'>Phone</td>" +
    "<td style='padding:12px;border-bottom:1px solid #e2e8f0;'><a href='tel:" + escapeHtml_(phone) + "' style='color:#0284c7;text-decoration:none;'>" + escapeHtml_(phone) + "</a></td></tr>";
  
  if (address && address.trim() !== "") {
    htmlBody += "<tr><td style='padding:12px;background:#f8fafc;font-weight:bold;border-bottom:1px solid #e2e8f0;'>Address</td>" +
    "<td style='padding:12px;border-bottom:1px solid #e2e8f0;'>" + escapeHtml_(address) + "</td></tr>";
  }

  if (message && message.trim() !== "") {
    htmlBody += "<tr><td style='padding:12px;background:#f8fafc;font-weight:bold;border-bottom:1px solid #e2e8f0;'>Message</td>" +
    "<td style='padding:12px;border-bottom:1px solid #e2e8f0;'>" + escapeHtml_(message) + "</td></tr>";
  }

  htmlBody += "<tr><td style='padding:12px;background:#f8fafc;font-weight:bold;border-bottom:1px solid #e2e8f0;'>Source</td>" +
    "<td style='padding:12px;border-bottom:1px solid #e2e8f0;'>" + escapeHtml_(source) + "</td></tr>" +
    "<tr><td style='padding:12px;background:#f8fafc;font-weight:bold;'>Submitted</td>" +
    "<td style='padding:12px;'>" + escapeHtml_(submittedAt) + "</td></tr>" +
    "</table>" +
    "</div>" +
    "<div style='padding:20px;background:#f8fafc;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;'>" +
    "<p style='margin:0;color:#64748b;font-size:12px;'>📋 Check your Google Sheet for all submissions.</p>" +
    "<p style='margin:8px 0 0 0;color:#64748b;font-size:12px;'>This is an automated notification from MSR Home Cleaning.</p>" +
    "</div>" +
    "</div>";

  try {
    GmailApp.sendEmail(NOTIFICATION_EMAILS, subject, "A new service request has been added.", {
      htmlBody: htmlBody,
      noReply: false,
    });
    Logger.log("Email notification sent to: " + NOTIFICATION_EMAILS);
  } catch (error) {
    Logger.log("Error sending email: " + error);
  }
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
