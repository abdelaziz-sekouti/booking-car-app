# CarRent - Premium Car Rental Web Application

A modern, responsive car booking web application built with HTML5, TailwindCSS, and Vanilla JavaScript. Features user authentication, admin panel, and comprehensive booking management.

## Features

### User Features
- **Authentication System**: Sign up, login, and logout functionality
- **Car Browsing**: View available cars with detailed information
- **Booking System**: Book cars with date selection and special requests
- **Booking History**: View past and current bookings
- **User Profile**: Manage personal information and view booking statistics

### Admin Features
- **Car Management**: Add, edit, and delete cars (CRUD operations)
- **Booking Management**: View all bookings, manage booking status
- **User Management**: View all users and manage user accounts
- **Dashboard**: Comprehensive admin panel with statistics

### Pages
- **Home**: Hero section with featured cars
- **About**: Company overview and information
- **Services**: Detailed service descriptions
- **Blog**: Car tips and travel articles
- **Contact**: Contact form with Google Maps integration
- **Admin Panel**: Protected admin dashboard

### Design Features
- **Responsive Design**: Fully mobile-responsive layout
- **Modern UI**: Clean, professional interface with TailwindCSS
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **WhatsApp Integration**: Floating WhatsApp chat button
- **Sticky Navigation**: Easy access to all pages

## Technical Implementation

### Frontend Stack
- **HTML5**: Semantic markup and SEO-friendly structure
- **TailwindCSS**: Utility-first CSS framework
- **Vanilla JavaScript**: No frameworks, pure JS implementation
- **Font Awesome**: Icon library for UI elements

### Data Storage
- **localStorage**: Client-side storage for:
  - User authentication data
  - Car inventory
  - Booking records
  - Admin settings

### File Structure
```
booking-car-app/
├── index.html              # Main application file
├── css/
│   └── style.css          # Custom styles and animations
├── js/
│   ├── app.js             # Main application logic
│   ├── auth.js            # Authentication system
│   ├── booking.js         # Booking management
│   └── admin.js           # Admin panel functionality
├── assets/
│   └── images/            # Car images and assets
└── pages/                 # Additional page templates
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in a web browser
3. Or run a local server:
   ```bash
   # Using Python
   python3 -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

### Default Admin Account
- **Email**: admin@carrent.com
- **Password**: admin123

## Usage Guide

### For Users
1. **Sign Up**: Create a new account with email and password
2. **Browse Cars**: View available cars on the home page
3. **Book a Car**: Select dates and confirm booking
4. **View Profile**: Check booking history and personal details

### For Admins
1. **Login**: Use admin credentials to access admin panel
2. **Manage Cars**: Add new vehicles or update existing ones
3. **View Bookings**: Monitor all customer bookings
4. **Manage Users**: View user accounts and booking statistics

## Key Features Explained

### Authentication System
- Client-side authentication simulation
- Role-based access control (user/admin)
- Session management with localStorage
- Secure password handling (demo purposes)

### Booking System
- Real-time availability checking
- Date validation and conflict prevention
- Price calculation based on duration
- Booking confirmation and history tracking

### Admin Panel
- Protected admin routes
- CRUD operations for cars
- Booking management and status updates
- User management and statistics

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile navigation
- Touch-friendly interface elements
- Optimized layouts for all screen sizes

## Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Notes
- This is a demo application with client-side storage
- In production, implement server-side authentication
- Use HTTPS for secure data transmission
- Implement proper input validation and sanitization
- Add CSRF protection and other security measures

## Future Enhancements
- Real database integration (MySQL/MongoDB)
- Payment gateway integration
- Email notifications
- Advanced search and filtering
- Car comparison feature
- Review and rating system
- Multi-language support

## Support
For support or inquiries:
- **Name**: Sekouti Abdelaziz
- **Phone**: +212612236660
- **Email**: sekoutiabdelaziz0@gmail.com

## License
This project is for demonstration purposes. Feel free to use and modify for educational or commercial use.

---

**Built with ❤️ using HTML5, TailwindCSS, and Vanilla JavaScript**