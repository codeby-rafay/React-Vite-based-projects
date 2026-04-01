# Notes App

A simple and elegant note-taking application built with React and Vite. Create, view, and manage your notes with a beautiful sticky note-styled interface.

## Features

- **Create Notes** - Add notes with a headline and detailed content
- **View Notes** - Display all notes in a stylish sticky note format
- **Delete Notes** - Remove notes you no longer need
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Fast Performance** - Built with Vite for optimal speed

## Tech Stack

- **React 19** - UI library for building user interfaces
- **Vite** - Next generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework for styling
- **ESLint** - Code quality and consistency

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd notes-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode
Run the development server with hot module replacement:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

#### Build for Production
Create an optimized production build:
```bash
npm run build
```

#### Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

#### Lint Code
Check code quality and consistency:
```bash
npm run lint
```

## How to Use

1. **Add a Note:**
   - Enter a headline in the "Note Headline" input field
   - Type your note content in the "Enter a note" textarea
   - Click the "Add Note" button to create the note

2. **View Notes:**
   - All created notes appear on the right side (or below on mobile)
   - Notes are displayed as sticky note cards with the headline and details

3. **Delete Notes:**
   - Click the "Delete" button on any note card to remove it

## Project Structure

```
notes-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│   └── assets/          # Static assets
├── public/              # Public static files
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
└── eslint.config.js     # ESLint configuration
```

## Key Components

### App Component
The main component that manages:
- Note creation with form submission
- Note state management using React hooks
- Note deletion functionality
- UI layout with Tailwind CSS

## Styling

The application uses **Tailwind CSS** for styling with:
- Dark theme (black background, white text)
- Responsive grid layout
- Sticky note background images
- Smooth interactions and hover effects

## Browser Support

Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Future Enhancements

Possible improvements for future versions:
- Local storage to persist notes
- Search and filter notes
- Add tags and categories
- Customize note colors
- Export notes functionality
- Dark/Light mode toggle

## License

This project is open source and available for personal and educational use.

## Author

Rafay Ali Saleem

Created as a React learning project.

**Happy Coding**
