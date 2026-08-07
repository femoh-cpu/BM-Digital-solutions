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

  async function handleFormSubmit(e) {
    e.preventDefault();
    const f = e.currentTarget;
    const msg = document.getElementById("form-message");
    const data = new FormData(f);
    const name = data.get("name")?.toString().trim() || "there";
    const email = data.get("email")?.toString().trim() || "";
    const business = data.get("business")?.toString().trim() || "";

    if (!name || !email || !business) {
      if (msg) msg.textContent = "Please complete all required fields so we can prepare your quote.";
      return;
    }

    if (!email.includes("@")) {
      if (msg) msg.textContent = "Please enter a valid email address.";
      return;
    }

    // If form is configured to post to a remote endpoint (e.g., Formspree)
    const action = f.getAttribute("action");
    const isRemote = f.dataset.remote === "true" && action && action.length > 0;

    if (isRemote) {
      try {
        const res = await fetch(action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        });
        if (res.ok) {
          if (msg) msg.textContent = `Thanks, ${name}! We’ll reach out shortly with your quote for ${business}.`;
          f.reset();
        } else {
          const j = await res.json().catch(() => null);
          if (msg) msg.textContent = (j && j.error) ? j.error : 'Submission failed. Please email us at brianmumo939@gmail.com';
        }
      } catch (err) {
        if (msg) msg.textContent = 'Network error. Please try again or email brianmumo939@gmail.com';
      }
    } else {
      if (msg) msg.textContent = `Thanks, ${name}! We’ll reach out shortly with your quote for ${business}.`;
      f.reset();
    }
  }

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
