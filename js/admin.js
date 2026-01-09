// Admin Panel Management
class AdminPanel {
    constructor() {
        this.currentSection = 'cars';
    }

    showCarsManagement() {
        this.currentSection = 'cars';
        const adminContent = document.getElementById('admin-content');
        
        const cars = JSON.parse(localStorage.getItem('cars')) || app.getDefaultCars();
        
        adminContent.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-semibold">Cars Management</h3>
                <button onclick="admin.showAddCarModal()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <i class="fas fa-plus mr-2"></i>Add New Car
                </button>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-left">Name</th>
                            <th class="px-4 py-2 text-left">Type</th>
                            <th class="px-4 py-2 text-left">Seats</th>
                            <th class="px-4 py-2 text-left">Transmission</th>
                            <th class="px-4 py-2 text-left">Fuel</th>
                            <th class="px-4 py-2 text-left">Price/Day</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cars.map(car => `
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-4 py-3">${car.name}</td>
                                <td class="px-4 py-3">${car.type}</td>
                                <td class="px-4 py-3">${car.seats}</td>
                                <td class="px-4 py-3">${car.transmission}</td>
                                <td class="px-4 py-3">${car.fuel}</td>
                                <td class="px-4 py-3">${car.price}</td>
                                <td class="px-4 py-3">
                                    <button onclick="admin.showEditCarModal('${car.id}')" class="text-blue-600 hover:text-blue-700 mr-3">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="admin.deleteCar('${car.id}')" class="text-red-600 hover:text-red-700">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    showBookingsManagement() {
        this.currentSection = 'bookings';
        const adminContent = document.getElementById('admin-content');
        
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        adminContent.innerHTML = `
            <div class="mb-6">
                <h3 class="text-xl font-semibold">Bookings Management</h3>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-left">Booking ID</th>
                            <th class="px-4 py-2 text-left">Customer</th>
                            <th class="px-4 py-2 text-left">Car</th>
                            <th class="px-4 py-2 text-left">Dates</th>
                            <th class="px-4 py-2 text-left">Total Price</th>
                            <th class="px-4 py-2 text-left">Status</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${bookings.map(booking => {
                            const user = users.find(u => u.id === booking.userId);
                            return `
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="px-4 py-3">#${booking.id}</td>
                                    <td class="px-4 py-3">${user ? user.name : 'Unknown'}</td>
                                    <td class="px-4 py-3">${booking.carName}</td>
                                    <td class="px-4 py-3">${booking.startDate} - ${booking.endDate}</td>
                                    <td class="px-4 py-3">${booking.totalPrice}</td>
                                    <td class="px-4 py-3">
                                        <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                            ${booking.status}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3">
                                        <button onclick="admin.viewBookingDetails('${booking.id}')" class="text-blue-600 hover:text-blue-700 mr-3">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        <button onclick="admin.deleteBooking('${booking.id}')" class="text-red-600 hover:text-red-700">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    showUsersManagement() {
        this.currentSection = 'users';
        const adminContent = document.getElementById('admin-content');
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        adminContent.innerHTML = `
            <div class="mb-6">
                <h3 class="text-xl font-semibold">Users Management</h3>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="px-4 py-2 text-left">Name</th>
                            <th class="px-4 py-2 text-left">Email</th>
                            <th class="px-4 py-2 text-left">Role</th>
                            <th class="px-4 py-2 text-left">Member Since</th>
                            <th class="px-4 py-2 text-left">Bookings</th>
                            <th class="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${users.map(user => {
                            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
                            const userBookings = bookings.filter(b => b.userId === user.id);
                            
                            return `
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="px-4 py-3">${user.name}</td>
                                    <td class="px-4 py-3">${user.email}</td>
                                    <td class="px-4 py-3">
                                        <span class="px-2 py-1 ${
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                                        } rounded-full text-sm">
                                            ${user.role}
                                        </span>
                                    </td>
                                    <td class="px-4 py-3">${new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td class="px-4 py-3">${userBookings.length}</td>
                                    <td class="px-4 py-3">
                                        <button onclick="admin.viewUserDetails('${user.id}')" class="text-blue-600 hover:text-blue-700 mr-3">
                                            <i class="fas fa-eye"></i>
                                        </button>
                                        ${user.role !== 'admin' ? `
                                            <button onclick="admin.deleteUser('${user.id}')" class="text-red-600 hover:text-red-700">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        ` : ''}
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    showAddCarModal() {
        const modalHTML = `
            <div class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <h3 class="text-2xl font-bold mb-6">Add New Car</h3>
                    
                    <form id="add-car-form">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Car Name</label>
                            <input type="text" id="car-name" class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                        </div>
                        
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Type</label>
                            <select id="car-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                                <option value="">Select type...</option>
                                <option value="Economy">Economy</option>
                                <option value="SUV">SUV</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Van">Van</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Seats</label>
                                <input type="number" id="car-seats" min="2" max="8" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Price/Day</label>
                                <input type="text" id="car-price" placeholder="$30" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Transmission</label>
                                <select id="car-transmission" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Fuel</label>
                                <select id="car-fuel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                                    <option value="Gasoline">Gasoline</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="flex space-x-4">
                            <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Add Car
                            </button>
                            <button type="button" onclick="admin.closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;
        
        // Setup form submission
        document.getElementById('add-car-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addCar();
        });
    }

    showEditCarModal(carId) {
        const cars = JSON.parse(localStorage.getItem('cars')) || app.getDefaultCars();
        const car = cars.find(c => c.id === carId);
        
        if (!car) return;

        const modalHTML = `
            <div class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <h3 class="text-2xl font-bold mb-6">Edit Car</h3>
                    
                    <form id="edit-car-form">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Car Name</label>
                            <input type="text" id="car-name" value="${car.name}" class="form-input w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                        </div>
                        
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2">Type</label>
                            <select id="car-type" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                                <option value="Economy" ${car.type === 'Economy' ? 'selected' : ''}>Economy</option>
                                <option value="SUV" ${car.type === 'SUV' ? 'selected' : ''}>SUV</option>
                                <option value="Luxury" ${car.type === 'Luxury' ? 'selected' : ''}>Luxury</option>
                                <option value="Van" ${car.type === 'Van' ? 'selected' : ''}>Van</option>
                                <option value="Electric" ${car.type === 'Electric' ? 'selected' : ''}>Electric</option>
                            </select>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Seats</label>
                                <input type="number" id="car-seats" value="${car.seats}" min="2" max="8" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Price/Day</label>
                                <input type="text" id="car-price" value="${car.price}" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Transmission</label>
                                <select id="car-transmission" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                                    <option value="Automatic" ${car.transmission === 'Automatic' ? 'selected' : ''}>Automatic</option>
                                    <option value="Manual" ${car.transmission === 'Manual' ? 'selected' : ''}>Manual</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-gray-700 text-sm font-bold mb-2">Fuel</label>
                                <select id="car-fuel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
                                    <option value="Gasoline" ${car.fuel === 'Gasoline' ? 'selected' : ''}>Gasoline</option>
                                    <option value="Diesel" ${car.fuel === 'Diesel' ? 'selected' : ''}>Diesel</option>
                                    <option value="Electric" ${car.fuel === 'Electric' ? 'selected' : ''}>Electric</option>
                                    <option value="Hybrid" ${car.fuel === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="flex space-x-4">
                            <button type="submit" class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Update Car
                            </button>
                            <button type="button" onclick="admin.closeModal()" class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;
        
        // Setup form submission
        document.getElementById('edit-car-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateCar(carId);
        });
    }

    addCar() {
        const cars = JSON.parse(localStorage.getItem('cars')) || app.getDefaultCars();
        
        const newCar = {
            id: 'car-' + Date.now(),
            name: document.getElementById('car-name').value,
            type: document.getElementById('car-type').value,
            seats: parseInt(document.getElementById('car-seats').value),
            transmission: document.getElementById('car-transmission').value,
            fuel: document.getElementById('car-fuel').value,
            price: document.getElementById('car-price').value,
            image: 'default.jpg'
        };

        cars.push(newCar);
        localStorage.setItem('cars', JSON.stringify(cars));

        app.showNotification('Car added successfully!', 'success');
        this.closeModal();
        this.showCarsManagement();
    }

    updateCar(carId) {
        const cars = JSON.parse(localStorage.getItem('cars')) || app.getDefaultCars();
        const carIndex = cars.findIndex(c => c.id === carId);
        
        if (carIndex !== -1) {
            cars[carIndex] = {
                ...cars[carIndex],
                name: document.getElementById('car-name').value,
                type: document.getElementById('car-type').value,
                seats: parseInt(document.getElementById('car-seats').value),
                transmission: document.getElementById('car-transmission').value,
                fuel: document.getElementById('car-fuel').value,
                price: document.getElementById('car-price').value
            };

            localStorage.setItem('cars', JSON.stringify(cars));

            app.showNotification('Car updated successfully!', 'success');
            this.closeModal();
            this.showCarsManagement();
        }
    }

    deleteCar(carId) {
        if (confirm('Are you sure you want to delete this car?')) {
            const cars = JSON.parse(localStorage.getItem('cars')) || app.getDefaultCars();
            const filteredCars = cars.filter(c => c.id !== carId);
            
            localStorage.setItem('cars', JSON.stringify(filteredCars));

            app.showNotification('Car deleted successfully!', 'success');
            this.showCarsManagement();
        }
    }

    deleteBooking(bookingId) {
        if (confirm('Are you sure you want to delete this booking?')) {
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            const filteredBookings = bookings.filter(b => b.id !== bookingId);
            
            localStorage.setItem('bookings', JSON.stringify(filteredBookings));

            app.showNotification('Booking deleted successfully!', 'success');
            this.showBookingsManagement();
        }
    }

    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const filteredUsers = users.filter(u => u.id !== userId);
            
            localStorage.setItem('users', JSON.stringify(filteredUsers));

            // Also delete user's bookings
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            const filteredBookings = bookings.filter(b => b.userId !== userId);
            localStorage.setItem('bookings', JSON.stringify(filteredBookings));

            app.showNotification('User deleted successfully!', 'success');
            this.showUsersManagement();
        }
    }

    viewBookingDetails(bookingId) {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const booking = bookings.find(b => b.id === bookingId);
        
        if (!booking) return;

        const modalHTML = `
            <div class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                    <h3 class="text-2xl font-bold mb-6">Booking Details</h3>
                    
                    <div class="space-y-4">
                        <div>
                            <span class="font-semibold">Booking ID:</span> #${booking.id}
                        </div>
                        <div>
                            <span class="font-semibold">Car:</span> ${booking.carName}
                        </div>
                        <div>
                            <span class="font-semibold">Start Date:</span> ${booking.startDate}
                        </div>
                        <div>
                            <span class="font-semibold">End Date:</span> ${booking.endDate}
                        </div>
                        <div>
                            <span class="font-semibold">Days:</span> ${booking.days}
                        </div>
                        <div>
                            <span class="font-semibold">Total Price:</span> ${booking.totalPrice}
                        </div>
                        <div>
                            <span class="font-semibold">Status:</span> 
                            <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                ${booking.status}
                            </span>
                        </div>
                        ${booking.requests ? `
                            <div>
                                <span class="font-semibold">Special Requests:</span><br>
                                ${booking.requests}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="mt-6">
                        <button onclick="admin.closeModal()" class="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;
    }

    viewUserDetails(userId) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.id === userId);
        
        if (!user) return;

        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const userBookings = bookings.filter(b => b.userId === userId);

        const modalHTML = `
            <div class="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-screen overflow-y-auto">
                    <h3 class="text-2xl font-bold mb-6">User Details</h3>
                    
                    <div class="space-y-4">
                        <div>
                            <span class="font-semibold">Name:</span> ${user.name}
                        </div>
                        <div>
                            <span class="font-semibold">Email:</span> ${user.email}
                        </div>
                        <div>
                            <span class="font-semibold">Role:</span> 
                            <span class="px-2 py-1 ${
                                user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                            } rounded-full text-sm">
                                ${user.role}
                            </span>
                        </div>
                        <div>
                            <span class="font-semibold">Member Since:</span> ${new Date(user.createdAt).toLocaleDateString()}
                        </div>
                        <div>
                            <span class="font-semibold">Total Bookings:</span> ${userBookings.length}
                        </div>
                        
                        ${userBookings.length > 0 ? `
                            <div class="mt-6">
                                <h4 class="font-semibold mb-3">Recent Bookings:</h4>
                                <div class="space-y-2">
                                    ${userBookings.slice(0, 3).map(booking => `
                                        <div class="border rounded p-3">
                                            <div class="font-semibold">${booking.carName}</div>
                                            <div class="text-sm text-gray-600">${booking.startDate} - ${booking.endDate}</div>
                                            <div class="text-sm">${booking.totalPrice}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="mt-6">
                        <button onclick="admin.closeModal()" class="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('modal-container').innerHTML = modalHTML;
    }

    closeModal() {
        document.getElementById('modal-container').innerHTML = '';
    }
}

// Initialize admin panel
const admin = new AdminPanel();