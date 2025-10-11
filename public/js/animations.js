// Animation utilities and effects

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallaxEffects();
    initHoverEffects();
    initLoadingAnimations();
});

// Scroll-based animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (animatedElements.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-aos');
                const delay = element.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    element.classList.add('aos-animate');
                    applyAnimation(element, animationType);
                }, parseInt(delay));
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Apply specific animations
function applyAnimation(element, animationType) {
    const animations = {
        'fade-up': {
            transform: 'translateY(0)',
            opacity: '1'
        },
        'fade-down': {
            transform: 'translateY(0)',
            opacity: '1'
        },
        'fade-left': {
            transform: 'translateX(0)',
            opacity: '1'
        },
        'fade-right': {
            transform: 'translateX(0)',
            opacity: '1'
        },
        'fade-in': {
            opacity: '1'
        },
        'zoom-in': {
            transform: 'scale(1)',
            opacity: '1'
        },
        'slide-up': {
            transform: 'translateY(0)',
            opacity: '1'
        }
    };

    const animation = animations[animationType];
    if (animation) {
        Object.assign(element.style, animation);
    }
}

// Set initial states for animations
function setInitialStates() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    animatedElements.forEach(el => {
        const animationType = el.getAttribute('data-aos');
        
        const initialStates = {
            'fade-up': {
                transform: 'translateY(30px)',
                opacity: '0',
                transition: 'all 0.6s ease'
            },
            'fade-down': {
                transform: 'translateY(-30px)',
                opacity: '0',
                transition: 'all 0.6s ease'
            },
            'fade-left': {
                transform: 'translateX(-30px)',
                opacity: '0',
                transition: 'all 0.6s ease'
            },
            'fade-right': {
                transform: 'translateX(30px)',
                opacity: '0',
                transition: 'all 0.6s ease'
            },
            'fade-in': {
                opacity: '0',
                transition: 'all 0.6s ease'
            },
            'zoom-in': {
                transform: 'scale(0.8)',
                opacity: '0',
                transition: 'all 0.6s ease'
            },
            'slide-up': {
                transform: 'translateY(50px)',
                opacity: '0',
                transition: 'all 0.8s ease'
            }
        };

        const initialState = initialStates[animationType];
        if (initialState) {
            Object.assign(el.style, initialState);
        }
    });
}

// Initialize initial states
setInitialStates();

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;

    const handleScroll = throttle(function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = rate * speed;
            
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16);

    window.addEventListener('scroll', handleScroll);
}

// Hover effects for interactive elements
function initHoverEffects() {
    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Skill category hover effects
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(1deg)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
}

// Loading animations
function initLoadingAnimations() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);

    // Add loading styles
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        .loading-overlay {
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
        }
        
        .loading-spinner {
            text-align: center;
        }
        
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--border-color);
            border-top: 4px solid var(--accent-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .loaded .loading-overlay {
            opacity: 0;
            pointer-events: none;
        }
    `;
    
    document.head.appendChild(loadingStyles);

    // Hide loading overlay when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            document.body.classList.add('loaded');
            setTimeout(() => {
                loadingOverlay.remove();
                loadingStyles.remove();
            }, 500);
        }, 1000);
    });
}

// Floating animation for hero elements
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.5;
        const duration = 3 + (index * 0.5);
        
        element.style.animation = `float ${duration}s ease-in-out infinite`;
        element.style.animationDelay = `${delay}s`;
    });
}

// Initialize floating animations
initFloatingAnimations();

// Text typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation for hero title
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title .name');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.style.borderRight = '2px solid var(--accent-primary)';
        
        // Start typing animation after a delay
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
}

// Initialize typing animation
initTypingAnimation();

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || 0;
                
                // Reset width and animate
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize progress bar animations
animateProgressBars();

// Counter animation with easing
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .counter');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const originalText = counter.textContent;
                const target = parseInt(originalText.replace(/\D/g, '')) || 0;
                const suffix = originalText.replace(/\d/g, '');
                
                if (target > 0) {
                    animateCounter(counter, target, suffix);
                }
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Animate counter with easing
function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - (current / target), 4);
            element.textContent = Math.floor(target * easeOutQuart) + suffix;
        }
    }, 16);
}

// Initialize counter animations - temporarily disabled
// animateCounters();

// Mouse cursor effects (optional)
function initCursorEffects() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorStyles = document.createElement('style');
    cursorStyles.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--accent-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0.7;
        }
        
        .custom-cursor.hover {
            transform: scale(2);
            background: var(--accent-secondary);
        }
    `;
    document.head.appendChild(cursorStyles);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Add hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Initialize cursor effects (optional)
// initCursorEffects();

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Utility function for random delays
function randomDelay(min = 0, max = 1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Stagger animation for lists
function staggerAnimation(elements, animationClass, delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(animationClass);
        }, index * delay);
    });
}

// Initialize stagger animations
function initStaggerAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    if (projectCards.length > 0) {
        staggerAnimation(projectCards, 'animate-fade-in-up', 150);
    }
    
    if (skillCategories.length > 0) {
        staggerAnimation(skillCategories, 'animate-fade-in-up', 200);
    }
}

// Initialize stagger animations
initStaggerAnimations();
