# Product Hub E-Commerce Store

A modern, full-stack e-commerce application built with React and Vite frontend, and Node.js/Express backend. Browse, search, explore products across categories, and enjoy a personalized shopping experience with user authentication and user-specific cart and saved items.

## Features

- **User Authentication**: Secure login and signup with JWT tokens and password hashing
- **Role-Based Access Control**: Admin and user roles with protected admin routes
- **Admin Dashboard**: Comprehensive admin panel for managing users and viewing activity
- **User-Specific Storage**: Each user's cart and saved items are isolated and persist across sessions
- **Product Listing**: Display all available products with detailed information
- **Product Search**: Search for products in real-time
- **Category Filtering**: Filter products by categories
- **Product Details**: View detailed information for individual products with auto-scroll to top
- **Shopping Cart**: Add products to cart, adjust quantities, and remove items (user-specific)
- **Save Items**: Bookmark favorite products for later viewing (user-specific)
- **Persistent Storage**: User data stored with user ID isolation for privacy and security
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Fast Performance**: Built with Vite for optimal development and production performance
- **Modern UI**: Clean and intuitive user interface with icons from Lucide React
- **Navigation**: Easy navigation between pages (Home, Products, Categories, About, Contact, Saved, Login, Signup, Admin Dashboard)

## Tech Stack

**Frontend:**
- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: Tailwind CSS 4.2.2 with Vite integration
- **HTTP Client**: Axios 1.13.6
- **Routing**: React Router DOM 7.13.2
- **Icons**: Lucide React 1.3.0
- **Notifications**: React Toastify
- **State Management**: React Context API
- **Local Storage**: Browser localStorage for persistent data (user-specific keys)
- **Code Quality**: ESLint with React plugins

**Backend:**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs for password hashing
- **CORS**: Enabled for frontend communication
- **Role-Based Access**: User roles (admin/user) for authorization
- **Admin Features**: Login history tracking and user management

## State Management

The application uses **React Context API** for global state management through the `ShopContext`:

```javascript
// Available context values
{
  // Authentication
  currentUser,         // Currently logged-in user object with role (null if not logged in)
  login,               // Function to login user (saves user & token)
  logout,              // Function to logout user
  
  // Shopping Cart (user-specific)
  cartItems,           // Array of items in cart for current user
  addToCart,           // Add product to cart
  increaseQty,         // Increase product quantity
  decreaseQty,         // Decrease product quantity
  removeFromCart,      // Remove item from cart
  cartCount,           // Total quantity of items in cart
  isInCart,            // Check if product is in cart
  getQtyInCart,        // Get quantity of specific product in cart
  
  // Saved Items (user-specific, wishlist)
  savedItems,          // Array of saved/favorited items for current user
  toggleSave,          // Save/unsave a product
  isSaved              // Check if product is saved
}
```

### User-Specific Storage

Each user's cart and saved items are stored separately in localStorage with user ID-based keys:
- `cart_userId` - User's shopping cart
- `savedItems_userId` - User's saved items

This ensures **complete data isolation** - when a user logs in, they see only their items; when they log out, their items remain saved and are automatically loaded when they log back in.

Data is persisted to localStorage automatically whenever cart or saved items change.

## Features Usage

### Authentication
- **Sign Up**: Create a new account with your full name, email, and password
- **Login**: Sign in with your email and password to access your personalized account
- **Secure**: Passwords are hashed using bcryptjs; authentication uses JWT tokens
- **User Session**: Stay logged in across browser sessions; logout removes your session
- **User-Specific Data**: Each user's cart and saved items are completely isolated

### Shopping Cart
- Click the floating shopping cart button (bottom-left) to open the cart drawer
- View all items in your cart with quantities and prices (user-specific)
- Use +/- buttons to adjust item quantities
- Click the X button to remove items from cart
- The cart badge shows total number of items
- Cart total is calculated automatically
- Cart persists across sessions for logged-in users

### Saved Items
- Click the heart icon on any product card to save it
- Saved items appear in the navbar (shows count)
- View all saved items on the dedicated Saved page
- Saved items persist across sessions for logged-in users
- Your saved items are only visible to you

### Admin Dashboard
- **Admin Access**: Only users with admin role can access the admin dashboard
- **Protected Routes**: Admin dashboard is protected with role-based access control
- **Login History**: View all user login records with timestamps and email addresses
- **Signup Management**: Track all user registrations with creation dates and account information
- **User Management**: View and manage registered users and their information
- **Admin Navigation**: Dedicated admin interface separate from the main user interface
- **Secure Access**: JWT tokens verify admin authorization before granting access

## Project Structure

```
product-hub-ecomm-store/
├── frontend/                       # React frontend application
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx                 # Navigation bar component
│       │   ├── Footer.jsx                 # Footer component
│       │   ├── CartDisplay.jsx            # Shopping cart drawer component
│       │   ├── ProductCard.jsx            # Reusable product card component
│       │   ├── SearchBar.jsx              # Search functionality
│       │   ├── LoadingError.jsx           # Loading and error states
│       │   ├── ProtectedAdminRoute.jsx    # Admin route protection component
│       │   ├── NavbarComponents/          # Navbar sub-components
│       │   ├── CartPanelComponents/       # Cart panel UI components
│       │   ├── HomePageComponents/        # Home page specific components
│       │   ├── ProductsPageComponents/    # Products page specific components
│       │   ├── CategoriesCardComponents/  # Category card components
│       │   └── SingleProductPageComponents/ # Single product detail components
│       ├── context/
│       │   └── ShopContext.jsx            # Global state management (auth + cart + saved items + role)
│       ├── pages/
│       │   ├── Home.jsx                   # Home page
│       │   ├── Products.jsx               # All products page
│       │   ├── SingleProduct.jsx          # Individual product details
│       │   ├── Categories.jsx             # Categories listing page
│       │   ├── CategoryProducts.jsx       # Products by category
│       │   ├── Login.jsx                  # Login page
│       │   ├── Signup.jsx                 # Signup page
│       │   ├── AdminPage.jsx              # Admin dashboard page
│       │   ├── About.jsx                  # About page
│       │   ├── Contact.jsx                # Contact page
│       │   ├── Saved.jsx                  # Saved items page
│       │   └── NotFound.jsx               # 404 page
│       ├── api/
│       │   └── API integration modules
│       ├── App.jsx                        # Main app component with routing
│       ├── main.jsx                       # Application entry point
│       ├── App.css                        # App styles
│       └── index.css                      # Global styles
│
└── auth-backend/                   # Express.js authentication server
    ├── server.js                   # Main server file
    ├── package.json                # Backend dependencies
    ├── src/
    │   ├── app.js                  # Express app with signup/login routes
    │   ├── db/                     # Database configuration
    │   └── models/
    │       ├── signup.model.js     # User schema with role field
    │       └── login.model.js      # Login history schema
```

## API Integration

This application uses the [DummyJSON API](https://dummyjson.com) for data:

- **Get All Products**: Fetches up to 30 products with customizable limits
- **Get Single Product**: Retrieves detailed information for a specific product
- **Search Products**: Searches products by query string
- **Get Categories**: Fetches all available product categories
- **Get Products by Category**: Filters products by selected category

## Installation

### Backend Setup (Authentication Server)

1. Navigate to the auth-backend folder:
   ```bash
   cd auth-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node server.js
   ```
   
   The server will start at `http://localhost:5000` with the following endpoints:
   - `POST http://localhost:5000/api/signup` - Register a new user
   - `POST http://localhost:5000/api/login` - Login user

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building

Build the project for production:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Preview

Preview the production build locally:

```bash
npm run preview
```

## Code Quality

Run ESLint to check for code quality issues:

```bash
npm run lint
```

## Available Routes

**Frontend Routes:**
- `/` - Home page
- `/login` - User login page
- `/signup` - User registration page
- `/products` - All products listing
- `/products/:id` - Single product details (auto-scrolls to top)
- `/categories` - Product categories
- `/category/:slug` - Products filtered by category
- `/saved` - Saved/favorited items page (user-specific)
- `/about` - About page
- `/contact` - Contact page
- `/admin/dashboard` - Admin dashboard (admin-only, protected route)

**Backend API Endpoints:**
- `POST /api/signup` - Register new user
- `POST /api/login` - Login user and receive JWT token
- `GET /api/signup` - Fetch all signup records (admin)
- `GET /api/login` - Fetch all login records (admin)

## Features in Detail

### User Authentication
The application includes a complete authentication system with:
- **Signup**: Create new accounts with email and password
- **Login**: Secure login with JWT token generation
- **Password Security**: Passwords are hashed using bcryptjs before storage
- **Session Management**: Tokens stored in localStorage for persistent sessions
- **User Isolation**: Each user's data is completely isolated from others
- **Role-Based Access**: Admin and user roles for authorization

### Admin Dashboard
The admin dashboard is a powerful management tool with:
- **Admin-Only Access**: Protected route that only users with admin role can access
- **Role-Based Authentication**: JWT tokens verify admin authorization
- **Login History**: View all user login records with timestamps and email addresses
- **Signup Management**: Track all user registrations with full details and creation dates
- **User Management**: View comprehensive information about all registered users
- **Data Overview**: Get insights into user activity and account creation patterns
- **Secure Interface**: Separate admin interface isolated from regular user features

### Product Search
The search bar allows users to find products quickly by typing keywords. Results are displayed in real-time.

### Category Browsing
Users can explore products organized by categories, making it easier to find what they're looking for.

### Product Details
Each product page displays comprehensive information including:
- Multiple product images with thumbnail selection
- Price and discount information
- Product ratings and customer reviews
- Stock availability
- Warranty, shipping, and return policy information
- **Auto-scroll to top** - Page automatically scrolls to the top when opened

### Shopping Cart
A persistent shopping cart stored in localStorage allows users to:
- Add/remove products
- Adjust quantities
- View cart total automatically calculated
- Data is user-specific (each user has their own cart)
- Cart persists across sessions for logged-in users
- Checkout button for future payment integration

### Saved Items (Wishlist)
Users can save their favorite products to view later:
- Save/unsave products with one click
- Dedicated saved items page
- Persistent storage across sessions (user-specific)
- Badge showing number of saved items
- Complete data isolation between users

### Responsive Layout
The application adapts perfectly to different screen sizes, from mobile phones to desktop computers.

## Browser Support

This application works on all modern browsers that support ES6+.

## Future Enhancements

- **User authentication and accounts** (Implemented)
- **User-specific cart and saved items** (Implemented)
- **Product auto-scroll on page load** (Implemented)
- **Admin dashboard with role-based access** (Implemented)
- **Login and signup history tracking** (Implemented)
- Advanced product filters and sorting options
- Product reviews and ratings submission
- Checkout and payment integration (Stripe/PayPal)
- Order history and tracking
- Product recommendations based on browsing history
- Dark mode support
- Multi-language support
- Email verification during signup
- Password reset functionality
- User profile management and editing
- Wishlist sharing with other users
- Product comparison feature
- Enhanced admin dashboard with analytics and reports
- Inventory management for products
- Discount and coupon management system

## License

This project is free to use and modify.

## Author

Rafay Ali Saleem.

**Happy Coding!**
