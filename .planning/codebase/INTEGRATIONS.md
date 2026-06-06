---
title: External Integrations
last_mapped: 2026-06-05
focus: tech
---

# External Integrations

## APIs

### Fake Store API
- **Base URL**: `https://fakestoreapi.com`
- **Purpose**: Product catalog data source (placeholder for real e-commerce backend)
- **Authentication**: None required
- **Client**: Axios instance in `src/api/api.js` with 10s timeout
- **Endpoints used**:
  - `GET /products` — Fetch all products (used in `Products.jsx`)
  - `GET /products/{id}` — Fetch single product (used in `CartSidebar.jsx`, `Details.jsx`)

```js
// src/api/api.js
const axiosClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 10000
});
export const getProducts = () => axiosClient.get('/products');
export const getProductById = (id) => axiosClient.get(`/products/${id}`);
```

## Data Persistence

### Browser localStorage (via Redux-Persist)
- **Purpose**: Persist cart state across page refreshes/sessions
- **Key**: `'cart'`
- **Whitelist**: `['items']` — only item list is persisted; count/total are recalculated via selectors
- **Config**: `src/store/store.js`

## Third-Party CDN

### Font Awesome 6.4.0
- **Loaded via**: CDN `<link>` tag in `index.html`
- **Usage**: Icons throughout UI (cart, navigation, buttons)
- **Note**: No `aria-label` on icon-only buttons — accessibility gap

## Missing Integrations (Not Yet Implemented)

- No payment gateway (Stripe, PayPal, etc.)
- No authentication provider (Auth0, Firebase, etc.)
- No analytics (GA, Mixpanel, etc.)
- No real backend / database
- No environment variables — all config is hardcoded
