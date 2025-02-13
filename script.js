document.addEventListener("DOMContentLoaded", function () {
    // Animação das seções
    const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.1, // Ativa a transição quando 10% da seção estiver visível
        }
    );
    sections.forEach((section) => {
        observer.observe(section);
    });

    // Rolagem suave para links de navegação
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Inicialize o EmailJS com sua Public Key
    emailjs.init('M_0BhcWdn6oIYVXxh'); // Use sua Public Key aqui

    // Configuração do formulário de contato
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtenha os dados do formulário
            const formData = {
                from_name: contactForm.querySelector('[name="from_name"]').value,
                reply_to: contactForm.querySelector('[name="reply_to"]').value,
                message: contactForm.querySelector('[name="message"]').value
            };

            // Envie o e-mail usando o template do EmailJS
            emailjs.send('service_wsr63tx', 'twledo', formData)
                .then(function(response) {
                    alert('Mensagem enviada com sucesso!');
                    contactForm.reset(); // Limpa o formulário após o envio
                }, function(error) {
                    alert('Ocorreu um erro: ' + error.text);
                });
        });
    }
});