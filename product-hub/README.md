# Product Hub

A modern, responsive e-commerce web application built with React and Vite. Product Hub allows users to browse products, view detailed information, search by categories, and explore different product offerings through an intuitive user interface.

## Features

- **Browse Products**: View a comprehensive catalog of products from the DummyJSON API
- **Search & Filter**: Search for products and browse by categories
- **Product Details**: View detailed information about individual products
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Fast Performance**: Built with Vite for optimized development and production builds
- **Client-side Routing**: Seamless navigation between pages with React Router

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Routing**: React Router DOM 7.13.2
- **Styling**: Tailwind CSS 4.2.2
- **HTTP Client**: Axios 1.13.6
- **Linting**: ESLint 9.39.4

## Project Structure

```
product-hub/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── LoadingError.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── SearchBar.jsx
│   ├── pages/               # Page components
│   │   ├── About.jsx
│   │   ├── Categories.jsx
│   │   ├── CategoryProducts.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   └── SingleProduct.jsx
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   ├── index.css            # Base styles
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Installation

1. **Clone or navigate to the project directory**:

   ```bash
   cd product-hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Development

Start the development server with hot module reloading (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building

Create an optimized production build:

```bash
npm run build
```

The build output will be generated in the `dist/` directory.

## Preview

Preview the production build locally:

```bash
npm run preview
```

## Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Available Pages

- **Home** (`/`): Landing page with featured products and navigation
- **Products** (`/products`): Full product catalog with search and filtering
- **Product Details** (`/product/:id`): Detailed view of a single product
- **Categories** (`/categories`): Browse products by category
- **Category Products** (`/category/:category`): View all products in a selected category
- **About** (`/about`): Information about the store
- **Contact** (`/contact`): Contact form and information

## API Integration

This project uses the **DummyJSON API** for product data:

- Base URL: `https://dummyjson.com`
- Endpoints used:
  - GET `/products` - Fetch all products
  - GET `/products/:id` - Fetch a single product
  - GET `/products/search?q=query` - Search products
  - Other product-related endpoints

## Components

### Navbar

Navigation bar with links to all pages and search functionality

### ProductCard

Displays individual product information with image, price, and rating

### SearchBar

Allows users to search for products across the catalog

### Footer

Footer component with links and information

### LoadingError

Handle loading states and error messages

## Tailwind CSS Configuration

The project uses Tailwind CSS for styling with the `@tailwindcss/vite` plugin for optimized builds.

## ESLint Configuration

The project includes ESLint configuration for code quality with React-specific rules.

## Future Enhancements

- Add shopping cart functionality
- Implement user authentication
- Add product reviews and ratings
- Implement filters and sorting options
- Add wishlist feature
- Integrate payment gateway

## License

This project is open-source and available for educational purposes.

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

**Happy Coding!**
