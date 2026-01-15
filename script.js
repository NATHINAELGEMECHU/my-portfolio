document.addEventListener('DOMContentLoaded', () => {

    // 1. GSAP Logo Animation (Entrance)
    const tl = gsap.timeline();

    tl.from(".logo-main tspan", {
        duration: 0.8,
        y: -50,
        opacity: 0,
        stagger: 0.1,
        ease: "bounce.out"
    });

    tl.from(".logo-sub", {
        duration: 1,
        opacity: 0,
        y: 20,
        ease: "power2.out"
    }, "-=0.5");

    // 2. Mouse Tracking Glow Effect
    const glow = document.querySelector('.cursor-glow');
    window.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    });

    // 3. Mobile Menu Toggle Logic
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
            if(icon.classList.contains('bx-x')) {
                icon.classList.replace('bx-x', 'bx-menu-alt-right');
            }
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px" 
    };

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
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
        revealOnScroll.observe(el);
    });

    const revealStyles = document.createElement('style');
    revealStyles.innerHTML = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(revealStyles);
});
