document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const APK_URL = "https://github.com/femoh-cpu/BM-Digital-solutions/releases/download/v1.0.0/application-6575e8eb-55db-4ecf-9e5a-1608bd28be9e.apk";

  const brandText = document.querySelector(".brand-text");
  if (brandText && !brandText.querySelector(".brand-mark")) {
    brandText.innerHTML = '<span class="brand-mark">BM</span><span class="brand-name">Digital Solutions</span>';
  }

  const navBar = document.querySelector(".nav-bar");
  const navLinks = document.querySelector(".nav-links");
  const themeToggle = document.querySelector(".theme-toggle");

  if (navBar && navLinks && !navBar.querySelector(".nav-controls")) {
    const actions = document.createElement("div");
    actions.className = "nav-controls";

    const quoteLink = document.createElement("a");
    quoteLink.className = "header-cta";
    quoteLink.href = "contact.html";
    quoteLink.textContent = "Get a Free Quote";

    const appLink = document.createElement("a");
    appLink.className = "header-cta app-download-cta";
    appLink.href = APK_URL;
    appLink.target = "_blank";
    appLink.rel = "noopener";
    appLink.textContent = "📱 Download App";
    appLink.setAttribute("aria-label", "Download BM Business Assistant app");

    const mobileToggle = document.createElement("button");
    mobileToggle.type = "button";
    mobileToggle.className = "mobile-nav-toggle";
    mobileToggle.setAttribute("aria-label", "Toggle navigation");
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.innerHTML = '<span></span>';

    if (themeToggle) actions.appendChild(themeToggle);
    actions.appendChild(quoteLink);
    actions.appendChild(appLink);
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

  // Put a prominent app download button directly in the hero so it is always visible on phones.
  const heroActions = document.querySelector(".hero .hero-actions");
  if (heroActions && !heroActions.querySelector(".hero-app-download")) {
    const heroApp = document.createElement("a");
    heroApp.className = "btn btn-primary hero-app-download";
    heroApp.href = APK_URL;
    heroApp.target = "_blank";
    heroApp.rel = "noopener";
    heroApp.textContent = "📱 Download App";
    heroApp.setAttribute("aria-label", "Download BM Business Assistant app");
    heroActions.insertBefore(heroApp, heroActions.firstChild);

    const heroStyle = document.createElement("style");
    heroStyle.textContent = `
      .hero-app-download{display:inline-flex;align-items:center;justify-content:center;min-width:170px;}
      @media(max-width:980px){
        .hero-app-download{width:100%;max-width:360px;min-height:50px;font-size:1rem;}
        .hero .hero-actions{display:flex;flex-direction:column;align-items:flex-start;gap:.75rem;}
        .hero .hero-actions .btn{width:100%;max-width:360px;text-align:center;}
      }
    `;
    document.head.appendChild(heroStyle);
  }

  if (navLinks) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }

  const revealTargets = document.querySelectorAll('.section, .info-card, .pricing-card, .testimonial-card, .content-card, .faq-item, .contact-card, .contact-form, .showcase-banner, .demo-tile, .gallery-card, .timeline-item');
  revealTargets.forEach((el) => el.classList.add('reveal-hidden'));
  if ('IntersectionObserver' in window) {
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
  } else {
    revealTargets.forEach((el) => el.classList.add('reveal'));
  }

  const loadingScreen = document.querySelector(".loading-screen");
  if (loadingScreen) window.setTimeout(() => loadingScreen.classList.add("hidden"), 900);

  const header = document.querySelector(".site-header");
  const backToTop = document.querySelector(".back-to-top");
  const toggleStickyHeader = () => {
    if (!header) return;
    header.classList.toggle("sticky", window.scrollY > 60);
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 350);
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

  const isHomePage = window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html");
  const welcomeKey = "bm-welcome-v2-seen";
  if (isHomePage && !localStorage.getItem(welcomeKey)) {
    const style = document.createElement("style");
    style.textContent = `
      .bm-welcome-overlay{position:fixed!important;inset:0!important;z-index:2147483647!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:18px!important;background:rgba(2,6,23,.78)!important;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
      .bm-welcome-modal{position:relative;width:min(520px,calc(100vw - 30px));padding:32px 26px 26px;border:1px solid rgba(125,211,252,.35);border-radius:24px;background:linear-gradient(145deg,#0b1220,#172554);color:#fff;box-shadow:0 30px 90px rgba(0,0,0,.6);text-align:center}
      .bm-welcome-icon{width:60px;height:60px;margin:0 auto 14px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#38bdf8,#2563eb);font-size:28px}
      .bm-welcome-modal h2{margin:0 35px 10px;font-size:clamp(24px,6vw,32px);line-height:1.2;color:#fff}
      .bm-welcome-modal p{margin:0 auto 20px;max-width:440px;color:#dbeafe;line-height:1.65;font-size:15px}
      .bm-welcome-modal p strong{color:#fff}
      .bm-welcome-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap}
      .bm-welcome-actions a{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:11px 18px;border-radius:999px;font-weight:700;text-decoration:none}
      .bm-welcome-primary{background:#f97316;color:#fff!important;box-shadow:0 10px 24px rgba(249,115,22,.25)}
      .bm-welcome-secondary{background:rgba(255,255,255,.1);color:#fff!important;border:1px solid rgba(255,255,255,.22)}
      .bm-welcome-close{position:absolute;top:10px;right:10px;width:38px;height:38px;border:0;border-radius:50%;background:rgba(255,255,255,.1);color:#fff;font-size:25px;line-height:38px;cursor:pointer}
      @media(max-width:560px){.bm-welcome-modal{padding:28px 17px 20px;border-radius:20px}.bm-welcome-actions{flex-direction:column}.bm-welcome-actions a{width:100%}}
    `;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.className = "bm-welcome-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = `
      <div class="bm-welcome-modal">
        <button class="bm-welcome-close" type="button" aria-label="Close welcome message">×</button>
        <div class="bm-welcome-icon">👋</div>
        <h2>Welcome to BM Digital Solutions</h2>
        <p><strong>Your ideas. Our digital expertise.</strong><br>We help businesses build a strong and professional online presence through modern websites, branding, SEO, and practical digital support.</p>
        <div class="bm-welcome-actions">
          <a class="bm-welcome-primary" href="contact.html">Start Your Project</a>
          <a class="bm-welcome-secondary" href="services.html">Explore Services</a>
        </div>
      </div>`;

    const closeWelcome = () => {
      localStorage.setItem(welcomeKey, "true");
      overlay.remove();
    };
    overlay.querySelector(".bm-welcome-close").addEventListener("click", closeWelcome);
    overlay.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => localStorage.setItem(welcomeKey, "true")));
    overlay.addEventListener("click", (event) => { if (event.target === overlay) closeWelcome(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && document.body.contains(overlay)) closeWelcome(); });
    document.body.appendChild(overlay);
  }

  const form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const msg = document.getElementById("form-message");
      const data = new FormData(f);
      const name = data.get("name")?.toString().trim() || "there";
      const email = data.get("email")?.toString().trim() || "";
      const business = data.get("business")?.toString().trim() || "";
      if (!name || !email || !business) {
        if (msg) { msg.textContent = "Please complete all required fields so we can prepare your quote."; msg.classList.remove('success'); msg.classList.add('error'); }
        return;
      }
      if (!email.includes("@")) {
        if (msg) { msg.textContent = "Please enter a valid email address."; msg.classList.remove('success'); msg.classList.add('error'); }
        return;
      }
      const action = f.getAttribute("action");
      if (f.dataset.remote === "true" && action) {
        try {
          const res = await fetch(action, { method:"POST", body:data, headers:{Accept:"application/json"} });
          if (!res.ok) throw new Error("Submission failed");
        } catch (err) {
          if (msg) { msg.textContent = "Network error. Please try again or email brianmumo939@gmail.com"; msg.classList.remove('success'); msg.classList.add('error'); }
          return;
        }
      }
      if (msg) { msg.textContent = `Thanks, ${name}! We’ll reach out shortly with your quote for ${business}.`; msg.classList.remove('error'); msg.classList.add('success'); }
      f.reset();
    });
  }
});
