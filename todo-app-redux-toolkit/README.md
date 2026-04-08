# Todo App Redux Toolkit

A modern, feature-rich todo application built with **React 19**, **Redux Toolkit**, and **Tailwind CSS**. This project demonstrates state management best practices using Redux Toolkit and provides a beautiful, responsive user interface for managing your daily tasks.

## Features

- **Add Todos** - Quickly add new tasks with a clean input interface
- **Edit Todos** - Update existing tasks in-line
- **Delete Todos** - Remove completed or unwanted tasks
- **Beautiful UI** - Modern dark-themed design with Tailwind CSS
- **State Management** - Centralized state management using Redux Toolkit
- **Responsive Design** - Works seamlessly on all screen sizes
- **Fast Development** - Powered by Vite for instant HMR (Hot Module Replacement)

## Technologies Used

- **React 19.2.4** - UI library
- **Redux Toolkit 2.11.2** - State management
- **React-Redux 9.2.0** - React bindings for Redux
- **Vite 8.0.4** - Build tool and development server
- **Tailwind CSS 4.2.2** - Utility-first CSS framework
- **ESLint 9.39.4** - Code quality and linting

## Installation & Setup

1. **Clone or navigate to the project**

   ```bash
   cd todo-app-redux-toolkit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or the port shown in your terminal)

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## Project Structure

```
src/
├── components/
│   ├── AddTodo.jsx      # Component for adding new todos
│   └── Todos.jsx        # Component for displaying todo list
├── features/
│   └── todo/
│       └── todoSlice.js # Redux slice with actions and reducers
├── app/                 # Redux store configuration
├── App.jsx              # Main application component
├── main.jsx             # Application entry point
├── App.css              # Application styles
└── index.css            # Global styles
```

## Core Functionality

### Redux Store Structure

The application uses Redux Toolkit's `createSlice` for managing todo state:

```javascript
// Initial State
{
  todos: [{ id: "unique-id", text: "Task description" }];
}
```

### Available Actions

- **addTodo(text)** - Add a new todo with generated unique ID
- **removeTodo(id)** - Remove a todo by its ID
- **updateTodo({ id, text })** - Update an existing todo's text

## UI Components

### AddTodo Component

- Input field for new task text
- Add button (disabled when input is empty)
- Form submission handling with Redux dispatch

### Todos Component

- Display list of all todos
- Edit mode for each todo
- Delete button for removing todos
- Empty state message when no todos exist

## Usage

1. **Add a Task**: Type in the input field and click the "Add" button or press Enter
2. **Edit a Task**: Click the edit icon next to a task and save your changes
3. **Delete a Task**: Click the delete icon to remove a task from your list

## Browser Support

Works on all modern browsers that support:

- ES6+ JavaScript
- CSS Grid and Flexbox
- React 19

## Learning Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)

## Configuration

- **Vite Config**: See `vite.config.js` for build and dev server settings
- **ESLint Config**: See `eslint.config.js` for linting rules
- **Tailwind Config**: Tailwind CSS is configured via the Vite plugin

## License

This project is open source and available for educational purposes.

## Next Steps & Improvements

Potential enhancements for future versions:

- Add due dates to todos
- Implement priority levels
- Add todo categories/tags
- Persist todos to localStorage
- Add filters (completed, pending, all)
- Implement todo search functionality
- Add animations and transitions
- Dark/Light theme toggle

## Author

Rafay Ali

**Happy Coding!**
