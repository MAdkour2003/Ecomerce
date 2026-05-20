import { useShopCart } from "../context/ShoppingCartContext";

export default function StoreItem({ id }) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useShopCart();

  const quantity = getItemQuantity(id);

  if (quantity === 0) {
    return (
      <button
        onClick={() => increaseItemQuantity(id)}
        className="bg-addcart text-text1 px-4 py-1 rounded-full text-sm hover:bg-addcarthover transition mb-2"
      >
        + Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center text-incDec justify-center gap-2 mt-2 mb-2">
      <button
        onClick={() => decreaseItemQuantity(id)}
        className="w-8 h-8 rounded-full  bg-incDecbg hover:bg-incDechover font-bold text-sm"
      >
        -
      </button>
      <span className="font-bold text-base text-incDec">{quantity}</span>
      <button
        onClick={() => increaseItemQuantity(id)}
        className="w-8 h-8 rounded-full bg-incDecbg hover:bg-incDechover font-bold text-sm"
      >
        +
      </button>
      <button
        onClick={() => removeItem(id)}
        className="text-remove text-xs ml-1 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
