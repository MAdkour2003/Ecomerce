---
title: Technology Stack
last_mapped: 2026-06-05
focus: tech
---

# Technology Stack

## Language & Runtime

- **JavaScript (ES6+)** — All source files use modern ES6+ syntax with JSX
- **Node.js** — Runtime for dev tooling via Vite
- **Module system**: `"type": "module"` in package.json — ES modules (import/export)

## Frontend Framework

- **React 18.2.0** — Component library using functional components + hooks exclusively; no class components

## Build Tooling

- **Vite 5.0.8** — Dev server and bundler
- **@vitejs/plugin-react 4.2.1** — Fast JSX compilation via Oxc parser

## State Management

- **Redux Toolkit 2.12.0** (`@reduxjs/toolkit`) — `createSlice`, `createSelector` for memoized selectors
- **React-Redux 9.3.0** — `useSelector`, `useDispatch` hooks
- **Redux-Persist 6.0.0** — Persists cart slice to `localStorage` with key `'cart'`

## Routing

- **React Router DOM 6.20.0** — Nested routes with `<Outlet>`, `useParams`, `useNavigate`

## HTTP Client

- **Axios 1.16.1** — Instance configured with `baseURL: 'https://fakestoreapi.com'` and `timeout: 10000`

## Styling

- **Tailwind CSS 4.3.0** — Utility-first CSS; configured via `@theme` block in `src/index.css`
- **@tailwindcss/vite 4.3.0** — Official Vite plugin
- **clsx 2.1.1** — Conditional class name composition
- **tailwind-merge 3.6.0** — Resolves Tailwind class conflicts
- **Font Awesome 6.4.0** — Icons via CDN in `index.html`

## Code Quality

- **ESLint** — Modern flat config (`eslint.config.js`) with React hooks and refresh plugins

## TypeScript Notes

- `@types/react` and `@types/react-dom` are installed as dev dependencies
- The project is **JavaScript only** — no `.ts`/`.tsx` files exist; types are unused

## Scripts

```json
"dev":     "vite"
"build":   "vite build"
"lint":    "eslint ."
"preview": "vite preview"
```

## Key Dependency Versions (package.json)

| Package | Version |
|---|---|
| react | ^18.2.0 |
| react-dom | ^18.2.0 |
| react-router-dom | ^6.20.0 |
| @reduxjs/toolkit | ^2.12.0 |
| react-redux | ^9.3.0 |
| redux-persist | ^6.0.0 |
| axios | ^1.16.1 |
| tailwindcss | ^4.3.0 |
| clsx | ^2.1.1 |
| tailwind-merge | ^3.6.0 |
| vite | ^5.0.8 |
