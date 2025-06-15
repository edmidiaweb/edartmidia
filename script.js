// Menu mobile toggle
document.getElementById("mobile-menu-toggle").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("show");
});

// Validação e envio para WhatsApp
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    alert("Preencha todos os campos.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Digite um e-mail válido.");
    return;
  }

  const texto = `Olá, meu nome é ${nome}. Meu e-mail é ${email}. Mensagem: ${mensagem}`;
  const url = `https://api.whatsapp.com/send?phone=5513996305218&text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
});
