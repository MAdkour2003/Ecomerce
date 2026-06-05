---
title: Concerns & Tech Debt
last_mapped: 2026-06-05
focus: concerns
---

# Concerns & Tech Debt

## Severity: High

### No Tests
- **Impact**: Regressions undetected; changes are risky without a safety net
- **Location**: Entire codebase
- **Fix**: Add Vitest + Testing Library; start with `cartSlice.js` unit tests

### No Error Boundaries
- **Impact**: Unhandled errors in any component will crash the entire app (white screen)
- **Location**: `src/main.jsx`, `src/App.jsx`
- **Fix**: Wrap `<App>` in an `<ErrorBoundary>` component

### Missing TypeScript
- **Impact**: No type safety; `@types/react` installed but unused
- **Location**: Entire codebase
- **Fix**: Migrate to TypeScript (`.tsx`/`.ts` files) or at least add JSDoc types

## Severity: Medium

### No Checkout / Payment Flow
- **Impact**: Cart is a dead end — users can add items but cannot purchase
- **Location**: `CartSidebar.jsx` has no checkout button
- **Affects**: Core e-commerce functionality

### Hard-coded Price Bug in Details.jsx
- **Impact**: `price` is passed to `StoreItem` but is not received as a prop — likely causes `undefined` rendering
- **Location**: `src/page/Details.jsx` line ~40
- **Fix**: Verify prop passing; confirm `price` is read from fetched product data

### Unused Redux State Fields
- **Impact**: `cart.count` and `cart.total` in the Redux slice are never updated but still exist — confusing to future contributors
- **Location**: `src/store/cartSlice.js`
- **Fix**: Remove `count` and `total` from initial state (selectors compute these)

### Unused Import in cartSlice
- **Impact**: Dead code — `Products` is imported but never used
- **Location**: `src/store/cartSlice.js` line 2
- **Fix**: Remove the import

### No Loading State in Products Page
- **Impact**: UX gap — blank screen while products fetch; no spinner or skeleton
- **Location**: `src/page/Products.jsx`

### No Search or Filter
- **Impact**: Users can only scroll through all products; no way to find specific items
- **Location**: `src/page/Products.jsx`

## Severity: Low

### Accessibility: Icon-Only Buttons Lack aria-label
- **Impact**: Screen readers cannot describe button purpose
- **Location**: Header cart button, sidebar toggle, any Font Awesome icon buttons
- **Fix**: Add `aria-label` to all icon-only buttons

### Folder Named `page` Instead of `pages`
- **Impact**: Minor inconsistency; a TODO comment in `Products.jsx` acknowledges this
- **Location**: `src/page/`

### No Environment Variables
- **Impact**: API base URL is hardcoded; switching to a real backend requires code change
- **Location**: `src/api/api.js`
- **Fix**: Use `import.meta.env.VITE_API_URL` with `.env` file

### README Is Default Vite Template
- **Impact**: No documentation for the actual project
- **Location**: `README.md`

### No Input Validation on API Responses
- **Impact**: If API shape changes, app silently renders broken UI or throws
- **Location**: `src/api/api.js`, all components using API data

## Security

- **No authentication**: App is entirely public; no user accounts
- **No CORS issues**: fakestoreapi.com is public; production API will need proper CORS config
- **No sensitive data**: No API keys, credentials, or PII in codebase
- **localStorage**: Cart data is not sensitive; storage is appropriate

## Performance

- **Product list**: All products fetched at once — no pagination at API level (only UI "show more")
- **CartSidebar uses `useRef` cache**: Good pattern; avoids redundant API calls
- **Memoized selectors**: `createSelector` properly used; no known selector performance issues
- **No code splitting**: Single bundle; acceptable for current app size
