// Skills page specific animations

document.addEventListener('DOMContentLoaded', function() {
    initSkillsAnimations();
});

function initSkillsAnimations() {
    // Animate skill progress bars
    animateSkillBars();
    
    // Animate certification cards
    animateCertifications();
    
    // Animate timeline items
    animateTimeline();
    
    // Add hover effects to skill categories
    addSkillHoverEffects();
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width') || 0;
                const skillItem = skillBar.closest('.skill-item');
                const percentageSpan = skillItem?.querySelector('.skill-percentage');
                
                // Reset width
                skillBar.style.width = '0%';
                
                // Animate progress
                setTimeout(() => {
                    skillBar.style.transition = 'width 1.5s ease-out';
                    skillBar.style.width = width + '%';
                    
                    // Animate percentage counter
                    if (percentageSpan) {
                        animatePercentage(percentageSpan, parseInt(width));
                    }
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

function animatePercentage(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 25);
}

function animateCertifications() {
    const certCards = document.querySelectorAll('.certification-card');
    
    if (certCards.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                
                // Add staggered animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 100);
                
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.1 });

    // Set initial states
    certCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(card);
    });
}

function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                
                // Animate timeline marker
                const marker = item.querySelector('.timeline-marker');
                if (marker) {
                    setTimeout(() => {
                        marker.style.transform = 'translateX(-50%) scale(1)';
                        marker.style.background = 'var(--accent-primary)';
                    }, 200);
                }
                
                // Animate content
                const content = item.querySelector('.timeline-content');
                if (content) {
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 400);
                }
                
                observer.unobserve(item);
            }
        });
    }, { threshold: 0.3 });

    // Set initial states
    timelineItems.forEach((item, index) => {
        const marker = item.querySelector('.timeline-marker');
        const content = item.querySelector('.timeline-content');
        
        // Set marker initial state
        if (marker) {
            marker.style.transform = 'translateX(-50%) scale(0)';
            marker.style.background = 'var(--border-color)';
            marker.style.transition = 'all 0.5s ease';
        }
        
        // Set content initial state
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            content.style.transition = 'all 0.6s ease';
            content.style.transitionDelay = `${index * 0.2}s`;
        }
        
        observer.observe(item);
    });
}

function addSkillHoverEffects() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const categoryColor = category.querySelector('.category-color');
        const color = categoryColor?.style.backgroundColor || 'var(--accent-primary)';
        
        category.addEventListener('mouseenter', function() {
            // Animate skill tags
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px) scale(1.05)';
                    tag.style.background = color;
                    tag.style.color = 'white';
                }, index * 50);
            });
            
            // Animate progress bars
            const progressBars = this.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.transform = 'scaleY(1.2)';
            });
        });
        
        category.addEventListener('mouseleave', function() {
            // Reset skill tags
            const skillTags = this.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
                tag.style.background = 'var(--bg-tertiary)';
                tag.style.color = 'var(--text-secondary)';
            });
            
            // Reset progress bars
            const progressBars = this.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.transform = 'scaleY(1)';
            });
        });
    });
}

// Add interactive skill level indicator
function initSkillLevelIndicator() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progressBar = item.querySelector('.skill-progress');
        const percentage = item.querySelector('.skill-percentage');
        
        item.addEventListener('mouseenter', function() {
            const level = getSkillLevel(parseInt(percentage?.textContent || '0'));
            showSkillTooltip(this, level);
        });
        
        item.addEventListener('mouseleave', function() {
            hideSkillTooltip();
        });
    });
}

function getSkillLevel(percentage) {
    if (percentage >= 90) return 'Expert';
    if (percentage >= 75) return 'Advanced';
    if (percentage >= 60) return 'Intermediate';
    if (percentage >= 40) return 'Beginner';
    return 'Learning';
}

function showSkillTooltip(element, level) {
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.textContent = level;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.position = 'fixed';
    tooltip.style.top = (rect.top - 40) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2) + 'px';
    tooltip.style.transform = 'translateX(-50%)';
    
    document.body.appendChild(tooltip);
    
    // Add animation
    setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(-50%) translateY(-5px)';
    }, 10);
}

function hideSkillTooltip() {
    const tooltip = document.querySelector('.skill-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Initialize skill level indicator
initSkillLevelIndicator();

// Add CSS for skills animations
const skillsStyles = document.createElement('style');
skillsStyles.textContent = `
    .skill-tooltip {
        background: var(--text-primary);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        opacity: 0;
        transform: translateX(-50%) translateY(0);
        transition: all 0.3s ease;
        z-index: 1000;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .skill-tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: var(--text-primary);
    }
    
    .skill-tag {
        transition: all 0.3s ease;
    }
    
    .skill-progress {
        transition: transform 0.3s ease;
    }
    
    .certification-card {
        transition: all 0.6s ease;
    }
    
    .timeline-marker {
        transition: all 0.5s ease;
    }
    
    .timeline-content {
        transition: all 0.6s ease;
    }
    
    /* Skill category hover effects */
    .skill-category:hover .skill-icon {
        transform: scale(1.1) rotate(5deg);
    }
    
    .skill-category:hover .category-title {
        color: var(--accent-primary);
    }
    
    .skill-category .skill-icon {
        transition: all 0.3s ease;
    }
    
    .skill-category .category-title {
        transition: color 0.3s ease;
    }
    
    /* Progress bar pulse animation */
    .skill-progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
        transform: translateX(-100%);
        animation: progressShine 2s infinite;
    }
    
    @keyframes progressShine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;

document.head.appendChild(skillsStyles);
