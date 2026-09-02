document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const brandText = document.querySelector(".brand-text");
  if (brandText && !brandText.querySelector(".brand-mark")) {
    brandText.innerHTML = '<span class="brand-mark">BM</span><span class="brand-name">Digital Solutions</span>';
  }

  const navBar = document.querySelector(".nav-bar");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.querySelector(".theme-toggle");

  if (navBar && navLinks) {
    if (!navBar.querySelector(".nav-controls")) {
      const actions = document.createElement("div");
      actions.className = "nav-controls";

      const quoteLink = document.createElement("a");
      quoteLink.className = "header-cta";
      quoteLink.href = "contact.html";
      quoteLink.textContent = "Get a Free Quote";

      const mobileToggle = document.createElement("button");
      mobileToggle.type = "button";
      mobileToggle.className = "mobile-nav-toggle";
      mobileToggle.setAttribute("aria-label", "Toggle navigation");
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.innerHTML = '<span></span>';

      if (themeToggle) {
        actions.appendChild(themeToggle);
      }

      actions.appendChild(quoteLink);
      actions.appendChild(mobileToggle);

      navBar.appendChild(actions);

      mobileToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        mobileToggle.setAttribute("aria-expanded", String(isOpen));
      });

      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth <= 980) {
            navLinks.classList.remove("open");
            mobileToggle.setAttribute("aria-expanded", "false");
          }
        });
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 980) {
          navLinks.classList.remove("open");
          mobileToggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      const isMatch = href && (href === currentPage || (currentPage === '' && href === 'index.html'));
      if (isMatch) {
        link.classList.add('active');
      }
    });
  }

  const revealTargets = document.querySelectorAll('.section, .info-card, .pricing-card, .testimonial-card, .content-card, .faq-item, .contact-card, .contact-form, .showcase-banner, .demo-tile, .gallery-card, .timeline-item');
  revealTargets.forEach((el) => {
    el.classList.add('reveal-hidden');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-hidden');
        entry.target.classList.add('reveal');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach((el) => revealObserver.observe(el));

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

  if (themeToggle) {
    const savedTheme = localStorage.getItem("bm-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
    document.body.classList.toggle("dark", isDark);
    themeToggle.textContent = isDark ? "🌙" : "☀️";

    themeToggle.addEventListener("click", () => {
      const isNowDark = document.body.classList.toggle("dark");
      localStorage.setItem("bm-theme", isNowDark ? "dark" : "light");
      themeToggle.textContent = isNowDark ? "🌙" : "☀️";
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
      if (msg) {
        msg.textContent = "Please complete all required fields so we can prepare your quote.";
        msg.classList.remove('success');
        msg.classList.add('error');
      }
      return;
    }

    if (!email.includes("@")) {
      if (msg) {
        msg.textContent = "Please enter a valid email address.";
        msg.classList.remove('success');
        msg.classList.add('error');
      }
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
          if (msg) {
            msg.textContent = `Thanks, ${name}! We’ll reach out shortly with your quote for ${business}.`;
            msg.classList.remove('error');
            msg.classList.add('success');
          }
          f.reset();
        } else {
          const j = await res.json().catch(() => null);
          if (msg) {
            msg.textContent = (j && j.error) ? j.error : 'Submission failed. Please email us at brianmumo939@gmail.com';
            msg.classList.remove('success');
            msg.classList.add('error');
          }
        }
      } catch (err) {
        if (msg) {
          msg.textContent = 'Network error. Please try again or email brianmumo939@gmail.com';
          msg.classList.remove('success');
          msg.classList.add('error');
        }
      }
    } else {
      if (msg) {
        msg.textContent = `Thanks, ${name}! We’ll reach out shortly with your quote for ${business}.`;
        msg.classList.remove('error');
        msg.classList.add('success');
      }
      f.reset();
    }
  }

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
