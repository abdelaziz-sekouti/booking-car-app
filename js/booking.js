// Booking System Management
class BookingSystem {
    constructor() {
        this.bookings = [];
        this.init();
    }

    init() {
        // Load bookings from localStorage
        const storedBookings = localStorage.getItem('bookings');
        if (storedBookings) {
            this.bookings = JSON.parse(storedBookings);
        }
    }

    createBooking(bookingData) {
        const booking = {
            id: 'booking-' + Date.now(),
            ...bookingData,
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };

        this.bookings.push(booking);
        this.saveBookings();
        
        return booking;
    }

    updateBookingStatus(bookingId, status) {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = status;
            this.saveBookings();
            return true;
        }
        return false;
    }

    cancelBooking(bookingId) {
        const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            this.bookings[bookingIndex].status = 'cancelled';
            this.saveBookings();
            return true;
        }
        return false;
    }

    getUserBookings(userId) {
        return this.bookings.filter(booking => booking.userId === userId);
    }

    getAllBookings() {
        return this.bookings;
    }

    getBookingById(bookingId) {
        return this.bookings.find(b => b.id === bookingId);
    }

    checkCarAvailability(carId, startDate, endDate) {
        // Check if the car is available for the given dates
        const conflictingBookings = this.bookings.filter(booking => {
            if (booking.carId !== carId || booking.status === 'cancelled') {
                return false;
            }
            
            const bookingStart = new Date(booking.startDate);
            const bookingEnd = new Date(booking.endDate);
            const requestedStart = new Date(startDate);
            const requestedEnd = new Date(endDate);
            
            return (requestedStart <= bookingEnd && requestedEnd >= bookingStart);
        });
        
        return conflictingBookings.length === 0;
    }

    calculateTotalPrice(carId, startDate, endDate) {
        const cars = JSON.parse(localStorage.getItem('cars')) || app.getDefaultCars();
        const car = cars.find(c => c.id === carId);
        
        if (!car) return 0;
        
        const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
        const pricePerDay = parseInt(car.price.replace('$', ''));
        
        return pricePerDay * days;
    }

    saveBookings() {
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }

    validateBookingDates(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Check if dates are valid
        if (start >= end) {
            return { valid: false, message: 'End date must be after start date' };
        }
        
        // Check if start date is not in the past
        if (start < today) {
            return { valid: false, message: 'Start date cannot be in the past' };
        }
        
        // Check if booking duration is reasonable (max 30 days)
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        if (days > 30) {
            return { valid: false, message: 'Maximum booking duration is 30 days' };
        }
        
        return { valid: true };
    }

    generateBookingConfirmation(booking) {
        return {
            bookingId: booking.id,
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            carName: booking.carName,
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalPrice: booking.totalPrice,
            status: booking.status,
            specialRequests: booking.specialRequests || 'None',
            createdAt: booking.createdAt
        };
    }

    exportBookingsToCSV() {
        const headers = ['Booking ID', 'Customer', 'Car', 'Start Date', 'End Date', 'Total Price', 'Status', 'Created At'];
        const rows = this.bookings.map(booking => [
            booking.id,
            booking.customerName || 'Unknown',
            booking.carName,
            booking.startDate,
            booking.endDate,
            booking.totalPrice,
            booking.status,
            new Date(booking.createdAt).toLocaleString()
        ]);
        
        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.map(cell => `"${cell}"`).join(',') + '\n';
        });
        
        return csv;
    }

    getBookingStats() {
        const totalBookings = this.bookings.length;
        const confirmedBookings = this.bookings.filter(b => b.status === 'confirmed').length;
        const cancelledBookings = this.bookings.filter(b => b.status === 'cancelled').length;
        const completedBookings = this.bookings.filter(b => b.status === 'completed').length;
        
        const totalRevenue = this.bookings
            .filter(b => b.status === 'confirmed' || b.status === 'completed')
            .reduce((sum, booking) => {
                const price = parseInt(booking.totalPrice.replace(/[^0-9]/g, ''));
                return sum + price;
            }, 0);
        
        return {
            totalBookings,
            confirmedBookings,
            cancelledBookings,
            completedBookings,
            totalRevenue,
            averageBookingValue: totalBookings > 0 ? totalRevenue / totalBookings : 0
        };
    }

    searchBookings(query) {
        const lowerQuery = query.toLowerCase();
        
        return this.bookings.filter(booking => {
            return (
                booking.id.toLowerCase().includes(lowerQuery) ||
                (booking.customerName && booking.customerName.toLowerCase().includes(lowerQuery)) ||
                (booking.customerEmail && booking.customerEmail.toLowerCase().includes(lowerQuery)) ||
                booking.carName.toLowerCase().includes(lowerQuery) ||
                booking.status.toLowerCase().includes(lowerQuery)
            );
        });
    }

    filterBookingsByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return this.bookings.filter(booking => {
            const bookingDate = new Date(booking.createdAt);
            return bookingDate >= start && bookingDate <= end;
        });
    }

    getMostBookedCars() {
        const carBookingCounts = {};
        
        this.bookings.forEach(booking => {
            if (booking.status !== 'cancelled') {
                carBookingCounts[booking.carId] = (carBookingCounts[booking.carId] || 0) + 1;
            }
        });
        
        // Sort by booking count (descending)
        const sortedCars = Object.entries(carBookingCounts)
            .sort(([,a], [,b]) => b - a)
            .map(([carId, count]) => ({ carId, count }));
        
        return sortedCars;
    }

    getUpcomingBookings() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return this.bookings.filter(booking => {
            if (booking.status !== 'confirmed') return false;
            
            const bookingStart = new Date(booking.startDate);
            return bookingStart >= today;
        }).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    }

    getOverdueBookings() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return this.bookings.filter(booking => {
            if (booking.status !== 'confirmed') return false;
            
            const bookingEnd = new Date(booking.endDate);
            return bookingEnd < today;
        });
    }
}

// Initialize booking system
const bookingSystem = new BookingSystem();