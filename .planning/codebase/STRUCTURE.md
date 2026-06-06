---
title: Directory Structure
last_mapped: 2026-06-05
focus: arch
---

# Directory Structure

## Root Layout

```
my-react-app/
└── Ecomerce/              ← actual project root (nested under git worktree)
    ├── public/            ← static assets
    ├── src/               ← all application source
    │   ├── api/
    │   ├── components/
    │   ├── page/          ← NOTE: singular "page", not "pages"
    │   ├── store/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   └── utils.js
    ├── .planning/         ← GSD planning artifacts (this directory)
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── eslint.config.js
    └── .gitignore
```

## Source Directories

### `src/api/`
- `api.js` — Axios client instance + `getProducts()`, `getProductById(id)` functions

### `src/components/`
Shared/layout components:
- `Layout.jsx` — Root layout: renders Header, Sidebar, and `<Outlet>` for page content
- `Header.jsx` — Top navigation bar; cart icon button that toggles `CartSidebar`
- `CartSidebar.jsx` — Slide-out cart drawer; fetches product details on open, uses ref cache
- `Sidebar.jsx` — Left navigation sidebar with route links
- `Storeitem.jsx` — Reusable add-to-cart / quantity increment/decrement control

### `src/page/`
Route-level page components (note: folder is `page`, not `pages`):
- `Home.jsx` — Landing page (minimal content)
- `Products.jsx` — Product catalog grid with "show more" pagination
- `Details.jsx` — Single product detail view (`/detailed/:id`)

### `src/store/`
Redux state:
- `store.js` — Configures Redux store with redux-persist middleware; exports `store` and `persistor`
- `cartSlice.js` — Single Redux slice: `addItem`, `removeOne`, `removeItem`, `clearCart` actions + all selectors

### `src/` (root files)
- `App.jsx` — Route definitions using React Router v6 nested routes
- `main.jsx` — App bootstrap: Provider → PersistGate → BrowserRouter → App
- `index.css` — Tailwind imports + `@theme` block with custom color variables
- `utils.js` — `cn()` helper (clsx + tailwind-merge)

## Key File Paths

| Purpose | Path |
|---|---|
| API client | `src/api/api.js` |
| Redux store | `src/store/store.js` |
| Cart state | `src/store/cartSlice.js` |
| Route config | `src/App.jsx` |
| Main entry | `src/main.jsx` |
| Global styles | `src/index.css` |
| Shared util | `src/utils.js` |
| Products page | `src/page/Products.jsx` |
| Details page | `src/page/Details.jsx` |
| Cart sidebar | `src/components/CartSidebar.jsx` |

## Naming Conventions

| Pattern | Convention | Example |
|---|---|---|
| Component files | PascalCase `.jsx` | `CartSidebar.jsx` |
| Utility/config files | lowercase `.js` | `api.js`, `utils.js` |
| Component names | PascalCase | `<StoreItem />` |
| Functions | camelCase | `toggleSidebar`, `fetchCartDetails` |
| Redux selectors | `select` prefix | `selectCartItems`, `selectCartTotal` |
| Redux actions | verb camelCase | `addItem`, `removeOne`, `clearCart` |
| CSS variables | `--color-*` | `--color-primary`, `--color-addcart` |
