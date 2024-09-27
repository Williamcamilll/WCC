// Rolagem suave com efeito de desaceleração e destaque dinâmico com animação de fundo
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Efeito de destaque temporário ao rolar para a seção
        targetSection.classList.add('highlight-section');
        setTimeout(() => {
            targetSection.classList.remove('highlight-section');
        }, 1000);

        // Animação de fundo com partículas (aplicada em seções)
        targetSection.classList.add('particle-animation');
        setTimeout(() => {
            targetSection.classList.remove('particle-animation');
        }, 2000);
    });
});

// Botão de voltar ao topo com animação, fade in/out aprimorado e efeito de partículas
const backToTopButton = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (!backToTopButton.classList.contains('visible')) {
            backToTopButton.classList.add('visible');
            backToTopButton.classList.remove('invisible');
        }
    } else {
        if (backToTopButton.classList.contains('visible')) {
            backToTopButton.classList.add('invisible');
            backToTopButton.classList.remove('visible');
        }
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Efeito de explosão de partículas ao clicar
    createParticleEffect(backToTopButton);
});

// Efeito de destaque nas seções com animação 3D complexa
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.addEventListener('mouseenter', () => {
        section.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(10deg) scale(1.05)';
        section.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
    });
    section.addEventListener('mouseleave', () => {
        section.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// Função para criar efeito de partículas
function createParticleEffect(element) {
    const particles = 30;
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        document.body.appendChild(particle);

        const x = element.getBoundingClientRect().left + (element.offsetWidth / 2);
        const y = element.getBoundingClientRect().top + (element.offsetHeight / 2);
        const destinationX = x + (Math.random() * 200 - 100);
        const destinationY = y + (Math.random() * 200 - 100);

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        particle.animate([
            { transform: `translate(${destinationX - x}px, ${destinationY - y}px) scale(1)` },
            { transform: `translate(${destinationX - x}px, ${destinationY - y}px) scale(0)` }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
            fill: 'forwards'
        });

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// Adiciona estilos e animações avançadas
const style = document.createElement('style');
style.innerHTML = `
    .visible {
        opacity: 1;
        transition: opacity 0.5s ease-in;
    }
    .invisible {
        opacity: 0;
        transition: opacity 0.5s ease-out;
    }
    .highlight-section {
        box-shadow: 0 0 20px rgba(29, 209, 161, 0.75), 0 0 40px rgba(29, 209, 161, 0.5);
        transition: box-shadow 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }
    .particle-animation {
        background: linear-gradient(130deg, rgba(29, 209, 161, 0.15) 25%, rgba(29, 209, 161, 0) 75%);
        background-size: 400% 400%;
        animation: animateBackground 3s ease infinite;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes animateBackground {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    .particle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: rgba(29, 209, 161, 0.8);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
    }
`;
document.head.appendChild(style);
