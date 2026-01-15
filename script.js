document.addEventListener('DOMContentLoaded', () => {

    // 1. Mouse Tracking Glow Effect (Desktop Only)
    const glow = document.querySelector('.cursor-glow');
    if (window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                glow.style.left = `${e.clientX}px`;
                glow.style.top = `${e.clientY}px`;
            });
        });
    }

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');

    menuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('bx-menu-alt-right');
        icon.classList.toggle('bx-x');
    });

    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.add('bx-menu-alt-right');
            icon.classList.remove('bx-x');
        });
    });

    // 3. Scroll Reveal Animations
    const observerOptions = { threshold: 0.1 };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.section, .skill-card, .project-card');
    
    animateElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        revealOnScroll.observe(el);
    });

    const revealStyles = document.createElement('style');
    revealStyles.innerHTML = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(revealStyles);
});
