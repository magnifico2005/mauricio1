(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Analytics (stub) ---------- */
  function track(eventName, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params || {});
    }
    document.dispatchEvent(new CustomEvent("site:event", { detail: { eventName, params } }));
  }
  window.track = track;

  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => track(el.getAttribute("data-track"), {
      label: el.getAttribute("data-track-label") || el.textContent.trim().slice(0, 60),
    }));
  });

  /* ---------- WhatsApp flutuante: oculta ao alcançar o rodapé ---------- */
  const whatsappFloat = document.querySelector(".whatsapp-float");
  const siteFooter = document.querySelector(".site-footer");
  if (whatsappFloat && siteFooter && "IntersectionObserver" in window) {
    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          whatsappFloat.classList.toggle("is-hidden", entry.isIntersecting);
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    footerObserver.observe(siteFooter);
  }

  /* ---------- Header: estado de scroll ---------- */
  const header = document.querySelector(".site-header");
  if (header) {
    const setScrolled = () => header.setAttribute("data-scrolled", window.scrollY > 8 ? "true" : "false");
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navMobile = document.querySelector(".nav-mobile");
  if (menuToggle && navMobile) {
    const closeMenu = () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navMobile.setAttribute("data-open", "false");
      document.body.style.overflow = "";
    };
    const openMenu = () => {
      menuToggle.setAttribute("aria-expanded", "true");
      navMobile.setAttribute("data-open", "true");
      document.body.style.overflow = "hidden";
    };
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });
    navMobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Reveal no scroll ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
      );
      revealEls.forEach((el) => io.observe(el));
    }
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-item__q");
    const panel = item.querySelector(".faq-item__a");
    if (!btn || !panel) return;
    btn.addEventListener("click", () => {
      const isOpen = item.getAttribute("data-open") === "true";
      item.parentElement.querySelectorAll(".faq-item").forEach((other) => {
        other.setAttribute("data-open", "false");
        other.querySelector(".faq-item__q")?.setAttribute("aria-expanded", "false");
        const otherPanel = other.querySelector(".faq-item__a");
        if (otherPanel) otherPanel.style.maxHeight = "";
      });
      if (!isOpen) {
        item.setAttribute("data-open", "true");
        btn.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  /* ---------- Progresso de leitura (artigos) ---------- */
  const progressBar = document.querySelector(".reading-progress");
  const articleBody = document.querySelector(".article-body");
  if (progressBar && articleBody) {
    const update = () => {
      const rect = articleBody.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      progressBar.style.width = pct.toFixed(1) + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ---------- Objetivos: navegação contextual (sem coleta clínica) ---------- */
  const goalsWidget = document.querySelector("[data-goals]");
  if (goalsWidget) {
    const buttons = goalsWidget.querySelectorAll(".goal-btn");
    const resultTitle = goalsWidget.querySelector("[data-goals-title]");
    const resultText = goalsWidget.querySelector("[data-goals-text]");
    const resultLink = goalsWidget.querySelector("[data-goals-link]");
    const placeholder = goalsWidget.querySelector("[data-goals-placeholder]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");

        const title = btn.getAttribute("data-result-title");
        const text = btn.getAttribute("data-result-text");
        const href = btn.getAttribute("data-result-href");
        const linkLabel = btn.getAttribute("data-result-link-label");

        if (placeholder) placeholder.hidden = true;
        if (resultTitle) resultTitle.textContent = title || "";
        if (resultText) resultText.textContent = text || "";
        if (resultLink && href) {
          resultLink.href = href;
          resultLink.textContent = linkLabel || "Saiba mais";
          resultLink.hidden = false;
        }
        track("goal_selected", { label: title });
      });
    });
  }

  /* ---------- Formulário de contato -> WhatsApp ---------- */
  const contactForm = document.querySelector("[data-whatsapp-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const number = contactForm.getAttribute("data-whatsapp-number");
      const name = contactForm.querySelector("#contact-name")?.value.trim() || "";
      const phone = contactForm.querySelector("#contact-phone")?.value.trim() || "";
      const subjectEl = contactForm.querySelector("#contact-subject");
      const subject = subjectEl ? subjectEl.options[subjectEl.selectedIndex]?.text : "";

      const lines = [
        "Olá, gostaria de falar sobre atendimento.",
        name ? `Nome: ${name}` : "",
        phone ? `Meu WhatsApp: ${phone}` : "",
        subject ? `Assunto: ${subject}` : "",
      ].filter(Boolean);

      const message = encodeURIComponent(lines.join("\n"));
      track("contact_started", { subject });
      window.open(`https://wa.me/${number}?text=${message}`, "_blank", "noopener");
    });
  }
})();
