// Contact form functionality and validation

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea');
    const submitBtn = contactForm.querySelector('#submitBtn');
    
    // Initialize form
    setupFormValidation(inputs);
    setupFormSubmission(contactForm, submitBtn);
    setupCharacterCounter();
    setupFormAnimations();
}

function setupFormValidation(inputs) {
    inputs.forEach(input => {
        // Real-time validation on blur
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        // Clear errors on input
        input.addEventListener('input', function() {
            clearFieldError(this);
            updateCharacterCounter(this);
        });
        
        // Visual feedback on focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

function setupFormSubmission(form, submitBtn) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputs = form.querySelectorAll('input, textarea');
        let isValid = true;
        
        // Validate all fields
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            submitForm(form, submitBtn);
        } else {
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous errors
    clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(fieldName)} is required`;
        isValid = false;
    } else if (value) {
        // Email validation
        if (fieldType === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
        }

        // Name validation
        if (fieldName === 'name') {
            if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                errorMessage = 'Name can only contain letters and spaces';
                isValid = false;
            }
        }

        // Subject validation
        if (fieldName === 'subject') {
            if (value.length < 5) {
                errorMessage = 'Subject must be at least 5 characters';
                isValid = false;
            } else if (value.length > 100) {
                errorMessage = 'Subject must be less than 100 characters';
                isValid = false;
            }
        }

        // Message validation
        if (fieldName === 'message') {
            if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            } else if (value.length > 1000) {
                errorMessage = 'Message must be less than 1000 characters';
                isValid = false;
            }
        }
    }

    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.parentElement.classList.add('error');
    
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        // Create error element if it doesn't exist
        const errorDiv = document.createElement('span');
        errorDiv.className = 'form-error';
        errorDiv.id = field.name + '-error';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }
    
    // Add shake animation
    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.parentElement.classList.remove('error');
    
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Full Name',
        'email': 'Email Address',
        'subject': 'Subject',
        'message': 'Message'
    };
    return labels[fieldName] || fieldName;
}

function submitForm(form, submitBtn) {
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show progress bar
    showProgressBar();
    
    // Simulate form submission (replace with actual submission)
    setTimeout(() => {
        // Hide progress bar
        hideProgressBar();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        
        // Clear all errors
        const errorElements = form.querySelectorAll('.form-error');
        errorElements.forEach(error => error.style.display = 'none');
        
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
    }, 2000);
}

function showProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'form-progress';
    progressBar.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
    `;
    
    document.querySelector('.form-container').appendChild(progressBar);
    
    // Animate progress
    setTimeout(() => {
        const progressFill = progressBar.querySelector('.progress-fill');
        progressFill.style.width = '100%';
    }, 100);
}

function hideProgressBar() {
    const progressBar = document.querySelector('.form-progress');
    if (progressBar) {
        progressBar.remove();
    }
}

function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.className = 'form-success';
    successMsg.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for your message. I'll get back to you within 24 hours.</p>
        </div>
    `;
    
    document.querySelector('.form-container').appendChild(successMsg);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successMsg.remove();
    }, 5000);
}

function setupCharacterCounter() {
    const textarea = document.querySelector('textarea[name="message"]');
    if (textarea) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.innerHTML = `<span class="current">0</span>/<span class="max">1000</span>`;
        
        textarea.parentElement.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            updateCharacterCounter(this);
        });
    }
}

function updateCharacterCounter(field) {
    const counter = field.parentElement.querySelector('.character-counter');
    if (counter && field.name === 'message') {
        const current = field.value.length;
        const max = 1000;
        const currentSpan = counter.querySelector('.current');
        
        currentSpan.textContent = current;
        
        // Change color based on character count
        if (current > max * 0.9) {
            counter.classList.add('warning');
        } else if (current > max * 0.8) {
            counter.classList.add('caution');
        } else {
            counter.classList.remove('warning', 'caution');
        }
    }
}

function setupFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    // Stagger animation for form groups
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add CSS for form animations and styles
const formStyles = document.createElement('style');
formStyles.textContent = `
    .form-group.focused {
        transform: scale(1.02);
    }
    
    .form-group.error .form-input,
    .form-group.error .form-textarea {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .form-error {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }
    
    .character-counter {
        text-align: right;
        font-size: 0.875rem;
        color: var(--text-muted);
        margin-top: 0.25rem;
    }
    
    .character-counter.caution {
        color: #f59e0b;
    }
    
    .character-counter.warning {
        color: #ef4444;
    }
    
    .form-progress {
        margin: 1rem 0;
    }
    
    .progress-bar {
        width: 100%;
        height: 4px;
        background: var(--bg-tertiary);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--accent-primary);
        width: 0%;
        transition: width 2s ease;
    }
    
    .form-success {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: successPop 0.5s ease;
    }
    
    .success-content {
        text-align: center;
    }
    
    .success-content i {
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 1rem;
    }
    
    .success-content h3 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
    }
    
    .success-content p {
        color: var(--text-secondary);
    }
    
    .btn.loading {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes successPop {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    .form-group {
        transition: all 0.3s ease;
    }
    
    .form-input:focus,
    .form-textarea:focus {
        transform: scale(1.01);
    }
`;

document.head.appendChild(formStyles);
