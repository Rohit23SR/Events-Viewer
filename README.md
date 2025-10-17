🌐 Live URL
Deployed Application:

🔗 http://teg-events-viewer.s3-website-ap-southeast-2.amazonaws.com
This is the production deployment hosted on AWS S3 (Static Website Hosting).

Install, Build and Test

1) npm install
2) npm run dev
3) npm run build
4) npm run test


# Events Viewer Application – Tech Stack Documentation

## 1. Core Technologies

### React 18.2.0
**What:** JS library for building UI  
**Used For:**  
- Reusable components (`EventCard`, `EventDetail`, `VenueSelector`)  
- State management (`useState`, `useEffect`, `useMemo`)  
- Interactive UI using Virtual DOM  
**Why:** Component-based, performant, industry standard  

### TypeScript 5.2.2
**What:** Typed superset of JavaScript  
**Used For:**  
- Type safety for events, venues, API responses  
- Compile-time error detection  
- Improved IDE support and maintainability  
**Why:** Prevents bugs and improves developer experience  

---

## 2. Build Tools & Development

### Vite 5.0.8
**What:** Fast build tool  
**Used For:**  
- HMR and dev server  
- Optimized production builds  
- TypeScript compilation and CORS proxying  
**Why:** Faster and modern alternative to CRA  

### @vitejs/plugin-react 4.2.1
**What:** React plugin for Vite  
**Used For:**  
- Fast Refresh  
- JSX/TSX support and React optimizations  
**Why:** Required for React + Vite setup  

---

## 3. Styling

### Tailwind CSS 3.3.6
**What:** Utility-first CSS framework  
**Used For:**  
- Styling, layout, typography, responsiveness  
- Hover, transition, and animation utilities  
**Why:** Rapid development and small bundle size  

### PostCSS 8.4.32 + Autoprefixer 10.4.16
**Used For:**  
- Processing Tailwind CSS  
- Adding vendor prefixes automatically  
**Why:** Ensures browser compatibility  

---

## 4. Icons

### Lucide React 0.263.1
**Used For:**  
- UI icons like Calendar, Clock, MapPin, ChevronDown, RefreshCw  
**Why:** Lightweight, consistent, and TypeScript-friendly  

---

## 5. State Management

### React Context API
**Used For:**  
- Global state (`selectedVenue`, `selectedEvent`)  
- Avoiding prop drilling  
**Why:** Simple and sufficient for app needs  

### React Hooks
**Used For:**  
- `useState`, `useEffect`, `useMemo`, `useContext`  
- Custom hooks (`useEventsData`) for data fetching  
**Why:** Modular and reusable logic  

---

## 6. Code Quality & Linting

- **ESLint 8.55.0:** Code quality and bug prevention  
- **@typescript-eslint/eslint-plugin 6.14.0:** TypeScript-specific linting  
- **eslint-plugin-react-hooks 4.6.0:** Ensures correct hook usage  

---

## 7. Architecture Patterns

- **Custom Hooks Pattern:** `useEventsData()`, `useAppContext()`  
- **Error Boundary Pattern:** Graceful error handling  
- **Compound Component Pattern:** Shared context (`<AppProvider><EventList/></AppProvider>`)  
- **Container/Presenter Pattern:** Logic in `EventList`, UI in `EventCard`  

---

## 8. API & Data Handling

- **Fetch API:** For HTTP requests, supports `AbortController`  
- **Vite Proxy:** Bypasses CORS during development  
**Why:** Native, modern, and no extra dependencies  

---

## 9. Error Handling Strategy

- **Error Boundary:** React-level fallback UI  
- **Try-Catch:** For API and async operations  
- **Custom Error Classes:** Structured error data  
- **Fallback Data:** Keeps app functional if API fails  
- **User Feedback:** Loading, error, and empty states  

---

## 10. Type System Architecture

- **Type Files:** `event.types.ts`, `api.types.ts`, `venue.types.ts`  
- **Type Safety:** For props, state, API responses, and functions  

---

## 11. Performance Optimizations

- **useMemo:** Prevents expensive recalculations  
- **Lazy Evaluation:** Conditional rendering only when needed  
- **Code Splitting:** Vite auto-optimizes bundles  

---

## 12. Development Tools

- **TypeScript Compiler:** Type checking and compilation  
- **Vite Dev Server:** HMR for instant updates  
- **Browser DevTools:** React DevTools + source maps  

---

## 13. Folder Structure
```
src/
├── api/          # API client
├── components/   # UI components
├── context/      # Global state
├── hooks/        # Custom hooks
├── types/        # Type definitions
├── utils/        # Helpers
├── constants/    # Static fallback data
├── App.tsx       # Root component
├── main.tsx      # Entry point
└── index.css     # Global styles
```
**Why:** Clear separation, scalable, industry standard  

---

## 14. Local Development, Build & Test Process

### Install Dependencies
```bash
npm install
```

### Run Local Dev Server
```bash
npm run dev
```
- Starts Vite development server at `http://localhost:5173`  
- Includes Hot Module Replacement (HMR)

### Build for Production
```bash
npm run build
```
- Generates optimized static assets in the `dist` folder  

### Preview Production Build
```bash
npm run preview
```
- Serves the production build locally for verification  

### Run Unit Tests
```bash
npm run test
```
- Executes tests via **Jest** (configured for TypeScript + React)  
- Displays pass/fail summary with coverage  

### Watch Mode
```bash
npm run test:watch
```
- Automatically reruns tests on file changes  

### Test File Naming Convention
```
src/
└── __tests__/
    ├── client.test.ts
    ├── EventList.test.tsx
    └── EventCard.test.tsx
```

---

## 15. Key Features Enabled by Stack

- **Type Safety:** Fewer runtime bugs  
- **Fast Development:** Vite + HMR  
- **Modern UI:** React + Tailwind  
- **Error Resilience:** Boundaries + fallback data  
- **Performance:** useMemo and optimized bundles  
- **Developer Experience:** ESLint, TypeScript, Vite

---

## 16. Production-Ready Features

- TypeScript type safety  
- Error boundaries and fallback data  
- Loading and empty states  
- Responsive design  
- Clean, scalable architecture  
- ESLint-enforced quality  
- Optimized Vite builds  
- Cross-browser compatibility  
- Accessibility compliance
