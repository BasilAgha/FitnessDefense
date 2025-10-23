// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';

            // Animate hero content after preloader
            document.querySelectorAll('.hero h1, .hero p, .hero .cta-btn').forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 300 * index);
            });
        }, 500);
    }, 1500);
});

// ==================== NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ==================== MOBILE MENU ====================
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.innerHTML = navLinks.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// ==================== SMOOTH SCROLLING ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.getAttribute('href'));
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// ==================== ACTIVITIES SLIDER ====================
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.activities-slider .slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    // Create slide indicators dynamically
    const sliderNav = document.createElement('div');
    sliderNav.className = 'slider-indicators';
    document.querySelector('.activities-slider').appendChild(sliderNav);

    slides.forEach((_, i) => {
        const indicator = document.createElement('span');
        indicator.className = 'slide-indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => showSlide(i));
        sliderNav.appendChild(indicator);
    });

    const indicators = document.querySelectorAll('.slide-indicator');

    function showSlide(n) {
        slides.forEach(s => s.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Navigation
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
    });

    // Swipe navigation for mobile
    let touchStartX = 0;
    const slider = document.querySelector('.activities-slider');
    slider.addEventListener('touchstart', e => (touchStartX = e.changedTouches[0].screenX), false);
    slider.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) showSlide(currentSlide + 1);
        if (touchEndX > touchStartX + 50) showSlide(currentSlide - 1);
    });

    // Auto-slide
    let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000));
});

// ==================== ANIMATION ON SCROLL ====================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => observer.observe(el));

// ==================== CONTACT FORM ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// ==================== FLIP CARD FUNCTIONALITY ====================
document.querySelectorAll('.flip-btn').forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.flip-card');
        card.classList.toggle('flipped');
    });
});
