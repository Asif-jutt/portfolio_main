// Main JavaScript functionality for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initSmoothScrolling();
    initAnimations();
    initFormValidation();
    updateFooterYear();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // Active navigation link highlighting
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (themeIcon) {
                themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }

            // Add a smooth transition effect
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .certification-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Skill progress bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                setTimeout(() => {
                    skillBar.style.width = width + '%';
                }, 200);
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Counter animation for hero stats
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounterSimple(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Simple counter animation that handles + and % symbols
function animateCounterSimple(element) {
    const text = element.textContent;
    
    // Extract number and suffix
    const match = text.match(/(\d+)(.*)/);
    if (!match) return;
    
    const target = parseInt(match[1]);
    const suffix = match[2];
    
    let current = 0;
    const increment = target / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// Animate counter numbers (legacy function)
function animateCounter(element) {
    const originalText = element.textContent;
    const target = parseInt(originalText.replace(/\D/g, '')) || 0;
    const suffix = originalText.replace(/\d/g, '');
    
    if (target === 0) {
        // If no number found, don't animate
        return;
    }
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('#submitBtn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;

                // Submit the form
                setTimeout(() => {
                    this.submit();
                }, 500);
            }
        });
    }
}

// Validate individual form field
function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    clearFieldError(field);

    // Required field validation
    if (!value) {
        errorMessage = `${getFieldLabel(fieldName)} is required`;
        isValid = false;
    } else {
        // Email validation
        if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }

        // Name validation
        if (fieldName === 'name' && value) {
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                errorMessage = 'Name can only contain letters and spaces';
                isValid = false;
            }
        }

        // Subject validation
        if (fieldName === 'subject' && value) {
            if (value.length < 5) {
                errorMessage = 'Subject must be at least 5 characters';
                isValid = false;
            }
        }

        // Message validation
        if (fieldName === 'message' && value) {
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            }
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

// Get field label for error messages
function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Full Name',
        'email': 'Email Address',
        'subject': 'Subject',
        'message': 'Message'
    };
    return labels[fieldName] || fieldName;
}

// Update footer year dynamically
function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function to throttle events
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

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause animations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Handle resize events
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
        document.body.classList.remove('nav-open');
    }
}, 250));

// Preload images for better performance
function preloadImages() {
    const images = [
        '/images/hero-avatar.jpg',
        '/images/about-image.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
preloadImages();

// Add loading state to page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading spinners
    const loaders = document.querySelectorAll('.loader');
    loaders.forEach(loader => loader.remove());
});

// Error handling for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You could send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    // You could send this to an error tracking service
});
