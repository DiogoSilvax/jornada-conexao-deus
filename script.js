document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL REVEAL ANIMATION - Robusto para evitar espaços vazios
    const animatedElements = document.querySelectorAll('.animate-up, .card-item, .phase-card');
    
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px 50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Pequeno delay para remover o js-hidden se ele estiver lá
                setTimeout(() => {
                    entry.target.classList.remove('js-hidden');
                }, 800);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Só esconde se o elemento estiver realmente FORA da primeira dobra (abaixo da tela)
        if (rect.top > window.innerHeight) {
            el.classList.add('js-hidden');
        } else {
            el.classList.add('visible'); // Já visível se estiver na dobra inicial
        }
        scrollObserver.observe(el);
    });


    // 2. SMOOTH SCROLL FOR ANCHORS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. IMAGE CAROUSEL AUTO-SLIDE
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        function updateCarousel() {
            currentIndex++;
            if (currentIndex >= slides.length) {
                currentIndex = 0; // Volta para o começo
            }
            // Move no eixo X baseado no index (100% da largura por slide)
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Passa a imagem a cada 3 segundos
        setInterval(updateCarousel, 3000);
    }


});
