# Main App - Development Guide

## Overview

The main-app is an Angular 17 application that serves as a demonstration of various libraries including localization, logging, and master data management. The application is called "Digital Treasure Chest" - a demo store application localized in 30 different languages.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 18 or higher recommended)
- **npm** (comes with Node.js)
- **Angular CLI** (version 17.2.1 or higher)

## Installation

From the root of the workspace (`/Users/viktorsirotin/VSCodeProjects/web-code-kindergarten`):

```bash
npm install
```

This will install all dependencies defined in the root `package.json`.

## Project Structure

```
projects/main-app/
├── src/
│   ├── assets/          # Static assets
│   ├── core/            # Core modules and services
│   ├── environments/    # Environment configurations
│   ├── shared/          # Shared components and utilities
│   ├── index.html       # Main HTML file
│   ├── main.ts          # Application entry point
│   ├── styles.css       # Global styles
│   └── version.json     # Version and build information
├── karma.conf.ts        # Karma test configuration
├── tsconfig.app.json    # TypeScript configuration for the app
├── tsconfig.spec.json   # TypeScript configuration for tests
└── README.md            # Project documentation
```

## Development

### Starting the Development Server

To run the application in development mode:

```bash
npm start
```

or

```bash
ng serve
```

This will:
- Start the Angular development server
- Compile the application
- Watch for file changes and automatically reload
- Make the app available at `http://localhost:4200/`

The development server uses the **development** configuration by default, which includes:
- Source maps for easier debugging
- No optimization
- License extraction disabled

### Development Configuration

The app uses two environment configurations:
- **Development**: `projects/main-app/src/environments/environment.ts`
- **Production**: `projects/main-app/src/environments/environment.prod.ts`

## Building

### Development Build

To build the application for development:

```bash
npm run build:main-app:development
```

This command:
1. Runs the `pre-build.js` script (updates build date in `version.json` and checks for unused imports)
2. Builds the application using the development configuration
3. Outputs to `dist/main-app/`

### Standard Build

```bash
npm run build
```

or

```bash
ng build
```

This builds using the default configuration (production).

### Production Build

For a production-ready build:

```bash
ng build main-app --configuration production
```

Production build includes:
- Code optimization and minification
- Output hashing for cache busting
- Environment file replacement
- Base href set to `/digital-treasure-chest/`
- Budget limits enforced (2MB initial warning, 5MB error)

The output will be in the `dist/main-app/` directory.

## Testing

### Running Unit Tests

To execute unit tests via Karma:

```bash
npm test
```

or

```bash
ng test
```

This will:
- Launch Karma test runner
- Open a Chrome browser
- Run all test files (files with `.spec.ts` extension)
- Watch for changes and re-run tests automatically

### Test Configuration

Tests are configured using:
- **Karma**: `projects/main-app/karma.conf.ts`
- **TypeScript**: `projects/main-app/tsconfig.spec.json`
- **Framework**: Jasmine

### Running Tests in CI Mode

For continuous integration (single run without watch mode):

```bash
ng test main-app --watch=false --browsers=ChromeHeadless
```

## Pre-build Process

The application uses a pre-build script (`pre-build.js`) that automatically:

1. **Updates Build Date**: Modifies `version.json` with the current timestamp
2. **Checks for Unused Imports**: Uses `ts-unused-exports` to identify unused exports

This script runs automatically before the development build.

## Watch Mode

For continuous building during development:

```bash
npm run watch
```

This builds the project and watches for file changes, automatically rebuilding when files are modified.

## Available NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `ng serve` | Start development server |
| `build` | `ng build` | Build the application (production) |
| `build:main-app:development` | `ng build main-app --configuration development` | Build for development |
| `prebuild:main-app:development` | `node pre-build.js` | Pre-build script (runs before development build) |
| `watch` | `ng build --watch --configuration development` | Build and watch for changes |
| `test` | `ng test` | Run unit tests |

## Dependencies

### Core Dependencies
- **Angular 17.2.0**: Framework
- **Angular Material 17.3.10**: UI components
- **RxJS 7.8.1**: Reactive programming

### Custom Libraries
- `@vsirotin/keeper-master-data`: Master data management
- `@vsirotin/localizer`: Internationalization support
- `@vsirotin/log4ts`: Logging functionality

## Troubleshooting

### Port Already in Use

If port 4200 is already in use, specify a different port:

```bash
ng serve --port 4300
```

### Build Errors

If you encounter build errors:
1. Clean the node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. Clear Angular cache:
   ```bash
   rm -rf .angular
   ```

### Test Failures

If tests fail to run:
1. Ensure Chrome is installed
2. Check karma configuration in `projects/main-app/karma.conf.ts`
3. Try running in headless mode:
   ```bash
   ng test --browsers=ChromeHeadless
   ```

## Deployment

The production build is configured for deployment to GitHub Pages at:
https://vsirotin.github.io/digital-treasure-chest/

The base href is automatically set to `/digital-treasure-chest/` in the production configuration.

## Additional Resources

- [Angular Documentation](https://angular.io/docs)
- [Angular CLI Documentation](https://angular.io/cli)
- [Project README](README.md)
- [Root README](../../README.md)
