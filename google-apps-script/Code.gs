var NOTIFICATION_EMAIL = "spacialisthomecleaning@gmail.com";
var SPREADSHEET_ID = "1RjwCN7h-1B0Zjm3XfzPjCRzHWt5PWZchRejjhkygDFU";
var SHEET_NAME = "servicemsr";

var HEADERS = [
  "Submitted At",
  "Service",
  "Name",
  "Phone",
  "Address / Locality",
  "Message",
  "Source",
  "Page URL",
  "User Agent",
];

function doGet() {
  return jsonResponse_({
    ok: true,
    message: "MSR Deep Cleaning lead webhook is working.",
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    var data = parseRequest_(e);
    var lead = normalizeLead_(data);
    var sheet = getLeadSheet_();

    ensureHeader_(sheet);
    sheet.appendRow([
      lead.submittedAt,
      lead.service,
      lead.name,
      lead.phone,
      lead.address,
      lead.message,
      lead.source,
      lead.pageUrl,
      lead.userAgent,
    ]);

    sendLeadEmail_(lead);

    return jsonResponse_({
      ok: true,
      message: "Lead saved and email sent.",
    });
  } catch (error) {
    console.error(error);
    return jsonResponse_({
      ok: false,
      error: String(error && error.message ? error.message : error),
    });
  } finally {
    try {
      lock.releaseLock();
    } catch (releaseError) {
      console.error(releaseError);
    }
  }
}

function parseRequest_(e) {
  if (!e) {
    return {};
  }

  if (e.postData && e.postData.contents) {
    var body = e.postData.contents;
    var contentType = String(e.postData.type || "").toLowerCase();

    if (contentType.indexOf("application/json") !== -1 || looksLikeJson_(body)) {
      try {
        return JSON.parse(body);
      } catch (jsonError) {
        throw new Error("Invalid JSON payload: " + jsonError.message);
      }
    }
  }

  return e.parameter || {};
}

function looksLikeJson_(body) {
  var trimmed = String(body || "").trim();
  return trimmed.charAt(0) === "{" || trimmed.charAt(0) === "[";
}

function normalizeLead_(data) {
  data = data || {};

  var submittedAt = cleanText_(data.submittedAt) || new Date().toISOString();
  var service = cleanText_(data.service) || "General Enquiry";
  var name = cleanText_(data.name) || "Not provided";
  var phone = cleanPhone_(data.phone);
  var address = cleanText_(data.address || data.locality);
  var message = cleanText_(data.message);
  var source = cleanText_(data.source) || "website";
  var pageUrl = cleanText_(data.pageUrl || data.url);
  var userAgent = cleanText_(data.userAgent);

  return {
    submittedAt: submittedAt,
    service: service,
    name: name,
    phone: phone || "Not provided",
    address: address,
    message: message,
    source: source,
    pageUrl: pageUrl,
    userAgent: userAgent,
  };
}

function cleanText_(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1000);
}

function cleanPhone_(value) {
  if (value === null || value === undefined) {
    return "";
  }

  var digits = String(value).replace(/\D/g, "");
  if (digits.length > 10 && digits.indexOf("91") === 0) {
    digits = digits.slice(2);
  }

  return digits.slice(-10);
}

function getLeadSheet_() {
  var spreadsheet;

  if (SPREADSHEET_ID && SPREADSHEET_ID.trim()) {
    spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  } else {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!spreadsheet) {
    throw new Error("Spreadsheet not found. Set SPREADSHEET_ID or bind this script to a Sheet.");
  }

  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  return sheet;
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  } else {
    var currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    var needsHeaderFix = false;

    for (var i = 0; i < HEADERS.length; i += 1) {
      if (currentHeaders[i] !== HEADERS[i]) {
        needsHeaderFix = true;
        break;
      }
    }

    if (needsHeaderFix) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }
  }

  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#008A90");
  headerRange.setFontColor("#ffffff");
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, HEADERS.length);
}

function sendLeadEmail_(lead) {
  var subject = "New MSR Cleaning Lead - " + lead.name + " - " + lead.service;
  var plainBody =
    "New service request received\n\n" +
    "Service: " + lead.service + "\n" +
    "Name: " + lead.name + "\n" +
    "Phone: " + lead.phone + "\n" +
    "Address / Locality: " + (lead.address || "Not provided") + "\n" +
    "Message: " + (lead.message || "Not provided") + "\n" +
    "Source: " + lead.source + "\n" +
    "Submitted At: " + lead.submittedAt + "\n";

  var emails = NOTIFICATION_EMAIL.split(",");
  for (var i = 0; i < emails.length; i += 1) {
    var email = emails[i].trim();
    if (!email) continue;

    var htmlBody =
      "<div style='font-family:Arial,sans-serif;max-width:640px;color:#0D2A3A;background:#ffffff;'>" +
      "<div style='background:#008A90;color:#ffffff;padding:18px 20px;border-radius:12px 12px 0 0;'>" +
      "<h2 style='margin:0;font-size:20px;'>New MSR Cleaning Lead</h2>" +
      "<p style='margin:6px 0 0;font-size:13px;'>A customer submitted a request from the website.</p>" +
      "</div>" +
      "<table style='width:100%;border-collapse:collapse;border:1px solid #d7eeee;border-top:none;'>" +
      emailRow_("Service", lead.service) +
      emailRow_("Name", lead.name) +
      emailRow_("Phone", lead.phone) +
      emailRow_("Address / Locality", lead.address || "Not provided") +
      emailRow_("Message", lead.message || "Not provided") +
      emailRow_("Source", lead.source) +
      emailRow_("Submitted At", lead.submittedAt) +
      emailRow_("Page URL", lead.pageUrl || "Not captured") +
      "</table>" +
      "<div style='padding:14px 20px;background:#F4F7F6;border:1px solid #d7eeee;border-top:none;border-radius:0 0 12px 12px;'>" +
      "<p style='margin:0;font-size:12px;color:#5A707A;'>This email was sent to " +
      escapeHtml_(email) +
      ".</p>" +
      "</div>" +
      "</div>";

    try {
      MailApp.sendEmail(email, subject, plainBody, {
        htmlBody: htmlBody,
      });
      console.log("Email successfully sent to " + email);
    } catch (emailError) {
      console.error("Failed to send email to " + email + ": " + String(emailError && emailError.message ? emailError.message : emailError));
    }
  }
}

function emailRow_(label, value) {
  return (
    "<tr>" +
    "<td style='width:180px;padding:12px 14px;background:#F4F7F6;border-bottom:1px solid #d7eeee;font-weight:bold;'>" +
    escapeHtml_(label) +
    "</td>" +
    "<td style='padding:12px 14px;border-bottom:1px solid #d7eeee;'>" +
    escapeHtml_(value || "") +
    "</td>" +
    "</tr>"
  );
}

function escapeHtml_(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function testLeadEmail() {
  sendLeadEmail_({
    submittedAt: new Date().toISOString(),
    service: "Test Cleaning Service",
    name: "Test Customer",
    phone: "9876543210",
    address: "Hyderabad",
    message: "This is a test lead email.",
    source: "apps-script-test",
    pageUrl: "",
    userAgent: "",
  });
}

function testDoPost() {
  var dummyEvent = {
    postData: {
      contents: JSON.stringify({
        submittedAt: new Date().toISOString(),
        service: "Deep Home Cleaning",
        name: "Diagnostic Test",
        phone: "9999999999",
        address: "Test Location",
        message: "Testing doPost execution",
        source: "diagnostic-test"
      }),
      type: "application/json"
    }
  };
  
  var result = doPost(dummyEvent);
  Logger.log(result.getContentText());
}
