function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents || "{}");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "submittedAt",
        "service",
        "name",
        "phone",
        "address",
        "source",
      ]);
    }

    sheet.appendRow([
      data.submittedAt || "",
      data.service || "",
      data.name || "",
      data.phone || "",
      data.address || "",
      data.source || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        error: String(error),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
