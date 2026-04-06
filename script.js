document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL REVEAL ANIMATION
    const animatedElements = document.querySelectorAll('.animate-up, section .container, .card-item, .phase-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Adicionando a classe 'visible' para elementos que não a tem mas deveriam animar
                if (entry.target.tagName === 'SECTION' || entry.target.classList.contains('container')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        // Inicialmente invisível se não tiver a classe animate-up (para sections)
        if (!el.classList.contains('animate-up')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 1s ease-out';
        }
        scrollObserver.observe(el);
    });

    // MARCAR HERO COMO VISUALIZADO IMEDIATAMENTE
    setTimeout(() => {
        document.querySelectorAll('.hero .animate-up').forEach(el => el.classList.add('visible'));
    }, 100);


    // 2. STICKY CTA LOGIC
    const stickyCta = document.querySelector('.sticky-cta');
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 100) {
            stickyCta.classList.add('visible');
        } else {
            stickyCta.classList.remove('visible');
        }
    });


    // 3. SMOOTH SCROLL FOR ANCHORS
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

});
