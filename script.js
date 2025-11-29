// MENU MOBILE
document.getElementById("mobile-menu-toggle")
  .addEventListener("click", () => {

    document
      .getElementById("mobile-menu")
      .classList.toggle("show");

  });


// FORMULÁRIO PARA WHATSAPP
document.getElementById("contactForm")
  .addEventListener("submit", function(e){

    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if(!nome || !email || !mensagem){
      alert("Preencha todos os campos.");
      return;
    }

    const texto =
      `Olá, meu nome é ${nome}. `
      + `Meu e-mail: ${email}. `
      + `Mensagem: ${mensagem}`;

    const url =
      "https://api.whatsapp.com/send?phone=5513996305218"
      + "&text=" + encodeURIComponent(texto);

    window.open(url, "_blank");

  });


// BOTÃO WHATSAPP SUMIR AO CHEGAR NO CONTATO
const whatsappBtn = document.getElementById("whatsappFloat");
const contact = document.getElementById("contact");

window.addEventListener("scroll", () => {

  const sectionTop = contact.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if(sectionTop < windowHeight - 120){

    whatsappBtn.classList.add("whatsapp-hide");

  }else{

    whatsappBtn.classList.remove("whatsapp-hide");

  }

});

