---
title: Code Conventions
last_mapped: 2026-06-05
focus: quality
---

# Code Conventions

## Component Style

- **All functional components** — no class components anywhere in codebase
- Single default export per file
- Props via destructuring: `function Header({ onToggle })` or `const Foo = ({ prop }) => ...`
- Arrow function components for simple components; `function` declarations for page components

## Hooks Usage

| Hook | Usage Pattern |
|---|---|
| `useState` | Local UI state (sidebar open, loading, product data) |
| `useSelector` | Redux state subscription — always uses memoized selectors from `cartSlice.js` |
| `useDispatch` | Single call at component top; dispatches actions inline |
| `useEffect` | API calls on mount (`[]` dependency); cleanup not used |
| `useMemo` | Used in `StoreItem` to memoize selector creation per item `id` |
| `useRef` | Product cache in `CartSidebar` to avoid refetching already-loaded items |
| `useParams` | Destructured at top of `Details.jsx` — `const { id } = useParams()` |
| `useNavigate` | Used for programmatic navigation |

## Styling Conventions

- Tailwind utility classes applied directly to JSX
- `cn()` from `src/utils.js` used for conditional/merged class expressions
- Custom theme colors defined as CSS custom properties in `src/index.css` `@theme` block:

```css
/* src/index.css — custom color palette */
--color-primary: #...;
--color-sidebar: #0a5bb7bb;
--color-prices: #00875a;
--color-remove: #fb2c36;
--color-addcart: #...;
```

- Classes reference custom colors via Tailwind utilities: `bg-sidebar`, `text-prices`, etc.

## Import Order

```js
// 1. React + hooks
import { useState, useEffect } from 'react';
// 2. Third-party libraries
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// 3. Internal store
import { selectCartItems, addItem } from '../store/cartSlice';
// 4. Internal components
import StoreItem from '../components/Storeitem';
// 5. Utilities / API
import { getProducts } from '../api/api';
import { cn } from '../utils';
```

## Error Handling

- `try/catch` in async functions within `useEffect`
- `console.error(err)` for logging (no production error tracking)
- User-facing error messages rendered inline (e.g., in `Products.jsx`)
- No global error boundaries — unhandled errors would crash the app

## Async Pattern

```js
// Standard pattern in components
useEffect(() => {
  const fetch = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load products');
    }
  };
  fetch();
}, []);
```

## Redux Conventions

- Actions dispatched inline: `dispatch(addItem({ id, price }))`
- All selectors imported directly from `cartSlice.js`
- Per-item selectors created with `useMemo` to capture `id` in closure:

```js
// StoreItem.jsx pattern
const selectQty = useMemo(() => selectCartQuantityById(id), [id]);
const qty = useSelector(selectQty);
```

## Conditional Rendering

```jsx
// Short-circuit for simple cases
{isOpen && <CartSidebar />}

// Ternary for loading/content splits
{loading ? <Spinner /> : <ProductGrid products={products} />}
```
