# Currency Converter

A modern, real-time currency converter web application built with React and Vite. This application allows users to convert amounts between different currencies with up-to-date exchange rates.

## Features

- **Real-time Currency Conversion**: Convert amounts between multiple currencies with live exchange rates
- **Currency Swap**: Quickly swap the "from" and "to" currencies with a single click
- **Reset Functionality**: Reset the input amount to start over
- **Beautiful UI**: Modern, responsive design with a frosted glass effect using TailwindCSS
- **Dynamic Background**: Eye-catching unsplash background image
- **Currency Options**: Access to a wide range of currencies
- **Instant Conversion**: Get conversion results instantly
- **Fast Development**: Built with Vite for lightning-fast development experience

## Tech Stack

- **Frontend Framework**: React 19.2.4
- **Build Tool**: Vite 8.0.1
- **Styling**: TailwindCSS 4.2.2
- **API**: [Currency API](https://github.com/fawazahmed0/currency-api)
- **Linting**: ESLint

## Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd currency-converter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Usage

### Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Lint Code

Run ESLint to check code quality:

```bash
npm run lint
```

## Project Structure

```
currency-converter/
├── src/
│   ├── components/
│   │   └── InputBox.jsx        # Main input component
│   ├── hooks/
│   │   └── useCurrencyInfo.js  # Custom hook for fetching currency data
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # App styles
│   ├── index.css                # Global styles
│   └── main.jsx                 # Entry point
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
└── eslint.config.js             # ESLint configuration
```

## How It Works

1. **useCurrencyInfo Hook**: Fetches real-time currency exchange rates from the Fawaz Ahmed's Currency API based on the selected "from" currency
2. **InputBox Component**: Handles user input for amount and currency selection
3. **Conversion Logic**: Multiplies the amount by the exchange rate to display the converted amount
4. **Swap Functionality**: Exchanges the "from" and "to" currencies, updating amounts accordingly
5. **Reset Feature**: Clears the conversion and returns to the initial state

## UI Components

### InputBox Component
Reusable input component that displays:
- Currency label (From/To)
- Amount input field
- Currency dropdown selector
- Uses TailwindCSS for styling

### App Component
Main application component containing:
- Amount state management
- Currency pair selection
- Conversion, swap, and reset operations
- Clean, modern UI with a backdrop blur effect

## API Integration

The application uses the [Currency API](https://github.com/fawazahmed0/currency-api) endpoint:

```
https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{currency}.json
```

This provides free, real-time currency exchange rates.

## Design Highlights

- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Glass Morphism**: Modern frosted glass effect on the converter card
- **Dynamic Background**: Beautiful high-quality background images
- **Intuitive UI**: Clear labels and easy-to-use button controls

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is part of a learning portfolio and is open for educational purposes.

## Future Enhancements

- Add historical exchange rate charts
- Implement offline support with local caching
- Add more currency options and symbols
- Create a favorites feature for quick conversion
- Add conversion history
- Support for cryptocurrency conversions

## Purpose

Created as a React learning project demonstrating component composition, API integration, and modern UI design patterns.

## Author

Rafay Ali

**Happy Coding!**