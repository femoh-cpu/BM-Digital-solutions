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

  // Welcome popup — shown once to each new visitor on the home page.
  if (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html")) {
    const welcomeSeen = localStorage.getItem("bm-welcome-seen");

    if (!welcomeSeen) {
      const style = document.createElement("style");
      style.textContent = `
        .bm-welcome-overlay{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:1rem;background:rgba(2,6,23,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:bmWelcomeFade .25s ease}
        .bm-welcome-modal{position:relative;width:min(520px,100%);padding:2rem;border:1px solid rgba(125,211,252,.28);border-radius:1.5rem;background:linear-gradient(145deg,#0f172a,#172554);color:#fff;box-shadow:0 30px 90px rgba(2,6,23,.5);text-align:center;animation:bmWelcomeUp .3s ease}
        .bm-welcome-icon{width:58px;height:58px;margin:0 auto 1rem;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#38bdf8,#2563eb);font-size:1.7rem;box-shadow:0 12px 28px rgba(37,99,235,.35)}
        .bm-welcome-modal h2{margin:0 0 .65rem;font-size:clamp(1.55rem,5vw,2rem);line-height:1.2}
        .bm-welcome-modal p{margin:0 auto 1.4rem;max-width:430px;color:rgba(255,255,255,.82);line-height:1.7;font-size:.95rem}
        .bm-welcome-actions{display:flex;justify-content:center;gap:.75rem;flex-wrap:wrap}
        .bm-welcome-actions a,.bm-welcome-close{font:inherit;cursor:pointer}
        .bm-welcome-actions a{display:inline-flex;align-items:center;justify-content:center;padding:.8rem 1.1rem;border-radius:999px;font-weight:700;text-decoration:none}
        .bm-welcome-primary{background:#f97316;color:#fff;box-shadow:0 10px 24px rgba(249,115,22,.24)}
        .bm-welcome-secondary{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2)}
        .bm-welcome-close{position:absolute;top:.75rem;right:.8rem;width:36px;height:36px;border:0;border-radius:50%;background:rgba(255,255,255,.08);color:#fff;font-size:1.25rem;line-height:1}
        .bm-welcome-close:hover{background:rgba(255,255,255,.16)}
        @keyframes bmWelcomeFade{from{opacity:0}to{opacity:1}}
        @keyframes bmWelcomeUp{from{opacity:0;transform:translateY(18px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        @media(max-width:560px){.bm-welcome-modal{padding:1.7rem 1.15rem 1.45rem;border-radius:1.25rem}.bm-welcome-actions{flex-direction:column}.bm-welcome-actions a{width:100%}}
      `;
      document.head.appendChild(style);

      const overlay = document.createElement("div");
      overlay.className = "bm-welcome-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-labelledby", "bm-welcome-title");
      overlay.innerHTML = `
        <div class="bm-welcome-modal">
          <button class="bm-welcome-close" type="button" aria-label="Close welcome message">×</button>
          <div class="bm-welcome-icon">👋</div>
          <h2 id="bm-welcome-title">Welcome to BM Digital Solutions</h2>
          <p><strong>Your ideas. Our digital expertise.</strong><br>We help businesses build a strong and professional online presence through modern websites, branding, SEO, and practical digital support.</p>
          <div class="bm-welcome-actions">
            <a class="bm-welcome-primary" href="contact.html">Start Your Project</a>
            <a class="bm-welcome-secondary" href="services.html">Explore Services</a>
          </div>
        </div>
      `;

      const closeWelcome = () => {
        localStorage.setItem("bm-welcome-seen", "true");
        overlay.remove();
      };

      overlay.querySelector(".bm-welcome-close").addEventListener("click", closeWelcome);
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeWelcome();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && document.body.contains(overlay)) closeWelcome();
      });

      document.body.appendChild(overlay);
    }
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
