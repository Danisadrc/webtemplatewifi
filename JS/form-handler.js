// Form handling functionality
class FormHandler {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.setupFormValidation();
            this.setupFormSubmission();
        }
    }

    setupFormValidation() {
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearError(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'text':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Text harus minimal 2 karakter';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Format email tidak valid';
                }
                break;
                
            case 'tel':
                const phoneRegex = /^\+?[\d\s-()]+$/;
                if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                    isValid = false;
                    errorMessage = 'Format nomor telepon tidak valid';
                }
                break;
                
            default:
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Pesan harus minimal 10 karakter';
                }
        }

        if (!isValid) {
            this.showError(field, errorMessage);
        } else {
            this.clearError(field);
        }

        return isValid;
    }

    showError(field, message) {
        this.clearError(field);
        field.style.borderColor = '#e74c3c';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }

    clearError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    setupFormSubmission() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    validateForm() {
        const fields = this.contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async submitForm() {
        const formData = new FormData(this.contactForm);
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        try {
            // Show loading state
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;

            // Simulate API call - replace with actual endpoint
            await this.simulateAPICall(formData);

            // Show success message
            this.showSuccessMessage();
            this.contactForm.reset();

        } catch (error) {
            this.showErrorMessage();
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    simulateAPICall(formData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.1 ? resolve() : reject();
            }, 1500);
        });
    }

    showSuccessMessage() {
        this.showMessage('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
    }

    showErrorMessage() {
        this.showMessage('Terjadi kesalahan. Silakan coba lagi.', 'error');
    }

    showMessage(text, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.style.padding = '15px';
        messageDiv.style.margin = '20px 0';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontWeight = 'bold';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else {
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }
        
        messageDiv.textContent = text;

        // Insert before form
        this.contactForm.parentNode.insertBefore(messageDiv, this.contactForm);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Initialize form handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});