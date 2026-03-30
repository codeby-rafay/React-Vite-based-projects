# Peinture Paris - React Landing Page

A modern, responsive React-based single-page application (SPA) for Peinture Paris, a paint and art business. This website showcases products, services, features, and customer feedback with a professional and engaging user interface.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Features](#project-features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Component Overview](#component-overview)
- [Styling](#styling)
- [Contributing](#contributing)

## Overview

Peinture Paris Website is a production-ready React landing page designed to provide an excellent user experience. It features multiple sections including:

- **Navigation & Branding** - Responsive navbar for seamless navigation
- **Hero Section** - Compelling home page with call-to-action
- **Features Showcase** - Highlight key business features
- **Products Grid** - Display paint products and offerings
- **Customer Testimonials** - Build trust with feedback section
- **Statistics** - Showcase business metrics and achievements
- **FAQ Section** - Answer common customer questions
- **Special Offers** - Promotional deals and discounts
- **Contact & Footer** - Get in touch and footer information

## Technologies Used

- **React 19.2.4** - UI library for building interactive components
- **React-DOM 19.2.4** - React package for working with the DOM
- **React-Scripts 5.0.1** - Build scripts and configuration
- **CSS3** - Custom styling and responsive design
- **Create React App** - Project setup and build tooling
- **Testing Library** - React testing utilities

## Project Features

- **Fully Responsive Design** - Works seamlessly across all device sizes
- **Component-Based Architecture** - Modular and maintainable code structure
- **Fast Performance** - Optimized for production builds
- **Modern UI/UX** - Professional and engaging interface
- **Easy Navigation** - Intuitive user navigation
- **SEO-Friendly** - Proper structure for search engine optimization

## Project Structure

```
peniture-paris-website/
├── public/
│   ├── index.html          # Main HTML file
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO robots file
├── src/
│   ├── components/         # React components
│   │   ├── Contact.jsx
│   │   ├── FAQ.jsx
│   │   ├── FeatureCard.jsx
│   │   ├── Features.jsx
│   │   ├── Feedback.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Navbar.jsx
│   │   ├── Offer.jsx
│   │   ├── ProductsGrid.jsx
│   │   ├── Projects.jsx
│   │   └── Stats.jsx
│   ├── assets/             # Static assets (images, icons, etc.)
│   ├── App.js              # Main App component
│   ├── App.css             # Global styles
│   ├── index.js            # React entry point
│   ├── index.css           # Base styles
│   └── reportWebVitals.js  # Performance metrics
├── package.json            # Project dependencies & scripts
├── README.md               # This file
└── .gitignore

```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd peniture-paris-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open in browser**
   The application will open at [http://localhost:3000](http://localhost:3000)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

- Opens [http://localhost:3000](http://localhost:3000) in your browser
- Page reloads on code changes
- Displays lint errors in the console

### `npm run build`

Builds the app for production in the `build` folder.

- Correctly bundles React in production mode
- Optimizes the build for best performance
- Build is minified and filenames include hashes

### `npm test`

Launches the test runner in interactive watch mode.

- Run tests using testing-library and jest-dom
- Useful for validating component functionality

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

- Exposes all configuration files and dependencies
- Full control over webpack, babel, and ESLint config

## Component Overview

| Component        | Purpose                                                     |
| ---------------- | ----------------------------------------------------------- |
| **Navbar**       | Navigation bar with brand logo and menu links               |
| **Home**         | Hero section with introductory content                      |
| **Features**     | Highlight key business features with FeatureCard components |
| **ProductsGrid** | Display available paint products                            |
| **Stats**        | Showcase business statistics and achievements               |
| **Projects**     | Display completed projects and portfolio                    |
| **Feedback**     | Customer testimonials and reviews                           |
| **Offer**        | Special deals and promotional offers                        |
| **FAQ**          | Frequently asked questions section                          |
| **Contact**      | Contact information and get in touch section                |
| **Footer**       | Footer with links and copyright info                        |

## Styling

The project uses:

- **App.css** - Global application styles
- **index.css** - Base/reset styles
- **Inline styles** - Component-specific styling where needed

All styles are responsive and optimized for mobile-first design approach.

## Performance & Testing

- **Testing Library** - React component testing
- **Web Vitals** - Performance monitoring
- **ESLint** - Code quality checking

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is private. All rights reserved.

## Support

For questions or support, please contact.

---

**Happy Coding!**
