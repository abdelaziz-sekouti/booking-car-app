// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
        
        // Initialize default admin if not exists
        this.initializeDefaultAdmin();
    }

    initializeDefaultAdmin() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const adminExists = users.some(user => user.role === 'admin');
        
        if (!adminExists) {
            const defaultAdmin = {
                id: 'admin-1',
                name: 'Admin User',
                email: 'admin@carrent.com',
                password: 'admin123',
                role: 'admin',
                createdAt: new Date().toISOString()
            };
            
            users.push(defaultAdmin);
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    showLoginModal() {
        const modalHTML = `
            <div class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <h3 class="text-2xl font-bold mb-6">Login</h3>
                    
                    <form id="login-form">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="login-email">
                                Email
                            </label>
                            <input type="email" id="login-email" class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                        </div>
                        
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="login-password">
                                Password
                            </label>
                            <input type="password" id="login-password" class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                        </div>
                        
                        <div class="mb-6">
                            <button type="button" onclick="auth.forgotPassword()" class="text-blue-600 hover:text-blue-700 text-sm">
                                Forgot Password?
                            </button>
                        </div>
                        
                        <div class="flex space-x-4">
                            <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Login
                            </button>
                            <button type="button" onclick="auth.closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                                Cancel
                            </button>
                        </div>
                        
                        <div class="mt-6 text-center">
                            <p class="text-gray-600">
                                Don't have an account? 
                                <button type="button" onclick="auth.showSignupModal()" class="text-blue-600 hover:text-blue-700 font-semibold">
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;
        
        // Setup form submission
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.login();
        });
    }

    showSignupModal() {
        const modalHTML = `
            <div class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <h3 class="text-2xl font-bold mb-6">Sign Up</h3>
                    
                    <form id="signup-form">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="signup-name">
                                Full Name
                            </label>
                            <input type="text" id="signup-name" class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                        </div>
                        
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="signup-email">
                                Email
                            </label>
                            <input type="email" id="signup-email" class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                        </div>
                        
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="signup-password">
                                Password
                            </label>
                            <input type="password" id="signup-password" class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                        </div>
                        
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="signup-confirm-password">
                                Confirm Password
                            </label>
                            <input type="password" id="signup-confirm-password" class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                        </div>
                        
                        <div class="mb-6">
                            <label class="flex items-center">
                                <input type="checkbox" id="signup-terms" class="mr-2" required>
                                <span class="text-sm text-gray-600">I agree to the Terms and Conditions</span>
                            </label>
                        </div>
                        
                        <div class="flex space-x-4">
                            <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Sign Up
                            </button>
                            <button type="button" onclick="auth.closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                                Cancel
                            </button>
                        </div>
                        
                        <div class="mt-6 text-center">
                            <p class="text-gray-600">
                                Already have an account? 
                                <button type="button" onclick="auth.showLoginModal()" class="text-blue-600 hover:text-blue-700 font-semibold">
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;
        
        // Setup form submission
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.signup();
        });
    }

    login() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Set current user
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Show success message
            app.showNotification('Login successful!', 'success');
            this.closeModal();
            
            // Update UI
            app.updateAuthUI();
            
            // Redirect to profile if on home page
            if (app.currentPage === 'home') {
                setTimeout(() => {
                    app.loadPage('profile');
                }, 1000);
            }
        } else {
            // Show error message
            app.showNotification('Invalid email or password', 'error');
        }
    }

    signup() {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const termsAccepted = document.getElementById('signup-terms').checked;

        // Validation
        if (password !== confirmPassword) {
            app.showNotification('Passwords do not match', 'error');
            return;
        }

        if (!termsAccepted) {
            app.showNotification('Please accept the terms and conditions', 'error');
            return;
        }

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
            app.showNotification('Email already exists', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: 'user-' + Date.now(),
            name,
            email,
            password,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Auto login
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        // Show success message
        app.showNotification('Account created successfully!', 'success');
        this.closeModal();

        // Update UI
        app.updateAuthUI();

        // Redirect to profile
        setTimeout(() => {
            app.loadPage('profile');
        }, 1000);
    }

    logout() {
        // Clear current user
        this.currentUser = null;
        localStorage.removeItem('currentUser');

        // Show success message
        app.showNotification('Logged out successfully', 'success');

        // Update UI
        app.updateAuthUI();

        // Redirect to home
        app.loadPage('home');
    }

    forgotPassword() {
        const email = prompt('Enter your email address:');
        
        if (email) {
            // In a real app, this would send a password reset email
            // For demo purposes, we'll show a success message
            app.showNotification('Password reset link sent to your email', 'success');
            this.closeModal();
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    closeModal() {
        document.getElementById('modal-container').innerHTML = '';
    }
}

// Initialize auth system
const auth = new AuthSystem();