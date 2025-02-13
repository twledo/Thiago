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
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Inicializa o EmailJS
    (function () {
        emailjs.init('M_0BhcWdn6oIYVXxh'); // Substitua pelo seu User ID
    })();

    // Adiciona o evento de envio do formulário
    document.querySelector('.contact-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Coleta os dados do formulário
        const formData = {
            from_name: this.from_name.value, // Nome do campo "from_name" no formulário
            reply_to: this.reply_to.value,   // Nome do campo "reply_to" no formulário
            message: this.message.value      // Nome do campo "message" no formulário
        };

        // Envia o e-mail usando EmailJS
        emailjs.send("twledo_email", "template_6l5m0q6", formData)
            .then(function (response) {
                alert('Mensagem enviada com sucesso!');
                document.querySelector('.contact-form').reset(); // Limpa o formulário
            }, function (error) {
                alert('Erro ao enviar a mensagem. Tente novamente.');
                console.error('Erro:', error); // Exibe o erro no console para depuração
            });
    });
});