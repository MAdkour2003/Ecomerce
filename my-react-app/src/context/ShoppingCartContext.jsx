import { useContext, createContext, useState, useEffect, useMemo } from "react";

const ShopCartContext = createContext({});

export function useShopCart() {
  return useContext(ShopCartContext);
}

export function ShoppingCartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) ?? [];
  });

  const cartQuantity = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function getItemQuantity(id) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseItemQuantity(id) {
    setCartItems((items) => {
      const exists = items.find((item) => item.id === id);
      if (!exists) return [...items, { id, quantity: 1 }];
      return items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  }

  function decreaseItemQuantity(id) {
    setCartItems((items) => {
      const item = items.find((i) => i.id === id);
      if (item.quantity === 1) return items.filter((i) => i.id !== id);
      return items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  }

  function removeItem(id) {
    setCartItems((items) => items.filter((item) => item.id !== id));
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
