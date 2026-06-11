interface RemoteCartItem {
  productId: number;
  quantity: number;
}

export interface RemoteCart {
  id: number;
  userId: number;
  date: string;
  products: RemoteCartItem[];
}

export const getRemoteCart = async (userId: number): Promise<RemoteCart[]> => {
  const res = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
  if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
  return res.json();
};

export const updateRemoteCart = async (
  cartId: number,
  products: { productId: number; quantity: number }[]
): Promise<RemoteCart> => {
  const res = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ products }),
  });
  if (!res.ok) throw new Error(`Failed to update cart: ${res.status}`);
  return res.json();
};
