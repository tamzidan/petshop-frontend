# ENHA PETSHOP - Modern Pet Shop E-Commerce

A modern, full-featured pet shop e-commerce platform built with React, TypeScript, and Tailwind CSS. This application provides a complete solution for pet adoption, pet product shopping, and pet service booking with a beautiful yellow-themed dark UI.

![Tech Stack](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-cyan)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)

## Features

### Core Features
- **Pet Adoption System**: Browse and view detailed information about pets available for adoption
- **E-Commerce Store**: Shop for pet products with full cart functionality
- **Service Booking**: Book professional pet services (grooming, vet care, etc.)
- **User Authentication**: Secure login and registration system
- **Shopping Cart**: Add products to cart, manage quantities, and checkout
- **User Profile Management**: Update personal information and manage account
- **Booking Management**: View and track service bookings
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)

### Admin Features
- **Admin Dashboard**: Comprehensive overview of platform statistics
- **Pet Management**: Create, read, update, and delete pet listings
- **Product Management**: Full CRUD operations for products
- **Service Management**: Manage available services
- **Booking Management**: View and manage all service bookings

### UI/UX Features
- **Beautiful Yellow Theme**: Vibrant yellow (#FBBF24) and dark color scheme
- **Smooth Animations**: Engaging transitions and hover effects
- **Loading States**: Elegant loading spinners for better UX
- **Error Handling**: User-friendly error messages with toast notifications
- **Form Validation**: Client-side validation using Zod and React Hook Form
- **Protected Routes**: Secure admin and user-only pages
- **404 Page**: Custom not found page

## Tech Stack

### Frontend Framework
- **React 19.1.1** - Latest React with modern features
- **TypeScript 5.9.3** - Type-safe development
- **Vite 7.1.7** - Lightning-fast development and build tool

### UI & Styling
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Lucide React 0.545.0** - Beautiful icon library
- **Custom Yellow Theme** - Branded color palette

### State Management & Data Fetching
- **Zustand 5.0.8** - Lightweight state management
- **Axios 1.12.2** - HTTP client for API requests
- **React Router DOM 7.9.3** - Client-side routing

### Form Handling & Validation
- **React Hook Form 7.64.0** - Performant form management
- **Zod 4.1.12** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.2** - Form validation integration

### User Experience
- **React Hot Toast 2.6.0** - Beautiful toast notifications

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixing

## Prerequisites

- **Node.js**: v16.0.0 or higher (recommended: v20.19.5)
- **npm**: v7.0.0 or higher
- **Backend API**: Laravel backend running on `http://localhost:8000`

## Installation

1. **Clone the repository** (if not already done):
```bash
git clone <repository-url>
cd petshop-frontend
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**Note**: Adjust the API URL if your backend runs on a different port or domain.

## Running the Application

### Development Server

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
petshop-frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, and other assets
│   ├── components/        # Reusable UI components
│   │   ├── Card.tsx       # Reusable card component
│   │   ├── Footer.tsx     # Footer component
│   │   ├── LoadingSpinner.tsx  # Loading indicator
│   │   ├── Navbar.tsx     # Navigation bar
│   │   └── ProtectedRoute.tsx  # Route protection wrapper
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin panel pages
│   │   │   ├── Bookings.tsx    # Admin bookings management
│   │   │   ├── Dashboard.tsx   # Admin dashboard
│   │   │   ├── Pets.tsx        # Admin pet management
│   │   │   ├── Products.tsx    # Admin product management
│   │   │   └── Services.tsx    # Admin service management
│   │   ├── About.tsx      # About page
│   │   ├── Bookings.tsx   # User bookings page
│   │   ├── Cart.tsx       # Shopping cart page
│   │   ├── Contact.tsx    # Contact page
│   │   ├── Home.tsx       # Homepage
│   │   ├── Login.tsx      # Login page
│   │   ├── NotFound.tsx   # 404 page
│   │   ├── PetDetail.tsx  # Individual pet details
│   │   ├── Pets.tsx       # Pet listing page
│   │   ├── ProductDetail.tsx   # Individual product details
│   │   ├── Products.tsx   # Product listing page
│   │   ├── Profile.tsx    # User profile page
│   │   ├── Register.tsx   # Registration page
│   │   ├── ServiceDetail.tsx   # Individual service details
│   │   └── Services.tsx   # Service listing page
│   ├── services/          # API service layer
│   │   └── api.ts         # API client and endpoints
│   ├── store/             # Zustand state management
│   │   ├── authStore.ts   # Authentication state
│   │   └── cartStore.ts   # Shopping cart state
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Shared types and interfaces
│   ├── App.tsx            # Main app component
│   ├── App.css            # App-specific styles
│   ├── index.css          # Global styles and Tailwind imports
│   └── main.tsx           # Application entry point
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # TypeScript app configuration
├── tsconfig.node.json    # TypeScript node configuration
└── vite.config.ts        # Vite configuration
```

## Available Routes

### Public Routes
- `/` - Homepage with featured pets, products, and services
- `/pets` - Browse all available pets
- `/pets/:id` - View individual pet details
- `/products` - Browse all products
- `/products/:id` - View individual product details
- `/services` - Browse all services
- `/services/:id` - View individual service details
- `/cart` - Shopping cart
- `/about` - About page
- `/contact` - Contact page
- `/login` - User login
- `/register` - User registration

### Protected Routes (Authenticated Users)
- `/profile` - User profile management
- `/bookings` - View user bookings

### Admin Routes (Admin Users Only)
- `/admin` - Admin dashboard
- `/admin/pets` - Manage pets
- `/admin/products` - Manage products
- `/admin/services` - Manage services
- `/admin/bookings` - Manage all bookings

## Admin Credentials

To access the admin panel, use the following default credentials (seeded from backend):

```
Email: admin@example.com
Password: password
```

**Important**: Change these credentials in production!

## Environment Variables

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |

## Color Theme Documentation

### Primary Yellow Theme

The application uses a custom yellow color palette based on Tailwind's yellow scale:

```javascript
primary: {
  50: '#fefce8',   // Lightest - backgrounds
  100: '#fef9c3',  // Very light
  200: '#fef08a',  // Light - gradients
  300: '#fde047',  // Light medium - gradients
  400: '#facc15',  // Medium - main brand color
  500: '#eab308',  // Medium dark - main brand color
  600: '#ca8a04',  // Dark - hover states
  700: '#a16207',  // Darker
  800: '#854d0e',  // Very dark
  900: '#713f12',  // Darkest
  950: '#422006',  // Almost black
}
```

### Main Brand Colors
- **Primary Brand**: `#FBBF24` (primary-400) and `#EAB308` (primary-500)
- **Gradients**: Combinations of primary-200, primary-300, primary-400, and primary-500
- **Backgrounds**: primary-50 for light sections, white for alternating sections
- **Text**: Gray scale (gray-600, gray-800) for readability

### Dark Theme Elements
- Footer and certain sections use dark backgrounds
- White text on dark backgrounds for contrast
- Yellow accents on dark backgrounds

## Key Features Highlights

### 1. State Management with Zustand
- **Auth Store**: Manages user authentication state, login/logout, and token persistence
- **Cart Store**: Handles shopping cart with local storage persistence

### 2. Type Safety
- Full TypeScript implementation
- Comprehensive type definitions for all entities (Pet, Product, Service, User, etc.)
- Type-safe API calls and state management

### 3. Form Validation
- React Hook Form for performant form handling
- Zod schema validation for type-safe validation
- Real-time error feedback

### 4. API Integration
- Centralized API service layer
- Axios interceptors for authentication
- Proper error handling and loading states

### 5. Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts that adapt to screen size

### 6. Performance Optimizations
- Code splitting with React Router
- Lazy loading of images
- Optimized builds with Vite
- Efficient state updates with Zustand

## API Endpoints Used

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/user` - Get authenticated user

### Pets
- `GET /pets` - Get all pets
- `GET /pets/:id` - Get pet details
- `POST /pets` - Create pet (admin)
- `PUT /pets/:id` - Update pet (admin)
- `DELETE /pets/:id` - Delete pet (admin)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (admin)
- `PUT /products/:id` - Update product (admin)
- `DELETE /products/:id` - Delete product (admin)

### Services
- `GET /services` - Get all services
- `GET /services/:id` - Get service details
- `POST /services` - Create service (admin)
- `PUT /services/:id` - Update service (admin)
- `DELETE /services/:id` - Delete service (admin)

### Bookings
- `GET /bookings` - Get user bookings
- `POST /bookings` - Create booking
- `GET /admin/bookings` - Get all bookings (admin)
- `PUT /admin/bookings/:id` - Update booking status (admin)

### Cart & Orders
- `POST /cart/add` - Add item to cart
- `POST /orders` - Create order from cart

## Future Improvements

### Planned Features
- [ ] Payment gateway integration (Midtrans, Stripe)
- [ ] Real-time notifications for bookings
- [ ] Advanced search and filtering
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking system
- [ ] Email notifications
- [ ] Social media sharing
- [ ] Multi-language support (i18n)
- [ ] Dark mode toggle

### Technical Improvements
- [ ] Unit and integration testing (Vitest, React Testing Library)
- [ ] E2E testing (Playwright, Cypress)
- [ ] Progressive Web App (PWA) support
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Error boundary implementation
- [ ] Accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Performance monitoring
- [ ] Image optimization and lazy loading
- [ ] Service worker for offline support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@enhapetshop.com or open an issue on GitHub.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Vite for the blazing-fast build tool
- All open-source contributors

---

**Built with ❤️ by the ENHA PETSHOP Team**
#   p e t s h o p - f r o n t e n d 
 
 
