# Todo App - Context API with Local Storage

A modern, responsive Todo application built with React, Context API for state management, and Tailwind CSS for styling. All todos are persisted in the browser's local storage for offline access.

## Features

- **Add Todos** - Create new todo items with ease
- **Edit Todos** - Update existing todo items
- **Delete Todos** - Remove unwanted todos
- **Mark Complete** - Toggle completion status with a click
- **Local Storage Persistence** - All todos are automatically saved to browser storage
- **Modern UI** - Clean, responsive design with Tailwind CSS
- **Fast & Lightweight** - Built with Vite for optimal performance
- **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Storage:** Browser Local Storage
- **Development Tools:** ESLint

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd todo-app-context-local
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another available port)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx      # Form component for adding/editing todos
│   ├── TodoItem.jsx      # Individual todo item component
│   └── index.js          # Component exports
├── context/
│   ├── TodoContext.js    # Context and custom hooks for todo state
│   └── index.js          # Context exports
├── App.jsx               # Main application component
├── App.css               # Application styles
├── main.jsx              # React DOM entry point
└── index.css             # Global styles
```

## Usage

### Adding a Todo
1. Click on the input field at the top
2. Enter your todo text
3. Press Enter or click the Add button
4. Your todo appears at the top of the list

### Completing a Todo
- Click the checkbox next to any todo to mark it as completed
- Completed todos will be visually distinguished

### Editing a Todo
- Click the edit button on a todo item
- Modify the text in the form
- Click update to save changes

### Deleting a Todo
- Click the delete button (trash icon) on any todo item
- The todo will be removed from your list

## Data Persistence

All your todos are automatically saved to your browser's local storage. This means:
- Your todos persist even after closing the browser
- No server or database required
- Data is stored locally on your device
- Clear browser data/cache will remove saved todos

## Available Scripts

- `npm run dev` - Start development server with hot module reload
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Styling

This project uses **Tailwind CSS** for styling, providing:
- Utility-first CSS approach
- Responsive design utilities
- Dark mode support (customizable)
- Fast load times with optimized CSS

## Development

### Code Quality

The project uses ESLint for code quality:
```bash
npm run lint
```

### Key Technologies

- **React Hooks:** `useState`, `useEffect`, `useContext`
- **Context API:** Global state management without Redux
- **Local Storage API:** Persistent data storage
- **Vite HMR:** Hot module replacement for fast development

## Performance Optimizations

- Vite for fast build and development server
- Tailwind CSS for lightweight styling
- Context API instead of Redux for simpler state management
- Local storage for offline-first functionality

## Notes

- The app uses UUID or similar unique identifiers for todo items (handled in TodoForm)
- Completed todos maintain their position in the list
- The app is fully functional without an internet connection
- All state is client-side; no backend API required

## Contributing

Feel free to fork this project and create pull requests for any improvements or new features.

## License

This project is open source and available for personal use.

## Author

Rafay Ali

**Happy Coding!**