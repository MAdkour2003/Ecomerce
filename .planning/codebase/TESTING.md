---
title: Testing
last_mapped: 2026-06-05
focus: quality
---

# Testing

## Current State

**No tests exist.** The project has zero test coverage.

## What's Missing

| Item | Status |
|---|---|
| Test framework (Vitest/Jest) | Not installed |
| React Testing Library | Not installed |
| Test files (`*.test.js`, `*.spec.js`) | None found |
| Test script in package.json | Not present |
| CI test pipeline | Not configured |

## What Needs Testing (Priority Order)

### Critical
1. **`cartSlice.js` reducers** — `addItem`, `removeOne`, `removeItem`, `clearCart` — pure functions, easy to unit test
2. **Memoized selectors** — `selectCartTotal`, `selectCartCount`, `selectCartQuantityById` — verify calculation logic

### Important
3. **`StoreItem` component** — renders correct qty, dispatches correct actions on click
4. **`CartSidebar` component** — renders cart items, shows totals correctly

### Nice to Have
5. **`Products.jsx`** — mounts, fetches, renders product list (requires API mock)
6. **`Details.jsx`** — route param handling, product display

## Recommended Setup (When Tests Are Added)

```bash
npm install -D vitest @testing-library/react @testing-library/user-event @vitest/ui jsdom
```

Add to `package.json`:
```json
"test": "vitest",
"test:ui": "vitest --ui"
```

Add to `vite.config.js`:
```js
test: { environment: 'jsdom', globals: true }
```

## Notes

- Redux Toolkit's `createSlice` produces pure reducers — no mocking needed for unit tests
- API calls via Axios should be mocked with `vi.mock('../api/api')` in component tests
- `redux-persist` should be excluded from test store setup to avoid localStorage interference
