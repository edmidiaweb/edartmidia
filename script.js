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
if (whatsappBtn && contactSection) {
  const observer = ("IntersectionObserver" in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) whatsappBtn.classList.add("whatsapp-hide");
          else whatsappBtn.classList.remove("whatsapp-hide");
        });
      }, { root: null, rootMargin: '0px 0px -120px 0px', threshold: 0 })
    : null;

  if (observer) observer.observe(contactSection);
  else {
    const check = () => {
      const rect = contactSection.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh - 120) whatsappBtn.classList.add("whatsapp-hide");
      else whatsappBtn.classList.remove("whatsapp-hide");
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
  }
}
