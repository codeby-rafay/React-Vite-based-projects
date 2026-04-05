# Product Hub

A modern, responsive e-commerce product listing application built with React and Vite. Browse, search, and explore products across different categories using real-time data from the DummyJSON API.

## Features

- **Product Listing**: Display all available products with detailed information
- **Product Search**: Search for products in real-time
- **Category Filtering**: Filter products by categories
- **Product Details**: View detailed information for individual products
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Fast Performance**: Built with Vite for optimal development and production performance
- **Modern UI**: Clean and intuitive user interface with icons from Lucide React
- **Navigation**: Easy navigation between pages (Home, Products, Categories, About, Contact)

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: Tailwind CSS 4.2.2 with Vite integration
- **HTTP Client**: Axios 1.13.6
- **Routing**: React Router DOM 7.13.2
- **Icons**: Lucide React 1.3.0
- **Code Quality**: ESLint with React plugins

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx                 # Navigation bar component
│   ├── Footer.jsx                 # Footer component
│   ├── ProductCard.jsx            # Reusable product card component
│   ├── SearchBar.jsx              # Search functionality
│   ├── LoadingError.jsx           # Loading and error states
│   ├── HomePageComponents/        # Home page specific components
│   ├── ProductsPageComponents/    # Products page specific components
│   ├── CategoriesCardComponents/  # Category card components
│   └── SingleProductPageComponents/ # Single product detail components
├── pages/
│   ├── Home.jsx                   # Home page
│   ├── Products.jsx               # All products page
│   ├── SingleProduct.jsx          # Individual product details
│   ├── Categories.jsx             # Categories listing page
│   ├── CategoryProducts.jsx       # Products by category
│   ├── About.jsx                  # About page
│   └── Contact.jsx                # Contact page
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
- `/categories/:category` - Products filtered by category
- `/about` - About page
- `/contact` - Contact page

## Features in Detail

### Product Search
The search bar allows users to find products quickly by typing keywords. Results are displayed in real-time.

### Category Browsing
Users can explore products organized by categories, making it easier to find what they're looking for.

### Product Details
Each product page displays comprehensive information including price, description, images, ratings, and specifications.

### Responsive Layout
The application adapts perfectly to different screen sizes, from mobile phones to desktop computers.

## Browser Support

This application works on all modern browsers that support ES6+.

## Future Enhancements

- Shopping cart functionality
- User authentication and accounts
- Product filters and sorting options
- Product reviews and ratings
- Wishlist feature
- Payment gateway integration

## License

This project is free to use and modify.

## Author

Rafay Ali Saleem.

**Happy Coding!**
