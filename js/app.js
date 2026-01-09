// Main Application JavaScript
class CarRentApp {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.loadPage('home');
        this.updateAuthUI();
    }

    setupNavigation() {
        // Handle navigation clicks
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                // e.preventDefault();
                const page = link.getAttribute('href').substring(1);
                this.loadPage(page);
                this.closeMobileMenu();
            });
        });

        // Handle hash changes
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                this.loadPage(hash);
            }
        });
    }

    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
    }

    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('show');
    }

    async loadPage(page) {
        const mainContent = document.getElementById('main-content');

        try {
            let content = '';

            switch (page) {
                case 'home':
                    content = await this.getHomePage();
                    break;
                case 'about':
                    content = await this.getAboutPage();
                    break;
                case 'services':
                    content = await this.getServicesPage();
                    break;
                case 'blog':
                    content = await this.getBlogPage();
                    break;
                case 'contact':
                    content = await this.getContactPage();
                    break;
                case 'admin':
                    content = await this.getAdminPage();
                    break;
                case 'profile':
                    content = await this.getProfilePage();
                    break;
                default:
                    content = await this.getHomePage();
            }

            mainContent.innerHTML = content;
            this.currentPage = page;

            // Initialize page-specific functionality
            this.initializePage(page);

        } catch (error) {
            console.error('Error loading page:', error);
            mainContent.innerHTML = '<div class="text-center py-20"><h2 class="text-2xl font-bold text-red-600">Page not found</h2></div>';
        }
    }

    async getHomePage() {
        return `
            <!-- Hero Section -->
            <section class="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div class="text-center">
                        <h1 class="text-4xl md:text-6xl font-bold mb-6">Premium Car Rental Service</h1>
                        <p class="text-xl md:text-2xl mb-8 text-blue-100">Experience comfort, reliability, and excellence</p>
                        <button onclick="app.showBookingModal()" class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                            Book a Car Now
                        </button>
                    </div>
                </div>
                <div class="absolute inset-0 bg-black opacity-20"></div>
            </section>

            <!-- Featured Cars Section -->
            <section class="py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-12">Featured Cars</h2>
                    <div id="cars-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <!-- Cars will be loaded here -->
                    </div>
                </div>
            </section>

            <!-- Why Choose Us -->
            <section class="py-16 bg-gray-100">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-12">Why Choose CarRent?</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="text-center">
                            <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-shield-alt text-blue-600 text-3xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">Fully Insured</h3>
                            <p class="text-gray-600">All our vehicles are fully insured for your peace of mind</p>
                        </div>
                        <div class="text-center">
                            <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-dollar-sign text-blue-600 text-3xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">Best Prices</h3>
                            <p class="text-gray-600">Competitive rates with no hidden fees</p>
                        </div>
                        <div class="text-center">
                            <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i class="fas fa-headset text-blue-600 text-3xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
                            <p class="text-gray-600">Round-the-clock customer support</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async getAboutPage() {
        return `
            <section class="py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h1 class="text-4xl font-bold mb-4">About CarRent</h1>
                        <p class="text-xl text-gray-600">Your trusted partner for premium car rental services</p>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 class="text-3xl font-bold mb-6">Our Story</h2>
                            <p class="text-gray-600 mb-4">
                                Founded with a vision to revolutionize the car rental industry, CarRent has been serving customers with excellence for over a decade. We understand that every journey is unique, and we're committed to providing the perfect vehicle for your needs.
                            </p>
                            <p class="text-gray-600 mb-4">
                                Our fleet consists of carefully maintained vehicles ranging from economy cars to luxury sedans, ensuring that you find exactly what you're looking for. Whether it's a business trip, family vacation, or special occasion, we've got you covered.
                            </p>
                            <div class="grid grid-cols-2 gap-4 mt-8">
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <div class="text-3xl font-bold text-blue-600">500+</div>
                                    <div class="text-gray-600">Vehicles in Fleet</div>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <div class="text-3xl font-bold text-blue-600">10,000+</div>
                                    <div class="text-gray-600">Happy Customers</div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                            <i class="fas fa-car text-gray-400 text-6xl"></i>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async getServicesPage() {
        return `
            <section class="py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h1 class="text-4xl font-bold mb-4">Our Services</h1>
                        <p class="text-xl text-gray-600">Comprehensive car rental solutions for every need</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <i class="fas fa-car text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-4">Economy Cars</h3>
                            <p class="text-gray-600 mb-4">Fuel-efficient and budget-friendly options for city driving and short trips.</p>
                            <ul class="text-gray-600 space-y-2">
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Great mileage</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Easy parking</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Affordable rates</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <i class="fas fa-users text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-4">Family Cars</h3>
                            <p class="text-gray-600 mb-4">Spacious vehicles perfect for family vacations and group travel.</p>
                            <ul class="text-gray-600 space-y-2">
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Extra seating</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Ample luggage space</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Safety features</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <i class="fas fa-gem text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-4">Luxury Cars</h3>
                            <p class="text-gray-600 mb-4">Premium vehicles for special occasions and business travel.</p>
                            <ul class="text-gray-600 space-y-2">
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Top brands</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Advanced features</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Comfort & style</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <i class="fas fa-truck text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-4">SUVs & Trucks</h3>
                            <p class="text-gray-600 mb-4">Powerful vehicles for off-road adventures and heavy-duty tasks.</p>
                            <ul class="text-gray-600 space-y-2">
                                <li><i class="fas fa-check text-green-500 mr-2"></i>4WD capability</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>High clearance</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Towing capacity</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <i class="fas fa-bolt text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-4">Electric Vehicles</h3>
                            <p class="text-gray-600 mb-4">Eco-friendly electric cars for sustainable transportation.</p>
                            <ul class="text-gray-600 space-y-2">
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Zero emissions</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Quiet operation</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Modern tech</li>
                            </ul>
                        </div>
                        
                        <div class="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                                <i class="fas fa-clock text-blue-600 text-2xl"></i>
                            </div>
                            <h3 class="text-xl font-semibold mb-4">Long-term Rentals</h3>
                            <p class="text-gray-600 mb-4">Flexible monthly and yearly rental options with special rates.</p>
                            <ul class="text-gray-600 space-y-2">
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Discounted rates</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Maintenance included</li>
                                <li><i class="fas fa-check text-green-500 mr-2"></i>Vehicle swap option</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async getBlogPage() {
        return `
            <section class="py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h1 class="text-4xl font-bold mb-4">Car Tips & Travel Blog</h1>
                        <p class="text-xl text-gray-600">Expert advice and travel inspiration</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div class="bg-gray-200 h-48 flex items-center justify-center">
                                <i class="fas fa-road text-gray-400 text-4xl"></i>
                            </div>
                            <div class="p-6">
                                <div class="text-sm text-gray-500 mb-2">March 15, 2024</div>
                                <h3 class="text-xl font-semibold mb-3">10 Essential Road Trip Tips</h3>
                                <p class="text-gray-600 mb-4">Planning a road trip? Check out these essential tips to make your journey smooth and enjoyable.</p>
                                <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold">Read More →</a>
                            </div>
                        </article>
                        
                        <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div class="bg-gray-200 h-48 flex items-center justify-center">
                                <i class="fas fa-car text-gray-400 text-4xl"></i>
                            </div>
                            <div class="p-6">
                                <div class="text-sm text-gray-500 mb-2">March 10, 2024</div>
                                <h3 class="text-xl font-semibold mb-3">How to Choose the Right Rental Car</h3>
                                <p class="text-gray-600 mb-4">Selecting the perfect rental car can be overwhelming. Here's what you need to consider.</p>
                                <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold">Read More →</a>
                            </div>
                        </article>
                        
                        <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div class="bg-gray-200 h-48 flex items-center justify-center">
                                <i class="fas fa-map-marked-alt text-gray-400 text-4xl"></i>
                            </div>
                            <div class="p-6">
                                <div class="text-sm text-gray-500 mb-2">March 5, 2024</div>
                                <h3 class="text-xl font-semibold mb-3">Best Scenic Drives in Morocco</h3>
                                <p class="text-gray-600 mb-4">Discover the most breathtaking routes and hidden gems Morocco has to offer.</p>
                                <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold">Read More →</a>
                            </div>
                        </article>
                        
                        <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div class="bg-gray-200 h-48 flex items-center justify-center">
                                <i class="fas fa-shield-alt text-gray-400 text-4xl"></i>
                            </div>
                            <div class="p-6">
                                <div class="text-sm text-gray-500 mb-2">February 28, 2024</div>
                                <h3 class="text-xl font-semibold mb-3">Car Rental Insurance Explained</h3>
                                <p class="text-gray-600 mb-4">Understanding your insurance options when renting a car.</p>
                                <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold">Read More →</a>
                            </div>
                        </article>
                        
                        <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div class="bg-gray-200 h-48 flex items-center justify-center">
                                <i class="fas fa-gas-pump text-gray-400 text-4xl"></i>
                            </div>
                            <div class="p-6">
                                <div class="text-sm text-gray-500 mb-2">February 20, 2024</div>
                                <h3 class="text-xl font-semibold mb-3">Fuel-Saving Driving Techniques</h3>
                                <p class="text-gray-600 mb-4">Simple techniques to reduce fuel consumption and save money on your rental.</p>
                                <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold">Read More →</a>
                            </div>
                        </article>
                        
                        <article class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div class="bg-gray-200 h-48 flex items-center justify-center">
                                <i class="fas fa-suitcase text-gray-400 text-4xl"></i>
                            </div>
                            <div class="p-6">
                                <div class="text-sm text-gray-500 mb-2">February 15, 2024</div>
                                <h3 class="text-xl font-semibold mb-3">Packing Smart for Car Travel</h3>
                                <p class="text-gray-600 mb-4">How to pack efficiently for your road trip adventure.</p>
                                <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold">Read More →</a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        `;
    }

    async getContactPage() {
        return `
            <section class="py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-12">
                        <h1 class="text-4xl font-bold mb-4">Contact Us</h1>
                        <p class="text-xl text-gray-600">Get in touch with our team</p>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <!-- Contact Form -->
                        <div class="bg-white p-8 rounded-lg shadow-lg">
                            <h2 class="text-2xl font-semibold mb-6">Send us a Message</h2>
                            <form id="contact-form">
                                <div class="mb-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                                        Name
                                    </label>
                                    <input class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" id="name" type="text" required>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                        Email
                                    </label>
                                    <input class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" id="email" type="email" required>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-gray-700 text-sm font-bold mb-2" for="message">
                                        Message
                                    </label>
                                    <textarea class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" id="message" rows="4" required></textarea>
                                </div>
                                <button type="submit" class="btn-primary bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full">
                                    Send Message
                                </button>
                            </form>
                        </div>
                        
                        <!-- Contact Info & Map -->
                        <div>
                            <div class="bg-white p-8 rounded-lg shadow-lg mb-8">
                                <h2 class="text-2xl font-semibold mb-6">Contact Information</h2>
                                <div class="space-y-4">
                                    <div class="flex items-center">
                                        <i class="fas fa-user text-blue-600 text-xl w-8"></i>
                                        <div>
                                            <div class="font-semibold">Name</div>
                                            <div class="text-gray-600">Sekouti Abdelaziz</div>
                                        </div>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-phone text-blue-600 text-xl w-8"></i>
                                        <div>
                                            <div class="font-semibold">Phone</div>
                                            <div class="text-gray-600">+212612236660</div>
                                        </div>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-envelope text-blue-600 text-xl w-8"></i>
                                        <div>
                                            <div class="font-semibold">Email</div>
                                            <div class="text-gray-600">sekoutiabdelaziz0@gmail.com</div>
                                        </div>
                                    </div>
                                    <div class="flex items-center">
                                        <i class="fas fa-clock text-blue-600 text-xl w-8"></i>
                                        <div>
                                            <div class="font-semibold">Business Hours</div>
                                            <div class="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</div>
                                            <div class="text-gray-600">Saturday: 10:00 AM - 4:00 PM</div>
                                            <div class="text-gray-600">Sunday: Closed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Google Maps Embed -->
                            <div class="bg-white p-4 rounded-lg shadow-lg">
                                <h3 class="text-lg font-semibold mb-4">Our Location</h3>
                                <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-map-marked-alt text-gray-400 text-4xl"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async getAdminPage() {
        return `
            <section class="py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold mb-8">Admin Panel</h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <!-- Admin Sidebar -->
                        <div class="lg:col-span-1">
                            <div class="bg-white rounded-lg shadow-lg p-6">
                                <h3 class="font-semibold mb-4">Management</h3>
                                <nav class="space-y-2">
                                    <button onclick="admin.showCarsManagement()" class="w-full text-left px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                        <i class="fas fa-car mr-2"></i> Cars
                                    </button>
                                    <button onclick="admin.showBookingsManagement()" class="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">
                                        <i class="fas fa-calendar mr-2"></i> Bookings
                                    </button>
                                    <button onclick="admin.showUsersManagement()" class="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">
                                        <i class="fas fa-users mr-2"></i> Users
                                    </button>
                                </nav>
                            </div>
                        </div>
                        
                        <!-- Admin Content -->
                        <div class="lg:col-span-3">
                            <div id="admin-content" class="bg-white rounded-lg shadow-lg p-6">
                                <!-- Admin content will be loaded here -->
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    async getProfilePage() {
        return `
            <section class="py-16">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold mb-8">My Profile</h1>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <!-- User Info -->
                        <div class="lg:col-span-1">
                            <div class="bg-white rounded-lg shadow-lg p-6">
                                <div class="text-center mb-6">
                                    <div class="bg-gray-200 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center">
                                        <i class="fas fa-user text-gray-400 text-3xl"></i>
                                    </div>
                                    <h3 class="text-xl font-semibold" id="profile-name">User Name</h3>
                                    <p class="text-gray-600" id="profile-email">user@example.com</p>
                                </div>
                                <div class="space-y-2">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Member Since:</span>
                                        <span id="profile-since">2024</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Total Bookings:</span>
                                        <span id="profile-bookings">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Booking History -->
                        <div class="lg:col-span-2">
                            <div class="bg-white rounded-lg shadow-lg p-6">
                                <h3 class="text-xl font-semibold mb-6">Booking History</h3>
                                <div id="booking-history" class="space-y-4">
                                    <!-- Bookings will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    initializePage(page) {
        switch (page) {
            case 'home':
                this.loadCars();
                break;
            case 'contact':
                this.setupContactForm();
                break;
            case 'admin':
                admin.showCarsManagement();
                break;
            case 'profile':
                this.loadUserProfile();
                break;
        }
    }

    loadCars() {
        const carsContainer = document.getElementById('cars-container');
        if (!carsContainer) return;

        const cars = JSON.parse(localStorage.getItem('cars')) || this.getDefaultCars();

        carsContainer.innerHTML = cars.map(car => `
            <div class="car-card bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="bg-gray-200 h-48 flex items-center justify-center">
                    <i class="fas fa-car text-gray-400 text-4xl"></i>
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${car.name}</h3>
                    <div class="text-gray-600 mb-4">
                        <div class="flex justify-between mb-2">
                            <span><i class="fas fa-users mr-1"></i> ${car.seats} Seats</span>
                            <span><i class="fas fa-cog mr-1"></i> ${car.transmission}</span>
                        </div>
                        <div class="flex justify-between">
                            <span><i class="fas fa-gas-pump mr-1"></i> ${car.fuel}</span>
                            <span class="font-semibold text-blue-600">${car.price}/day</span>
                        </div>
                    </div>
                    <button onclick="app.showBookingModal('${car.id}')" class="btn-primary bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">
                        Book Now
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Save contact message (in real app, this would be sent to server)
            const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
            messages.push({
                ...formData,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contactMessages', JSON.stringify(messages));

            // Show success message
            this.showNotification('Message sent successfully! We will get back to you soon.', 'success');

            // Reset form
            contactForm.reset();
        });
    }

    loadUserProfile() {
        const user = auth.getCurrentUser();
        if (!user) return;

        // Update profile info
        document.getElementById('profile-name').textContent = user.name;
        document.getElementById('profile-email').textContent = user.email;
        document.getElementById('profile-since').textContent = new Date(user.createdAt).getFullYear();

        // Load booking history
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const userBookings = bookings.filter(booking => booking.userId === user.id);

        document.getElementById('profile-bookings').textContent = userBookings.length;

        const bookingHistory = document.getElementById('booking-history');
        if (userBookings.length === 0) {
            bookingHistory.innerHTML = '<p class="text-gray-600">No bookings yet.</p>';
        } else {
            bookingHistory.innerHTML = userBookings.map(booking => `
                <div class="border rounded-lg p-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-semibold">${booking.carName}</h4>
                            <p class="text-gray-600 text-sm">
                                ${booking.startDate} - ${booking.endDate}
                            </p>
                            <p class="text-gray-600 text-sm">
                                Total: ${booking.totalPrice}
                            </p>
                        </div>
                        <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            ${booking.status}
                        </span>
                    </div>
                </div>
            `).join('');
        }
    }

    showBookingModal(carId = null) {
        const user = auth.getCurrentUser();
        if (!user) {
            auth.showLoginModal();
            return;
        }

        const cars = JSON.parse(localStorage.getItem('cars')) || this.getDefaultCars();
        const car = carId ? cars.find(c => c.id === carId) : null;

        const modalHTML = `
            <div class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <h3 class="text-2xl font-bold mb-6">Book a Car</h3>
                    
                    ${car ? `
                        <div class="mb-6 p-4 bg-blue-50 rounded-lg">
                            <h4 class="font-semibold">${car.name}</h4>
                            <p class="text-gray-600">${car.price}/day</p>
                        </div>
                    ` : ''}
                    
                    <form id="booking-form">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Select Car</label>
                            <select id="booking-car" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                                <option value="">Choose a car...</option>
                                ${cars.map(c => `
                                    <option value="${c.id}" ${carId === c.id ? 'selected' : ''}>
                                        ${c.name} - ${c.price}/day
                                    </option>
                                `).join('')}
                            </select>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                                <input type="date" id="booking-start" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                                <input type="date" id="booking-end" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Special Requests (Optional)</label>
                            <textarea id="booking-requests" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" rows="3"></textarea>
                        </div>
                        
                        <div class="flex space-x-4">
                            <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Confirm Booking
                            </button>
                            <button type="button" onclick="app.closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;

        // Setup form submission
        document.getElementById('booking-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.processBooking();
        });

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('booking-start').min = today;
        document.getElementById('booking-end').min = today;
    }

    processBooking() {
        const carId = document.getElementById('booking-car').value;
        const startDate = document.getElementById('booking-start').value;
        const endDate = document.getElementById('booking-end').value;
        const requests = document.getElementById('booking-requests').value;

        const cars = JSON.parse(localStorage.getItem('cars')) || this.getDefaultCars();
        const car = cars.find(c => c.id === carId);

        if (!car) return;

        // Calculate days and price
        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
        const totalPrice = `${car.price} x ${days} days = ${parseInt(car.price) * days}`;

        const user = auth.getCurrentUser();
        const booking = {
            id: Date.now().toString(),
            userId: user.id,
            carId: car.id,
            carName: car.name,
            startDate,
            endDate,
            days,
            requests,
            totalPrice,
            status: 'Confirmed',
            createdAt: new Date().toISOString()
        };

        // Save booking
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        // Show success message
        this.showNotification('Booking confirmed successfully!', 'success');
        this.closeModal();

        // Redirect to profile
        this.loadPage('profile');
    }

    closeModal() {
        document.getElementById('modal-container').innerHTML = '';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg ${type === 'success' ? 'bg-green-500' :
                type === 'error' ? 'bg-red-500' :
                    'bg-blue-500'
            } text-white`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateAuthUI() {
        const authMenu = document.getElementById('auth-menu');
        const mobileAuthMenu = document.getElementById('mobile-auth-menu');
        const user = auth.getCurrentUser();

        if (user) {
            const authButtons = `
                <span class="text-gray-600">Welcome, ${user.name}</span>
                <button onclick="app.loadPage('profile')" class="text-blue-600 hover:text-blue-700">
                    <i class="fas fa-user"></i> Profile
                </button>
                ${user.role === 'admin' ? `
                    <button onclick="app.loadPage('admin')" class="text-purple-600 hover:text-purple-700">
                        <i class="fas fa-cog"></i> Admin
                    </button>
                ` : ''}
                <button onclick="auth.logout()" class="text-red-600 hover:text-red-700">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            `;

            authMenu.innerHTML = authButtons;
            mobileAuthMenu.innerHTML = authButtons;
        } else {
            const authButtons = `
                <button onclick="auth.showLoginModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Login
                </button>
                <button onclick="auth.showSignupModal()" class="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Sign Up
                </button>
            `;

            authMenu.innerHTML = authButtons;
            mobileAuthMenu.innerHTML = authButtons;
        }
    }

    getDefaultCars() {
        return [
            {
                id: '1',
                name: 'Toyota Corolla',
                type: 'Economy',
                seats: 5,
                transmission: 'Automatic',
                fuel: 'Gasoline',
                price: '$30',
                image: 'corolla.jpg'
            },
            {
                id: '2',
                name: 'Honda CR-V',
                type: 'SUV',
                seats: 7,
                transmission: 'Automatic',
                fuel: 'Gasoline',
                price: '$50',
                image: 'crv.jpg'
            },
            {
                id: '3',
                name: 'BMW 3 Series',
                type: 'Luxury',
                seats: 5,
                transmission: 'Automatic',
                fuel: 'Gasoline',
                price: '$80',
                image: 'bmw3.jpg'
            },
            {
                id: '4',
                name: 'Ford Transit',
                type: 'Van',
                seats: 8,
                transmission: 'Manual',
                fuel: 'Diesel',
                price: '$60',
                image: 'transit.jpg'
            },
            {
                id: '5',
                name: 'Tesla Model 3',
                type: 'Electric',
                seats: 5,
                transmission: 'Automatic',
                fuel: 'Electric',
                price: '$90',
                image: 'tesla3.jpg'
            },
            {
                id: '6',
                name: 'Nissan Sentra',
                type: 'Economy',
                seats: 5,
                transmission: 'Automatic',
                fuel: 'Gasoline',
                price: '$25',
                image: 'sentra.jpg'
            }
        ];
    }
}

// Initialize the app
const app = new CarRentApp();