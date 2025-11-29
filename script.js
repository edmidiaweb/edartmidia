// DOM ready
document.addEventListener("DOMContentLoaded", () => {

  // MENU MOBILE TOGGLE (safe guard)
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
      // also toggle aria-hidden for accessibility
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

  // WHATSAPP FLOAT: show/hide when contact section in view
  const whatsappBtn = document.getElementById("whatsappFloat");
  const contactSection = document.getElementById("contact");

  // If both exist, initialize visibility and add scroll/resize observers
  if (whatsappBtn && contactSection) {

    // Initially show button on mobile (CSS hides on desktop)
    whatsappBtn.classList.remove("whatsapp-hide");

    const checkHide = () => {
      const rect = contactSection.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // If top of contact section is within viewport minus offset, hide button
      if (rect.top < vh - 120) {
        whatsappBtn.classList.add("whatsapp-hide");
      } else {
        whatsappBtn.classList.remove("whatsapp-hide");
      }
    };

    // run once and on scroll/resize
    checkHide();
    window.addEventListener("scroll", checkHide, { passive: true });
    window.addEventListener("resize", checkHide);
  }

});
