(function () {
  const STORAGE_KEY = "msr-landing-lead";
  const form = document.getElementById("landing-lead-form");
  const nameInput = document.getElementById("lead-name");
  const phoneInput = document.getElementById("lead-phone");
  const serviceInput = document.getElementById("service-interest");
  const errorMessage = document.getElementById("form-error");
  const serviceBanner = document.getElementById("selected-service-banner");
  const serviceText = document.getElementById("selected-service-text");
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

  const normalizePhone = (value) => value.replace(/\D/g, "").slice(0, 10);

  const updateSelectedService = (serviceName) => {
    if (!serviceInput || !serviceBanner || !serviceText) {
      return;
    }

    const nextService = serviceName && serviceName.trim() ? serviceName.trim() : "General Cleaning";
    serviceInput.value = nextService;
    serviceText.textContent = nextService;
    serviceBanner.hidden = false;
  };

  serviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const serviceName = button.getAttribute("data-service") || "General Cleaning";
      updateSelectedService(serviceName);
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      nameInput?.focus();
    });
  });

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

    form.addEventListener("submit", (event) => {
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

      if (!/^\d{10}$/.test(phone)) {
        errorMessage.textContent = "Please enter a valid 10-digit phone number.";
        phoneInput.focus();
        return;
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
