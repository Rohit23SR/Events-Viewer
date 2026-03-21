# Events Viewer

A React app for browsing and discovering upcoming Australian events. Search by name or venue, filter by location, sort by date or name, and toggle between light and dark themes. Ships with 51 real-world events across 12 venues.

## Live Demo

[http://teg-events-viewer.s3-website-ap-southeast-2.amazonaws.com](http://teg-events-viewer.s3-website-ap-southeast-2.amazonaws.com)

## What it does

- **51 events** across concerts, AFL, cricket, NRL, theatre, comedy, festivals, and exhibitions
- **12 venues** in Sydney, Melbourne, Brisbane, Perth, and Adelaide
- **Search** — debounced (300ms), searches event name, description, and venue
- **Venue filter** — dropdown to filter by specific venue
- **Sort** — by date (earliest/latest) or name (A-Z/Z-A)
- **Event detail modal** — click any card for full info, close with ESC or click outside
- **Dark mode** — light, dark, or system preference with localStorage persistence
- **Fallback data** — graceful degradation if the API is unavailable
- **Responsive** — single column on mobile, 2 on tablet, 3 on desktop

## Tech Stack

| What | How |
|------|-----|
| Framework | React 18, TypeScript 5 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 (dark mode via class) |
| Icons | Lucide React |
| Data | Self-hosted JSON API in public/data/ |
| Testing | Jest + React Testing Library |

## Getting Started

```bash
git clone <repo-url>
cd events-viewer
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The app loads 51 events from `public/data/event-data.json` — no external API needed.

## Scripts

```bash
npm run dev            # start dev server
npm run build          # production build (tsc + vite)
npm run preview        # preview prod build

npm run lint           # eslint check
npm run lint:fix       # eslint auto-fix
npm run format         # prettier format
npm run format:check   # check formatting

npm run test           # jest unit tests
```

## Project Structure

```
src/
├── api/              HTTP client + event fetching/transformation
├── components/       EventList, EventCard, EventDetail, SearchInput,
│                     VenueSelector, SortSelector, ThemeToggle,
│                     LoadingSpinner, ErrorBoundary
├── config/           type-safe environment config
├── constants/        fallback event data (8 events)
├── context/          ThemeContext (light/dark/system), AppContext
├── hooks/            useEventsData (fetch + state)
├── types/            Event, Venue, API response types, Zod schemas
└── utils/            logger, date formatter, error handler

public/
└── data/
    └── event-data.json   51 events in HAL-JSON format
```

## Data

The app serves its own event data from `public/data/event-data.json`. 51 events spanning April–October 2026:

- **Concerts** (15) — Taylor Swift, Ed Sheeran, Coldplay, Billie Eilish, Tame Impala, Flume, etc.
- **Sports** (17) — AFL rounds + grand final, cricket (Aus vs India), NRL finals
- **Theatre** (6) — Hamilton, Wicked, Les Mis, Phantom, Come From Away, SIX
- **Comedy** (5) — Hannah Gadsby, Jim Jefferies, Celeste Barber, Wil Anderson, Trevor Noah
- **Festivals** (4) — Splendour in the Grass, Falls, Laneway, Bluesfest
- **Exhibitions** (4) — Van Gogh Alive, Tutankhamun, Jurassic World, Immersive Monet

Venues include Sydney Opera House, MCG, SCG, Rod Laver Arena, The Gabba, RAC Arena, Adelaide Oval, and more.

## Architecture

- All display components are memoized with `React.memo()`
- Search is debounced at 300ms to prevent excessive re-renders
- Filtering and sorting use `useMemo` for performance
- Event handlers use `useCallback` for referential equality
- ThemeContext manages dark mode with system preference detection
- Error boundary catches rendering errors with retry UI
- Logger utility suppresses debug output in production

## Deployment

Hosted on AWS S3 as a static website. Build and deploy:

```bash
npm run build
# upload dist/ contents to S3 bucket
```

## License

Private and proprietary.
