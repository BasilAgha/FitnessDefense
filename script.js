// Preloader
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.preloader').style.display = 'none';
            
            // Animate hero content after preloader
            const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero .cta-btn');
            heroElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 300 * index);
            });
        }, 500);
    }, 1500);
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        menuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
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

// Enhanced Activities Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.activities-slider .slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    
    // Add slide indicators
    const sliderNav = document.createElement('div');
    sliderNav.className = 'slider-indicators';
    document.querySelector('.activities-slider').appendChild(sliderNav);
    
    // Create indicators based on number of slides
    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'slide-indicator';
        if (i === 0) indicator.classList.add('active');
        
        // Add click event to each indicator
        indicator.addEventListener('click', function() {
            showSlide(i);
        });
        
        sliderNav.appendChild(indicator);
    }
    
    const indicators = document.querySelectorAll('.slide-indicator');
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentSlide + 1);
        }
    });
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slider = document.querySelector('.activities-slider');
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            showSlide(currentSlide + 1);
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            showSlide(currentSlide - 1);
        }
    }
    
    // Auto slide change
    let slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('touchstart', () => clearInterval(slideInterval));
    
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    });
    
    slider.addEventListener('touchend', () => {
        slideInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    });
});

// Intersection Observer for Animation on Scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (name && email && message) {
        // Form success message
        alert('Thank you for your message! We will contact you soon.');
        contactForm.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});