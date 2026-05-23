import { useContext, createContext, useState, useEffect } from 'react';

const ShopCartContext = createContext({});

export function useShopCart() {
  return useContext(ShopCartContext);
}

// TODO: save quantity to local storage.
export function ShoppingCartProvider({ children }) {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) ?? [];
  });

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  function increaseItemQuantity(id) {
    setCartItems((items) => {
      const exists = items.find((item) => item.id === id);
      if (!exists) return [...items, { id, quantity: 1 }];
      return items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
    setCartQuantity((prev) => prev + 1);
  }

  function decreaseItemQuantity(id) {
    setCartItems((items) => {
      const item = items.find((i) => i.id === id);
      if (item.quantity === 1) return items.filter((i) => i.id !== id);
      return items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
    setCartQuantity((prev) => prev - 1);
  }

  function removeItem(id) {
    let itemCount = 0;
    const updatedCartItems = cartItems.filter((item) => {
      if (item.id === id) {
        itemCount = item.quantity;
        return false;
      }
      return true;
    });
    setCartItems(updatedCartItems);
    setCartQuantity((prev) => prev - itemCount);
  }

  return (
    <ShopCartContext.Provider
      value={{
        increaseItemQuantity,
        decreaseItemQuantity,
        getItemQuantity,
        removeItem,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
    </ShopCartContext.Provider>
  );
}
