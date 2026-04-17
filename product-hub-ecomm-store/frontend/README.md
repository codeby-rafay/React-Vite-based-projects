# Product Hub

A modern, responsive e-commerce product listing application built with React and Vite. Browse, search, and explore products across different categories using real-time data from the DummyJSON API.

## Features

- **Product Listing**: Display all available products with detailed information
- **Product Search**: Search for products in real-time
- **Category Filtering**: Filter products by categories
- **Product Details**: View detailed information for individual products
- **Shopping Cart**: Add products to cart, adjust quantities, and remove items
- **Save Items**: Bookmark favorite products for later viewing
- **Persistent Storage**: Cart and saved items are stored in localStorage
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Fast Performance**: Built with Vite for optimal development and production performance
- **Modern UI**: Clean and intuitive user interface with icons from Lucide React
- **Navigation**: Easy navigation between pages (Home, Products, Categories, About, Contact, Saved)

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: Tailwind CSS 4.2.2 with Vite integration
- **HTTP Client**: Axios 1.13.6
- **Routing**: React Router DOM 7.13.2
- **Icons**: Lucide React 1.3.0
- **State Management**: React Context API
- **Local Storage**: Browser localStorage for persistent data
- **Code Quality**: ESLint with React plugins

## State Management

The application uses **React Context API** for global state management through the `ShopContext`:

```javascript
// Available context values
{
  cartItems,       // Array of items in cart
  addToCart,       // Add product to cart
  increaseQty,     // Increase product quantity
  decreaseQty,     // Decrease product quantity
  removeFromCart,  // Remove item from cart
  cartCount,       // Total quantity of items in cart
  isInCart,        // Check if product is in cart
  getQtyInCart,    // Get quantity of specific product in cart
  savedItems,      // Array of saved/favorited items
  toggleSave,      // Save/unsave a product
  isSaved          // Check if product is saved
}
```

Both cart and saved items are persisted to localStorage, enabling data retention across sessions.

## Features Usage

### Shopping Cart
- Click the floating shopping cart button (bottom-left) to open the cart drawer
- View all items in your cart with quantities and prices
- Use +/- buttons to adjust item quantities
- Click the X button to remove items from cart
- The cart badge shows total number of items
- Cart total is calculated automatically

### Saved Items
- Click the heart icon on any product card to save it
- Saved items appear in the navbar (shows count)
- View all saved items on the dedicated Saved page
- Saved items persist across sessions

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx                 # Navigation bar component
│   ├── Footer.jsx                 # Footer component
│   ├── CartDisplay.jsx            # Shopping cart drawer component
│   ├── ProductCard.jsx            # Reusable product card component
│   ├── SearchBar.jsx              # Search functionality
│   ├── LoadingError.jsx           # Loading and error states
│   ├── NavbarComponents/          # Navbar sub-components
│   ├── CartDisplayComponents/     # Cart-related components (CheckoutBtn, CartItems, etc.)
│   ├── CartPanelComponents/       # Cart panel UI components
│   ├── HomePageComponents/        # Home page specific components
│   ├── ProductsPageComponents/    # Products page specific components
│   ├── CategoriesCardComponents/  # Category card components
│   └── SingleProductPageComponents/ # Single product detail components
├── context/
│   └── ShopContext.jsx            # Global state management for cart and saved items
├── pages/
│   ├── Home.jsx                   # Home page
│   ├── Products.jsx               # All products page
│   ├── SingleProduct.jsx          # Individual product details
│   ├── Categories.jsx             # Categories listing page
│   ├── CategoryProducts.jsx       # Products by category
│   ├── About.jsx                  # About page
│   ├── Contact.jsx                # Contact page
│   └── Saved.jsx                  # Saved items page
├── api/
│   └── API integration modules
├── App.jsx                        # Main app component with routing
├── main.jsx                       # Application entry point
├── App.css                        # App styles
└── index.css                      # Global styles
```

## API Integration

This application uses the [DummyJSON API](https://dummyjson.com) for data:

- **Get All Products**: Fetches up to 30 products with customizable limits
- **Get Single Product**: Retrieves detailed information for a specific product
- **Search Products**: Searches products by query string
- **Get Categories**: Fetches all available product categories
- **Get Products by Category**: Filters products by selected category

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd product-hub
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

- `/` - Home page
- `/products` - All products listing
- `/products/:id` - Single product details
- `/categories` - Product categories
- `/category/:slug` - Products filtered by category
- `/saved` - Saved/favorited items page
- `/about` - About page
- `/contact` - Contact page

## Features in Detail

### Product Search
The search bar allows users to find products quickly by typing keywords. Results are displayed in real-time.

### Category Browsing
Users can explore products organized by categories, making it easier to find what they're looking for.

### Product Details
Each product page displays comprehensive information including price, description, images, ratings, and specifications.

### Shopping Cart
A persistent shopping cart stored in localStorage allows users to:
- Add/remove products
- Adjust quantities
- View cart total automatically calculated
- Checkout button for future payment integration

### Saved Items (Wishlist)
Users can save their favorite products to view later:
- Save/unsave products with one click
- Dedicated saved items page
- Persistent storage across sessions
- Badge showing number of saved items

### Responsive Layout
The application adapts perfectly to different screen sizes, from mobile phones to desktop computers.

## Browser Support

This application works on all modern browsers that support ES6+.

## Future Enhancements

- User authentication and accounts
- Product filters and advanced sorting options
- Product reviews and ratings display
- Checkout and payment integration
- Order history and tracking
- Product recommendations based on browsing history
- Dark mode support
- Multi-language support
- Payment gateway integration

## License

This project is free to use and modify.

## Author

Rafay Ali Saleem.

**Happy Coding!**
