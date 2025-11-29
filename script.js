// DOM ready
document.addEventListener("DOMContentLoaded", () => {

  // MENU MOBILE TOGGLE (safe guard)
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
      // Accessibility toggle
      const isHidden = mobileMenu.getAttribute("aria-hidden") === "true";
      mobileMenu.setAttribute("aria-hidden", (!isHidden).toString());
    });
  }

  // FORM -> WhatsApp (safe guard)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = (document.getElementById("nome") || {}).value || "";
      const email = (document.getElementById("email") || {}).value || "";
      const mensagem = (document.getElementById("mensagem") || {}).value || "";

      if (!nome.trim() || !email.trim() || !mensagem.trim()) {
        alert("Preencha todos os campos.");
        return;
      }

      const texto = `Olá, meu nome é ${nome.trim()}. Meu e-mail é ${email.trim()}. Mensagem: ${mensagem.trim()}`;
      const url = "https://api.whatsapp.com/send?phone=5513996305218&text=" + encodeURIComponent(texto);
      window.open(url, "_blank");
    });
  }

  // FOOTER YEAR
  const footerYear = document.getElementById("footerYear");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // WHATSAPP FLOAT: hide smoothly when #contact is in view
  const whatsappBtn = document.getElementById("whatsappFloat");
  const contactSection = document.getElementById("contact");

  if (!whatsappBtn || !contactSection) return; // nothing to do if missing

  const HIDE_CLASS = "whatsapp-hidden";
  const OFFSET_PX = 120; // hide when contact top is within viewport minus this offset

  // Fallback check function (used if IntersectionObserver not available)
  const checkByBounding = () => {
    const rect = contactSection.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh - OFFSET_PX) {
      // contact is visible (or near) -> hide button
      whatsappBtn.classList.add(HIDE_CLASS);
    } else {
      whatsappBtn.classList.remove(HIDE_CLASS);
    }
  };

  if ("IntersectionObserver" in window) {
    // observe when top of contact intersects viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // if contact is intersecting the viewport (even a little), hide button
        if (entry.isIntersecting) {
          whatsappBtn.classList.add(HIDE_CLASS);
        } else {
          whatsappBtn.classList.remove(HIDE_CLASS);
        }
      });
    }, {
      root: null,
      rootMargin: `0px 0px -${OFFSET_PX}px 0px`, // shrink bottom so hide earlier
      threshold: 0
    });

    observer.observe(contactSection);

    // Also run fallback once to set initial state
    checkByBounding();

  } else {
    // Fallback: on scroll/resize check bounding rect
    checkByBounding();
    window.addEventListener("scroll", checkByBounding, { passive: true });
    window.addEventListener("resize", checkByBounding);
  }

});
