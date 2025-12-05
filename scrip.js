// Enhanced JavaScript with Blue Theme Animations
let skillsAnimated = false;
let mouseX = 0;
let mouseY = 0;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    initThemeToggle();
    initLazyLoading();
    initScrollReveal();
    initScreenshotProtection();
    initRealTimeValidation();
    initParticleSystem();
    initMagneticButtons();
    init3DEffects();
    initParallaxEffects();
    initOrbitalAnimations();

    // Initialize jQuery dependent features
    $(document).ready(function () {
        initJQueryFeatures();
    });

    updateCopyrightYear();
}

// Particle System with Blue Theme
function initParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(59, 130, 246, ${Math.random() * 0.3})`
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX + (mouseX - canvas.width / 2) * 0.0001;
            particle.y += particle.speedY + (mouseY - canvas.height / 2) * 0.0001;

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            // Draw connections
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    // Mouse move listener for interactive particles
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            btn.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) translateZ(10px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) translateZ(0)';
        });
    });
}

// 3D Effects
function init3DEffects() {
    // Add 3D tilt effect to cards
    const cards = document.querySelectorAll('.project-3d-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Orbital Animations
function initOrbitalAnimations() {
    const orbits = document.querySelectorAll('.orbit');
    const orbs = document.querySelectorAll('.floating-orb');

    orbits.forEach((orbit, index) => {
        orbit.style.animationDuration = `${20 + index * 5}s`;
        orbit.style.animationDelay = `${index * 2}s`;
    });

    orbs.forEach((orb, index) => {
        orb.style.animationDuration = `${4 + index}s`;
        orb.style.animationDelay = `${index * 0.5}s`;
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-shapes .shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    const themeIcon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', function () {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        if (themeIcon) {
            themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        localStorage.setItem('theme', newTheme);

        // Add transition effect
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 300);
    });
}


// Lazy Loading Images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.add('lazy-loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.classList.add('lazy-loaded');
        });
    }
}

// Scroll Reveal Animations
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Add staggered animation for skill items
                    if (entry.target.classList.contains('skill-item')) {
                        const index = Array.from(reveals).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${(index % 4) * 0.1}s`;
                        
                        // Check if all skill items are visible, then trigger animation
                        const allSkillItems = document.querySelectorAll('.skill-item');
                        const visibleSkillItems = Array.from(allSkillItems).filter(item => 
                            item.classList.contains('active')
                        );
                        if (visibleSkillItems.length === allSkillItems.length && !skillsAnimated) {
                            setTimeout(() => animateSkillBars(), 300);
                        }
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(reveal => revealObserver.observe(reveal));
    } else {
        // Fallback: show all elements
        reveals.forEach(reveal => reveal.classList.add('active'));
        // Trigger skill animation after a short delay
        setTimeout(() => animateSkillBars(), 500);
    }
}

// Real-time Form Validation
function initRealTimeValidation() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');

    inputs.forEach(input => {
        input.addEventListener('input', function () {
            validateField(this);
        });

        input.addEventListener('blur', function () {
            validateField(this, true);
        });

        input.addEventListener('focus', function () {
            this.classList.remove('invalid', 'valid');
        });
    });
}

function validateField(field, showError = false) {
    const errorElement = field.parentElement.querySelector('.form-error');

    // Reset states
    field.classList.remove('invalid', 'valid');
    errorElement.textContent = '';

    // Validate required fields
    if (!field.value.trim()) {
        if (showError) {
            errorElement.textContent = 'This field is required';
            field.classList.add('invalid');
        }
        return false;
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            if (showError) {
                errorElement.textContent = 'Please enter a valid email address';
                field.classList.add('invalid');
            }
            return false;
        }
    }

    // Valid field
    field.classList.add('valid');
    return true;
}

// Scroll Progress Indicator
function updateScrollProgress() {
    const progressBar = document.querySelector('.scroll-bar');
    if (!progressBar) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + '%';
}

// Form Validation
function validateForm(form) {
    let isValid = true;
    const formGroups = form.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const error = group.querySelector('.form-error');
        if (!input || !error) return;

        // Reset errors
        error.textContent = '';
        input.style.borderColor = '';

        // Validate required fields
        if (!input.value.trim()) {
            error.textContent = 'This field is required';
            input.style.borderColor = '#ef4444';
            isValid = false;
        }

        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                error.textContent = 'Please enter a valid email address';
                input.style.borderColor = '#ef4444';
                isValid = false;
            }
        }
    });

    return isValid;
}

// Update Copyright Year
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Screenshot Protection
function initScreenshotProtection() {
    const blurOverlay = document.getElementById('blurOverlay');
    if (!blurOverlay) return;

    // Detect Print Screen key
    window.addEventListener("keyup", function (event) {
        if (event.key === "PrintScreen" || event.keyCode === 44) {
            blurOverlay.style.display = "block";
            setTimeout(function () {
                blurOverlay.style.display = "none";
            }, 3000);
        }
    });

    // Detect right-click attempts
    document.addEventListener('contextmenu', function (e) {
        blurOverlay.style.display = "block";
        setTimeout(function () {
            blurOverlay.style.display = "none";
        }, 2000);
    });
}

// Typing animation for About section (global function)
function initTypingAnimation2() {
    const typingElement = document.querySelector(".typing-2");
    if (!typingElement) {
        console.warn('Typing-2 element not found');
        return false;
    }
    
    // Force visibility with inline styles
    typingElement.style.setProperty('display', 'inline-block', 'important');
    typingElement.style.setProperty('visibility', 'visible', 'important');
    typingElement.style.setProperty('opacity', '1', 'important');
    typingElement.style.setProperty('color', 'var(--blue-400)', 'important');
    
    // Ensure it has content
    if (!typingElement.textContent || typingElement.textContent.trim() === '') {
        typingElement.textContent = 'IT Student';
    }
    
    if (typingElement.classList.contains('typed')) {
        return true; // Already initialized
    }
    
    // Check if Typed is available
    if (typeof Typed === 'undefined') {
        console.warn('Typed.js not loaded for typing-2, using fallback');
        return false;
    }
    
    try {
        // Clear existing content before initializing Typed
        typingElement.textContent = '';
        
        const typedInstance = new Typed(".typing-2", {
            strings: ["Footballer", "IT Student", "Web Developer", "Learner"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            cursorChar: "|",
            shuffle: false,
            showCursor: true,
            startDelay: 500
        });
        typingElement.classList.add('typed');
        console.log('Typed.js initialized successfully for typing-2');
        return true;
    } catch (e) {
        console.error('Typed.js initialization error for typing-2:', e);
        // Fallback: show static text
        typingElement.textContent = 'IT Student';
        return false;
    }
}

// jQuery Dependent Features
function initJQueryFeatures() {
    // Sticky navbar on scroll
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // Scroll-up button show/hide
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }

        // Update scroll progress
        updateScrollProgress();
    });

    // Slide-up script
    $('.scroll-up-btn').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        $('html').css("scrollBehavior", "auto");
    });

    // Smooth scroll for navbar links
    $('.navbar .menu li a').click(function () {
        $('html').css("scrollBehavior", "smooth");
    });

    // Toggle menu/navbar
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Typing text animation - wait for element to be visible
    function initTypingAnimation() {
        const typingElement = document.querySelector(".typing");
        if (!typingElement) {
            console.warn('Typing element not found');
            return false;
        }
        
        // Force visibility with inline styles
        typingElement.style.setProperty('display', 'inline-block', 'important');
        typingElement.style.setProperty('visibility', 'visible', 'important');
        typingElement.style.setProperty('opacity', '1', 'important');
        typingElement.style.setProperty('color', 'var(--blue-400)', 'important');
        
        // Ensure it has content
        if (!typingElement.textContent || typingElement.textContent.trim() === '') {
            typingElement.textContent = 'IT Student';
        }
        
        if (typingElement.classList.contains('typed')) {
            return true; // Already initialized
        }
        
        // Check if Typed is available
        if (typeof Typed === 'undefined') {
            console.warn('Typed.js not loaded, using fallback');
            return false;
        }
        
        try {
            // Clear existing content before initializing Typed
            typingElement.textContent = '';
            
            const typedInstance = new Typed(".typing", {
                strings: ["Footballer", "IT Student", "Web Developer", "Learner"],
                typeSpeed: 100,
                backSpeed: 60,
                loop: true,
                cursorChar: "|",
                shuffle: false,
                showCursor: true,
                startDelay: 500
            });
            typingElement.classList.add('typed');
            console.log('Typed.js initialized successfully');
            return true;
        } catch (e) {
            console.error('Typed.js initialization error:', e);
            // Fallback: show static text
            typingElement.textContent = 'IT Student';
            return false;
        }
    }
    
    // Initialize immediately if jQuery is ready, otherwise wait
    if (typeof $ !== 'undefined') {
        $(document).ready(function() {
            // Wait for text-3 animation to complete, then initialize
            setTimeout(function() {
                if (!initTypingAnimation()) {
                    // Retry if first attempt failed
                    setTimeout(initTypingAnimation, 1000);
                }
            }, 1500);
        });
    } else {
        // Wait for DOM and libraries to load
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                if (!initTypingAnimation()) {
                    setTimeout(initTypingAnimation, 1000);
                }
            }, 1500);
        });
    }

    // Initialize typing-2 animation
    if (typeof $ !== 'undefined') {
        $(document).ready(function() {
            setTimeout(function() {
                if (!initTypingAnimation2()) {
                    setTimeout(initTypingAnimation2, 1000);
                }
            }, 1500);
        });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                if (!initTypingAnimation2()) {
                    setTimeout(initTypingAnimation2, 1000);
                }
            }, 1500);
        });
    }

    // Close mobile menu when clicking on links
    $('.nav-menu a').click(function () {
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass('active');
    });

    // Initialize skill animations
    initSkillWaypoint();
}

// Animated Skill Bars
function animateSkillBars() {
    if (skillsAnimated) return;
    skillsAnimated = true;

    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length === 0) {
        skillsAnimated = false;
        return;
    }

    skillItems.forEach((item, index) => {
        const percentElement = item.querySelector('.skill-percent');
        const progressBar = item.querySelector('.skill-progress');
        if (!percentElement || !progressBar) {
            console.warn('Skill element missing percent or progress bar', item);
            return;
        }

        const targetPercent = parseInt(percentElement.getAttribute('data-target') || progressBar.getAttribute('data-width') || 0, 10);
        
        if (targetPercent <= 0) {
            console.warn('Invalid target percent:', targetPercent);
            return;
        }

        let current = 0;
        const duration = 2000; // 2 seconds
        const steps = 100;
        const increment = targetPercent / steps;
        const stepDuration = duration / steps;

        // Add delay for staggered animation
        setTimeout(() => {
            const timer = setInterval(() => {
                current += increment;
                if (current >= targetPercent) {
                    current = targetPercent;
                    clearInterval(timer);
                }
                percentElement.textContent = Math.round(current) + '%';
                progressBar.style.width = current + '%';
            }, stepDuration);
        }, index * 150);
    });
}

// Initialize Skill Waypoint
function initSkillWaypoint() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    // Function to check and animate skills
    function checkAndAnimateSkills() {
        const rect = skillsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if skills section is in viewport
        if (rect.top < windowHeight * 0.8 && rect.bottom > 0 && !skillsAnimated) {
            animateSkillBars();
        }
    }

    // Reset animation flag when section is not visible
    const resetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                skillsAnimated = false;
            }
        });
    }, { threshold: 0 });

    resetObserver.observe(skillsSection);

    // Use Intersection Observer as primary method
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    observer.observe(skillsSection);

    // Backup: Also check on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkAndAnimateSkills, 100);
    });

    // Check immediately if already in view
    setTimeout(checkAndAnimateSkills, 500);

    // Also try Waypoint if available
    if (typeof Waypoint !== 'undefined') {
        try {
            new Waypoint({
                element: skillsSection,
                handler: function () {
                    if (!skillsAnimated) {
                        animateSkillBars();
                    }
                    this.destroy();
                },
                offset: '75%'
            });
        } catch (e) {
            console.log('Waypoint not available, using Intersection Observer');
        }
    }
}

// Email Sending Function
function sendMail(event) {
    if (event) {
        event.preventDefault();
    }

    const form = event ? event.target : document.querySelector('.contact-form');
    if (!form || !validateForm(form)) {
        return false;
    }

    const btn = form.querySelector('.send-btn');
    if (btn) {
        btn.classList.add('sending');
    }

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        subject: document.getElementById("subject").value
    };

    emailjs.send("service_g8g3oec", "template_5a225ro", formData)
        .then(function (response) {
            if (btn) {
                btn.classList.remove('sending');
            }

            // Success animation
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
            successMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--success-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: var(--card-shadow-3d);
                z-index: 10000;
                animation: slideInRight 0.5s ease;
            `;
            document.body.appendChild(successMsg);

            setTimeout(() => {
                successMsg.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => successMsg.remove(), 500);
            }, 3000);

            form.reset();

            // Reset form styles
            form.querySelectorAll('input, textarea').forEach(input => {
                input.style.borderColor = '';
                input.classList.remove('valid', 'invalid');
            });
            form.querySelectorAll('.form-error').forEach(error => {
                error.textContent = '';
            });
        }, function (error) {
            if (btn) {
                btn.classList.remove('sending');
            }

            // Error animation
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again later or contact me directly at shr.samir7@gmail.com';
            errorMsg.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--error-color);
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                box-shadow: var(--card-shadow-3d);
                z-index: 10000;
                animation: slideInRight 0.5s ease;
            `;
            document.body.appendChild(errorMsg);

            setTimeout(() => {
                errorMsg.style.animation = 'slideOutRight 0.5s ease';
                setTimeout(() => errorMsg.remove(), 500);
            }, 5000);

            console.error("EmailJS Error:", error);
        });

    return false;
}

// Add CSS animations for messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Update scroll progress on scroll
window.addEventListener('scroll', updateScrollProgress);

// Handle page load animations
window.addEventListener('load', function () {
    document.body.style.opacity = '1';

    // Ensure typing animations initialize after page load (backup)
    setTimeout(() => {
        const typingElement = document.querySelector(".typing");
        if (typingElement && !typingElement.classList.contains('typed')) {
            initTypingAnimation();
        }
        
        // Also initialize typing-2 for About section
        const typingElement2 = document.querySelector(".typing-2");
        if (typingElement2 && !typingElement2.classList.contains('typed')) {
            if (typeof initTypingAnimation2 === 'function') {
                initTypingAnimation2();
            }
        }
    }, 2500);

    // Add loading animation
    const loadingScreen = document.createElement('div');
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    loadingScreen.innerHTML = `
        <div class="loading-content" style="text-align: center;">
            <div class="spinner" style="
                width: 50px;
                height: 50px;
                border: 3px solid var(--border-color);
                border-top: 3px solid var(--blue-600);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            "></div>
            <p style="color: var(--text-secondary);">Loading...</p>
        </div>
    `;
    document.body.appendChild(loadingScreen);

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.remove(), 500);
    }, 1000);
});