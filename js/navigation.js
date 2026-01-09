// Navigation functionality for multi-page application
class NavigationManager {
    constructor() {
        this.setupMobileMenu();
        this.updateActiveNavigation();
    }

    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                mobileMenu.classList.toggle('show');
            });
        }
    }

    updateActiveNavigation() {
        // Get current page
        const currentPage = this.getCurrentPage();
        
        // Update desktop navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('text-blue-600', 'font-semibold');
            link.classList.add('text-gray-700');
            
            const href = link.getAttribute('href');
            if (this.isPageActive(href, currentPage)) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-blue-600', 'font-semibold');
            }
        });

        // Update mobile navigation
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('text-blue-600', 'font-semibold');
            link.classList.add('text-gray-700');
            
            const href = link.getAttribute('href');
            if (this.isPageActive(href, currentPage)) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-blue-600', 'font-semibold');
            }
        });

        // Update auth UI
        if (typeof app !== 'undefined' && app.updateAuthUI) {
            app.updateAuthUI();
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        return filename.replace('.html', '');
    }

    isPageActive(href, currentPage) {
        const linkPage = href.replace('.html', '').replace('#', '');
        
        if (linkPage === currentPage) {
            return true;
        }
        
        // Special cases
        if (currentPage === '' && linkPage === 'index') {
            return true;
        }
        
        if (currentPage === 'index' && linkPage === '') {
            return true;
        }
        
        return false;
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
    }

    // Smooth scroll to anchor
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Setup form validation
    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.validateForm(form);
            });
        });
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showInputError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearInputError(input);
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    this.showInputError(input, 'Please enter a valid email address');
                    isValid = false;
                }
            }
            
            // Phone validation (optional)
            if (input.type === 'tel' && input.value) {
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                if (!phoneRegex.test(input.value)) {
                    this.showInputError(input, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
        });
        
        if (isValid) {
            // Let the specific form handler take over
            form.dispatchEvent(new CustomEvent('validated', { bubbles: true }));
        }
    }

    showInputError(input, message) {
        input.classList.add('border-red-500', 'form-input', 'error');
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }

    clearInputError(input) {
        input.classList.remove('border-red-500', 'error');
        
        const existingError = input.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
    }
}

// Initialize navigation manager
const navigation = new NavigationManager();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    navigation.updateActiveNavigation();
    navigation.setupSmoothScroll();
    navigation.setupFormValidation();
});