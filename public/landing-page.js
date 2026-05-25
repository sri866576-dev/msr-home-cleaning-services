// Bundled landing page script with Sheets webhook support
(function () {
  const STORAGE_KEY = "msr-landing-lead";
  const SHEETS_WEBHOOK_URL =
    "https://script.google.com/macros/s/AKfycbwRT5DlHoDNgy2-wFiRQKUWFeTvGxRyLOkU9LCAdRisdKhJNrGSag7l0XZw8Iw3WA6wLA/exec";
  const form = document.getElementById("landing-lead-form");
  const nameInput = document.getElementById("lead-name");
  const phoneInput = document.getElementById("lead-phone");
  const serviceInput = document.getElementById("service-interest");
  const errorMessage = document.getElementById("form-error");
  const serviceTitle = document.getElementById("lead-service-title");
  const serviceButtons = document.querySelectorAll("[data-service]");
  const yearTargets = document.querySelectorAll("#current-year");

  yearTargets.forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const normalizeName = (value) =>
    value
      .replace(/[^A-Za-z\s]/g, "")
      .replace(/\s{2,}/g, " ")
      .trimStart()
      .slice(0, 100);

  const normalizePhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    return digits;
  };

  const isValidPhone = (value) => /^\d{10}$/.test(value);

  const saveLeadToSheet = async (lead) => {
    if (!SHEETS_WEBHOOK_URL) {
      return false;
    }

    await fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(lead),
    });

    return true;
  };

  const updateSelectedService = (serviceName) => {
    if (!serviceInput || !serviceTitle) {
      return;
    }

    const nextService = serviceName && serviceName.trim() ? serviceName.trim() : "General Cleaning";
    serviceInput.value = nextService;
    serviceTitle.textContent = nextService;
  };

  serviceButtons.forEach((button) => {
    const selectService = () => {
      const serviceName = button.getAttribute("data-service") || "General Cleaning";
      updateSelectedService(serviceName);
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      nameInput?.focus();
    };

    button.addEventListener("click", selectService);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectService();
      }
    });
  });

  if (serviceInput) {
    serviceInput.addEventListener("change", () => {
      updateSelectedService(serviceInput.value);
      if (errorMessage) {
        errorMessage.textContent = "";
      }
    });
  }

  if (nameInput) {
    nameInput.addEventListener("input", () => {
      nameInput.value = normalizeName(nameInput.value);
      if (errorMessage) {
        errorMessage.textContent = "";
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      phoneInput.value = normalizePhone(phoneInput.value);
      if (errorMessage) {
        errorMessage.textContent = "";
      }
    });
  }

  if (form && nameInput && phoneInput && serviceInput) {
    updateSelectedService(serviceInput.value);

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = normalizeName(nameInput.value).trim();
      const phone = normalizePhone(phoneInput.value);
      const service = serviceInput.value || "General Cleaning";

      nameInput.value = name;
      phoneInput.value = phone;

      if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(name)) {
        errorMessage.textContent = "Please enter a valid name using letters and spaces only.";
        nameInput.focus();
        return;
      }

      if (!isValidPhone(phone)) {
        errorMessage.textContent = "Please enter a valid 10-digit phone number.";
        phoneInput.focus();
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Saving Request...";
      }

      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          name,
          phone,
          service,
          submittedAt: new Date().toISOString(),
        }),
      );

      try {
        await saveLeadToSheet({
          submittedAt: new Date().toISOString(),
          service,
          name,
          phone,
          address: "",
          source: "landing-page",
        });
      } catch (error) {
        if (errorMessage) {
          errorMessage.textContent = "We could not save your request right now. Please try again.";
        }

        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Book Free Consultation";
        }
        return;
      }

      window.location.href = "thank-you.html";
    });
  }

  const summary = document.getElementById("thank-you-summary");
  const summaryName = document.getElementById("summary-name");
  const summaryPhone = document.getElementById("summary-phone");
  const summaryService = document.getElementById("summary-service");

  if (summary && summaryName && summaryPhone && summaryService) {
    const rawLead = sessionStorage.getItem(STORAGE_KEY);

    if (rawLead) {
      try {
        const lead = JSON.parse(rawLead);
        summaryName.textContent = lead.name || "-";
        summaryPhone.textContent = lead.phone || "-";
        summaryService.textContent = lead.service || "General Cleaning";
        summary.hidden = false;
      } catch (error) {
        summary.hidden = true;
      }
    }
  }
})();
