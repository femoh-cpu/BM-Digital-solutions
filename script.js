document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const loadingScreen = document.querySelector(".loading-screen");
  if (loadingScreen) {
    window.setTimeout(() => loadingScreen.classList.add("hidden"), 900);
  }

  const header = document.querySelector(".site-header");
  const backToTop = document.querySelector(".back-to-top");

  const toggleStickyHeader = () => {
    if (!header) return;
    header.classList.toggle("sticky", window.scrollY > 60);
    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 350);
    }
  };

  toggleStickyHeader();
  window.addEventListener("scroll", toggleStickyHeader, { passive: true });

  const toggleButton = document.querySelector(".theme-toggle");
  if (toggleButton) {
    const savedTheme = localStorage.getItem("bm-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
    document.body.classList.toggle("dark", isDark);
    toggleButton.textContent = isDark ? "🌙" : "☀️";

    toggleButton.addEventListener("click", () => {
      const isNowDark = document.body.classList.toggle("dark");
      localStorage.setItem("bm-theme", isNowDark ? "dark" : "light");
      toggleButton.textContent = isNowDark ? "🌙" : "☀️";
    });
  }

  const form = document.getElementById("lead-form");
  const message = document.getElementById("form-message");

  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get("name")?.toString().trim() || "there";
      const email = data.get("email")?.toString().trim() || "";
      const business = data.get("business")?.toString().trim() || "";

      if (!name || !email || !business) {
        message.textContent = "Please complete all required fields so we can prepare your quote.";
        return;
      }

      if (!email.includes("@")) {
        message.textContent = "Please enter a valid email address.";
        return;
      }

      message.textContent = `Thanks, ${name}! We’ll reach out shortly with your quote for ${business}.`;
      form.reset();
    });
  }
});
