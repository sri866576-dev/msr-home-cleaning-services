export type BookingLead = {
  submittedAt: string;
  service: string;
  name: string;
  phone: string;
  address: string;
  source: string;
};

const SHEETS_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim() ?? "";
const GOOGLE_FORM_PREFILL_URL = import.meta.env.VITE_GOOGLE_FORM_PREFILL_URL?.trim() ?? "";
const GOOGLE_FORM_ENTRY_NAME = import.meta.env.VITE_GOOGLE_FORM_ENTRY_NAME?.trim() ?? "";
const GOOGLE_FORM_ENTRY_PHONE = import.meta.env.VITE_GOOGLE_FORM_ENTRY_PHONE?.trim() ?? "";
const GOOGLE_FORM_ENTRY_SERVICE = import.meta.env.VITE_GOOGLE_FORM_ENTRY_SERVICE?.trim() ?? "";
const GOOGLE_FORM_ENTRY_ADDRESS = import.meta.env.VITE_GOOGLE_FORM_ENTRY_ADDRESS?.trim() ?? "";

function buildGoogleFormSubmitUrl() {
  if (!GOOGLE_FORM_PREFILL_URL) {
    return null;
  }

  try {
    const url = new URL(GOOGLE_FORM_PREFILL_URL);

    if (url.pathname.endsWith("/viewform")) {
      url.pathname = url.pathname.replace(/\/viewform$/, "/formResponse");
    } else if (url.pathname.endsWith("/prefill")) {
      url.pathname = url.pathname.replace(/\/prefill$/, "/formResponse");
    } else if (!url.pathname.endsWith("/formResponse")) {
      return null;
    }

    url.search = "";
    return url.toString();
  } catch {
    return null;
  }
}

function isGoogleFormConfigured() {
  return Boolean(
    GOOGLE_FORM_PREFILL_URL &&
    GOOGLE_FORM_ENTRY_NAME &&
    GOOGLE_FORM_ENTRY_PHONE &&
    GOOGLE_FORM_ENTRY_SERVICE,
  );
}

export function buildGoogleFormPrefillUrl(
  lead: Pick<BookingLead, "name" | "phone" | "service" | "address">,
) {
  if (!isGoogleFormConfigured()) {
    return null;
  }

  try {
    const url = new URL(GOOGLE_FORM_PREFILL_URL);
    url.searchParams.set(GOOGLE_FORM_ENTRY_NAME, lead.name);
    url.searchParams.set(GOOGLE_FORM_ENTRY_PHONE, lead.phone);
    url.searchParams.set(GOOGLE_FORM_ENTRY_SERVICE, lead.service);

    if (GOOGLE_FORM_ENTRY_ADDRESS && lead.address) {
      url.searchParams.set(GOOGLE_FORM_ENTRY_ADDRESS, lead.address);
    }

    return url.toString();
  } catch {
    return null;
  }
}

export async function saveBookingLeadToSheet(lead: BookingLead) {
  if (!SHEETS_WEBHOOK_URL) {
    return false;
  }

  const response = await fetch(SHEETS_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify(lead),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets webhook failed with status ${response.status}`);
  }

  return true;
}

export async function submitBookingLeadToGoogleForm(
  lead: Pick<BookingLead, "name" | "phone" | "service" | "address">,
) {
  if (!isGoogleFormConfigured()) {
    return false;
  }

  const submitUrl = buildGoogleFormSubmitUrl();
  if (!submitUrl) {
    return false;
  }

  const formData = new URLSearchParams();
  formData.set(GOOGLE_FORM_ENTRY_NAME, lead.name);
  formData.set(GOOGLE_FORM_ENTRY_PHONE, lead.phone);
  formData.set(GOOGLE_FORM_ENTRY_SERVICE, lead.service);

  if (GOOGLE_FORM_ENTRY_ADDRESS && lead.address) {
    formData.set(GOOGLE_FORM_ENTRY_ADDRESS, lead.address);
  }

  await fetch(submitUrl, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });

  return true;
}
