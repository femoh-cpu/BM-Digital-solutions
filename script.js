document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const form = document.getElementById("lead-form");
  const message = document.getElementById("form-message");

  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get("name")?.toString().trim() || "there";
      message.textContent = `Thanks, ${name}! We’ll reach out within one business day.`;
      form.reset();
    });
  }
});
