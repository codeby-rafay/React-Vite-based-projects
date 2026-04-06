# Shopping Cart Application

A modern, interactive shopping cart application built with React. This project demonstrates state management, component composition, and dynamic UI updates with real-time cart calculations.

## Features

- **Product Management** - Browse and manage a list of products with prices
- **Quantity Control** - Increment or decrement product quantities with a single click
- **Real-time Calculations** - Automatic total amount calculation based on cart contents
- **Add Items** - Dynamically add new products to the shopping cart
- **Remove Items** - Remove items from the cart completely
- **Reset Cart** - Clear all quantities and reset the total amount to zero
- **Responsive Design** - Clean, user-friendly interface

## Project Structure

```
src/
├── components/
│   ├── Navbar.js        # Top navigation bar
│   ├── ProductList.js   # Product listing container
│   ├── Product.js       # Individual product component
│   ├── AddItem.js       # Form to add new products
│   └── Footer.js        # Footer section
├── App.js              # Main App component with state management
├── App.css             # Application styles
├── index.js            # React entry point
└── index.css           # Global styles
```

## Technologies Used

- **React 19.2.4** - JavaScript library for building user interfaces
- **React DOM 19.2.4** - React rendering engine for the browser
- **React Scripts 5.0.1** - Build and configuration tool
- **CSS** - Custom styling

## Getting Started

### Prerequisites

- JavaScript
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
   ```
   cd shopping-cart
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

Start the development server:
```
npm start
```

The application will automatically open in your browser at http://localhost:3000. The page will reload when you make changes.

## Available Scripts

### 
npm start
Runs the app in development mode. Open http://localhost:3000 to view it in your browser.

### 
npm test
Launches the test runner in interactive watch mode.

### 
npm run build
Builds the app for production to the Build folder. The build is optimized for the best performance.

## How to Use

1. **View Products** - The main page displays available products with their prices
2. **Add to Cart** - Click the increment button to add items to your cart
3. **Adjust Quantity** - Use increment/decrement buttons to change product quantities
4. **Check Total** - The total amount updates automatically as you modify quantities
5. **Add New Items** - Use the AddItem component to dynamically add new products
6. **Remove Items** - Delete unwanted products from the cart
7. **Reset Cart** - Clear the entire cart and reset the total to zero

## Key Components

- **Navbar** - Displays cart information and navigation
- **ProductList** - Container for all product items
- **Product** - Individual product with quantity controls
- **AddItem** - Form interface for adding new products to inventory
- **Footer** - Application footer with additional information

## Future Enhancements

- Product filtering and search functionality
- Shopping cart persistence (localStorage)
- Product categories
- User authentication
- Order checkout process
- Product reviews and ratings
- Payment integration

## Learning Outcomes

This project is great for learning:
- React Hooks (useState)
- Component composition
- State management and lifting state up
- Event handling in React
- Array manipulation for dynamic lists
- CSS styling with React

## License

This project is open source.

## Purpose

Created as part of React learning journey.

## Author

Rafay Ali Saleem

**Happy Coding!**