# Events Viewer

A modern, professional React application for browsing and discovering upcoming events.

## Live Demo

**Deployed Application:** [http://teg-events-viewer.s3-website-ap-southeast-2.amazonaws.com](http://teg-events-viewer.s3-website-ap-southeast-2.amazonaws.com)

## Features

### Core Functionality
- Browse upcoming events from live API
- **Advanced Search** - Search events by name, venue, or description
- **Smart Filtering** - Filter events by venue
- **Flexible Sorting** - Sort by date (earliest/latest) or name (A-Z/Z-A)
- **Dark Mode** - Full dark/light/system theme support with persistence
- View detailed event information in modal
- Responsive design for mobile, tablet, and desktop

### Technical Highlights
- **Environment-based Configuration** - Centralized environment variables
- **Production-ready Logging** - Development-only console output
- **Input Validation** - Zod schemas for runtime type safety
- **Performance Optimized** - Memoized components and debounced search
- **Accessibility** - Keyboard navigation and focus management
- **Error Resilience** - Graceful fallback to sample data

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Environment Configuration

Copy `.env.example` to `.env.local` for local development:

```bash
# API Configuration
VITE_API_URL=https://your-api-endpoint.com/events.json

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_SEARCH=true
VITE_ENABLE_SORTING=true
```

---

## Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | Component-based UI library |
| **TypeScript** | 5.2.2 | Type safety and developer experience |
| **Vite** | 5.0.8 | Fast build tool with HMR |
| **Tailwind CSS** | 3.3.6 | Utility-first styling framework |

### New Professional Dependencies

| Package | Purpose |
|---------|---------|
| **@tanstack/react-query** | Data fetching, caching, and synchronization |
| **Zod** | Runtime schema validation |
| **use-debounce** | Performance optimization for search |

### Development Tools

- **ESLint** - Code quality and linting
- **Jest** - Unit testing framework
- **Testing Library** - Component testing utilities
- **PostCSS + Autoprefixer** - CSS processing

---

## Architecture

### Folder Structure
```
src/
├── api/              # HTTP client and API calls
│   ├── client.ts     # Generic HTTP client with timeout
│   └── eventsApi.ts  # Event-specific API operations
├── components/       # React UI components
│   ├── EventList.tsx       # Main container with filtering
│   ├── EventCard.tsx       # Event card (memoized)
│   ├── EventDetail.tsx     # Event modal (memoized)
│   ├── VenueSelector.tsx   # Venue filter dropdown
│   ├── SearchInput.tsx     # Debounced search input
│   ├── SortSelector.tsx    # Sort options dropdown
│   ├── ThemeToggle.tsx     # Dark mode toggle
│   ├── LoadingSpinner.tsx  # Loading indicator
│   └── ErrorBoundary.tsx   # Error handling wrapper
├── config/           # Environment configuration
│   └── env.ts        # Type-safe environment variables
├── context/          # React Context providers
│   ├── AppContext.tsx      # App state context
│   ├── AppProvider.tsx     # App state provider
│   └── ThemeContext.tsx    # Theme management
├── hooks/            # Custom React hooks
│   └── useEventsData.ts    # Data fetching hook
├── types/            # TypeScript definitions
│   ├── event.types.ts      # Event and Venue types
│   ├── api.types.ts        # API response types
│   ├── schemas.ts          # Zod validation schemas
│   └── venue.types.ts      # Venue type exports
├── utils/            # Utility functions
│   ├── logger.ts           # Environment-aware logging
│   ├── dateFormatter.ts    # Date/time formatting
│   └── errorHandler.ts     # Error handling utilities
├── constants/        # Static data
│   └── fallbackData.ts     # Offline fallback events
├── App.tsx           # Root application component
├── main.tsx          # React DOM entry point
└── index.css         # Global styles with dark mode
```

### Design Patterns

1. **Container/Presenter Pattern**
   - `EventList` handles logic, `EventCard` handles presentation

2. **Custom Hooks Pattern**
   - `useEventsData()` - Data fetching and state management
   - `useTheme()` - Theme context access
   - `useAppContext()` - App state access

3. **Error Boundary Pattern**
   - Catches React errors and displays fallback UI

4. **Memoization Pattern**
   - Components wrapped with `React.memo()` for performance
   - `useMemo()` for expensive computations
   - `useCallback()` for stable function references

5. **Provider Pattern**
   - `ThemeProvider` - Theme state management
   - `AppProvider` - Application state management

---

## Key Features

### Dark Mode Support
- Toggle between Light, Dark, and System themes
- Persists preference in localStorage
- Smooth transitions between themes
- Custom scrollbar styling in dark mode

### Advanced Search
- Real-time search with 300ms debounce
- Searches across event names, descriptions, and venues
- Clear search with single click
- Shows search query in results header

### Event Sorting
- Sort by date (earliest first or latest first)
- Sort alphabetically (A-Z or Z-A)
- Maintains sort when filtering

### Professional Logging
- Development-only console output
- Structured logging with levels (debug, info, warn, error)
- No console pollution in production builds

### Type Safety
- Strict TypeScript configuration
- Runtime validation with Zod schemas
- Comprehensive type definitions for all data

---

## Performance Optimizations

1. **Component Memoization** - Prevents unnecessary re-renders
2. **Debounced Search** - Reduces API calls and re-renders
3. **useMemo Hooks** - Caches expensive computations
4. **useCallback Hooks** - Stable function references
5. **Code Splitting** - Automatic chunk optimization by Vite
6. **Tree Shaking** - Only includes used code in bundle

---

## Testing

```bash
# Run all tests
npm run test

# Watch mode
npm run test -- --watch

# Coverage report
npm run test -- --coverage
```

### Test Structure
```
src/
├── api/__tests__/
│   ├── client.test.ts
│   └── eventsApi.test.ts
├── components/__tests__/
│   ├── EventCard.test.tsx
│   ├── EventDetail.test.tsx
│   ├── ErrorBoundary.test.tsx
│   └── LoadingSpinner.test.tsx
└── utils/__tests__/
    ├── dateFormatter.test.ts
    └── errorHandler.test.ts
```

---

## Deployment

### Build for Production
```bash
npm run build
```

Generates optimized static assets in `dist/` folder.

### Environment Variables
- `VITE_API_URL` - Main API endpoint
- `VITE_CORS_PROXY_URL` - CORS proxy service
- `VITE_ENABLE_*` - Feature flags

### AWS S3 Deployment
The application is configured for static hosting on AWS S3 with CloudFront CDN.

---

## Error Handling

1. **Error Boundaries** - Catch component-level errors
2. **API Error Handling** - Structured error responses
3. **Fallback Data** - Offline functionality with sample events
4. **User Feedback** - Clear error messages and retry options
5. **Logging** - Comprehensive error logging in development

---

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- Focus management in modals
- High contrast in both light and dark modes
- Responsive text sizing
- Screen reader friendly

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Contributing

1. Follow TypeScript strict mode
2. Add JSDoc comments to public functions
3. Write tests for new features
4. Use meaningful commit messages
5. Ensure ESLint passes with no errors

---

## License

Private project for demonstration purposes.
