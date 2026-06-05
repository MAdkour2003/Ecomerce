---
title: Architecture
last_mapped: 2026-06-05
focus: arch
---

# Architecture

## Pattern

**Feature-based SPA** — Single-page application with a single Redux slice, nested layout routing, and thin page components backed by centralized cart state.

## Layers

```
┌─────────────────────────────────────────────────┐
│  Pages (UI)                                      │
│  Home / Products / Details                       │
├─────────────────────────────────────────────────┤
│  Layout Components                               │
│  Layout → Header → CartSidebar / Sidebar         │
├─────────────────────────────────────────────────┤
│  Shared Components                               │
│  StoreItem (cart control)                        │
├─────────────────────────────────────────────────┤
│  State (Redux Toolkit)                           │
│  cartSlice: items, actions, memoized selectors   │
├─────────────────────────────────────────────────┤
│  API Layer                                       │
│  Axios client → fakestoreapi.com                 │
├─────────────────────────────────────────────────┤
│  Persistence                                     │
│  redux-persist → localStorage                    │
└─────────────────────────────────────────────────┘
```

## Component Hierarchy

```
main.jsx
└── <Provider store>          (Redux)
    └── <PersistGate>         (redux-persist hydration)
        └── <BrowserRouter>   (React Router)
            └── App.jsx       (route definitions)
                └── Layout.jsx
                    ├── Header.jsx
                    │   └── CartSidebar.jsx (slide-out drawer)
                    ├── Sidebar.jsx (left nav)
                    └── <Outlet>
                        ├── Home.jsx        /
                        ├── Products.jsx    /products
                        └── Details.jsx     /detailed/:id
```

## Data Flow

### Product Load
1. Component mounts → `useEffect` triggers
2. Calls `getProducts()` / `getProductById(id)` from `src/api/api.js`
3. Response stored in local component state (`useState`)
4. Component renders product data

### Cart Operations
1. User clicks add/remove → component calls `useDispatch()`
2. Redux action dispatched to `cartSlice`
3. Redux state updates → `useSelector` re-renders subscribed components
4. `redux-persist` middleware serializes state to `localStorage`

### CartSidebar Product Details
1. Sidebar opens → reads `selectCartItems` from Redux
2. For each cart item, checks `useRef` cache before fetching
3. Fetches missing products via `getProductById(id)` API calls
4. Cache prevents re-fetching when sidebar re-opens

## Entry Points

- **HTML**: `index.html` — mounts `<div id="root">`, loads Font Awesome CDN
- **JS**: `src/main.jsx` — wraps app in Provider + PersistGate + BrowserRouter
- **Routes**: `src/App.jsx` — defines nested route tree

## Abstractions

- **`cn()` utility** (`src/utils.js`): `clsx + twMerge` for safe Tailwind class composition
- **Memoized selectors** (`cartSlice.js`): `createSelector` prevents recalculation on unrelated state changes
- **Axios instance** (`src/api/api.js`): Centralized HTTP config, single place to add auth headers

## State Shape

```js
// Redux store
{
  cart: {
    items: [{ id: number, price: number, quantity: number }],
    count: number,   // UNUSED — shadowed by selectCartCount selector
    total: number    // UNUSED — shadowed by selectCartTotal selector
  }
}
// Persisted: cart.items only (whitelist in store.js)
```
