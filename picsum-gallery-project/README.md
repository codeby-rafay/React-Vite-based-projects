# The Picsum - Gallery Project

A beautiful, responsive image gallery application built with React and Vite. This project fetches and displays stunning images from the Picsum.photos API with smooth pagination and interactive hover effects.

## Features

- **Dynamic Image Gallery** - Fetches images from Picsum.photos API
- **Responsive Design** - Grid layout adapts to different screen sizes (2-5 columns)
- **Pagination** - Navigate through image pages with Previous/Next buttons
- **Loading States** - Smooth loading animation while fetching data
- **Interactive Hover Effects** - Displays image metadata on hover
- **Dark Theme** - Modern dark interface with amber accents
- **Fast Build Tool** - Built with Vite for quick development

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.0
- **Styling**: Tailwind CSS 4.2.1
- **HTTP Client**: Axios 1.13.6
- **Font**: Playfair Display (serif) for elegant typography

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd gallery-project
```

2. Install dependencies:
```bash
npm install
```

### Running the Project

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or the next available port).

### Building for Production

```bash
npm run build
```

The optimized build will be generated in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx              # Main app component with gallery logic
├── main.jsx             # React entry point
├── index.css            # Global styles
├── App.css              # App-specific styles
└── components/
    ├── Card.jsx         # Individual image card component
    ├── Prev_button.jsx  # Previous page button
    └── Next_button.jsx  # Next page button
```

## How It Works

1. **API Integration**: Uses Axios to fetch images from `https://picsum.photos/v2/list`
2. **State Management**: Manages current page index and user data using React hooks
3. **Grid Display**: Displays 10 images per page in a responsive grid
4. **Pagination**: Navigate between pages with Previous/Next buttons and page indicators
5. **Loading UX**: Shows animated dots while data is being fetched

## Features Breakdown

### Image Card Component
- Displays image with smooth hover zoom effect
- Shows author name and dimensions on hover
- Links directly to the image source
- Staggered fade-in animation for visual appeal

### Navigation
- Previous/Next buttons for easy page navigation
- Page indicator showing current page
- Quick page selection buttons (-1, current, +1)
- Disabled previous button on page 1

### Header
- Project branding and title
- Current page indicator
- Elegant serif typography

## Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Performance Optimizations

- Vite's HMR (Hot Module Replacement) for instant updates
- Lazy image loading with CSS optimization
- Efficient state management with React hooks
- Tailwind CSS for optimized stylesheet generation

## Future Enhancements

- Add image search/filter functionality
- Implement favorites/bookmarking
- Add lightbox/modal for full-size image view
- Infinite scroll instead of pagination
- Dark/Light theme toggle
- Image sharing functionality

## License

This project is part of a learning portfolio and is open for educational purposes.

## Author

Created as a React learning project demonstrating component composition, API integration, and modern UI design patterns.
