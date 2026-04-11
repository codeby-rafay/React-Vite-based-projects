# Job Cards Project

A modern and interactive React application that displays job listings in beautiful card format. This project showcases a job board interface with responsive card components displaying company information, job positions, salary details, and application functionality.

## Features

- **Job Cards Display**: Browse through multiple job listings in an attractive card layout
- **Company Information**: View company logos, names, and job posting dates
- **Job Details**: See job titles, employment type, experience level, hourly rates, and locations
- **Save Jobs**: Bookmark jobs for later using the save button
- **Apply Now**: Quick access to job application with dedicated button
- **Responsive Design**: Clean and modern UI that adapts to different screen sizes
- **Icons**: Uses Lucide React icons for an enhanced visual experience

## Tech Stack

- **React 19.2.0**: Modern JavaScript library for building user interfaces
- **Vite 7.3.1**: Lightning-fast build tool and development server
- **Lucide React 0.576.0**: Beautiful icon library for React
- **CSS Modules**: Scoped styling for component isolation
- **ESLint**: Code quality and consistency checking

## Project Structure

```
job-cards/
├── src/
│   ├── components/
│   │   └── Card/
│   │       ├── Card.jsx          # Job card component
│   │       └── Card.module.css   # Card styling
│   ├── App.jsx                   # Main app component with job data
│   ├── App.css                   # App-level styles
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Project dependencies
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
└── README.md                    # This file
```

## Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd job-cards
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Usage

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory ready for deployment.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Code Linting

Check code quality and consistency:

```bash
npm run lint
```

## Component Overview

### Card Component

The `Card` component is the core of this application. It takes a job object as props and displays:

- **Header Section**: Company logo and save button
- **Middle Section**: Company name, posting date, job position, and job type tags
- **Footer Section**: Hourly pay rate, location, and "Apply Now" button

**Props Structure:**
```jsx
{
  brandlogo: "string (URL or base64)",
  company: "string",
  datePosted: "string",
  position: "string",
  tag_1: "string",            // e.g., "Full Time"
  tag_2: "string",            // e.g., "Senior Level"
  pay: number,                // Hourly rate
  location: "string"
}
```

## Sample Data

The project includes sample job listings from major tech companies:
- Google
- Microsoft
- Apple
- Amazon

Each job card displays realistic job information and can be easily extended with additional job listings.

## Styling

The project uses CSS Modules for style encapsulation:

- **Card Styling**: Defined in `Card.module.css` with clean, modern design
- **Global Styles**: Basic styling in `index.css` and `App.css`
- **Responsive Layout**: Flexbox for flexible and responsive design
- **Shadows & Borders**: Subtle UI elements for depth and clarity

## ESLint Configuration

ESLint is configured to maintain code quality with:
- React plugin with hooks support
- React refresh plugin for HMR
- Standard JavaScript rules

Run `npm run lint` to check for code issues.

## Development Tips

- **Hot Module Replacement (HMR)**: Changes are automatically reflected in the browser during development
- **Component Structure**: Cards are reusable components that accept job data as props
- **Icon Library**: Use Lucide React icons by importing from `lucide-react`
- **CSS Modules**: Import styles as objects for component-scoped CSS

## Future Enhancement Ideas

- Add job search and filter functionality
- Implement job details modal
- Add pagination for large job lists
- Create user authentication for saved jobs
- Add sorting by salary, date posted, or location
- Implement dark mode toggle
- Create an API integration for real job data
- Add animation and transitions

## Performance

- Vite provides fast build times and efficient development
- Fast Refresh for instant updates during development
- Optimized production builds with code splitting
- Lightweight dependencies for optimal bundle size

## Browser Support

This project works on all modern browsers that support ES6+ JavaScript and modern CSS features.

## License

This project is open source and available for educational and personal use.

---

## Author

Rafay Ali

**Happy Coding!**
