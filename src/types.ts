export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  id: number;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  count: number;
  total: number;
}
