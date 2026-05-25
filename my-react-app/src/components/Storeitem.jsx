import { useCartStore } from "../store/useCartStore";

export default function StoreItem({ id }) {
  const increaseItemQuantity = useCartStore(
    (state) => state.increaseItemQuantity,
  );
  const decreaseItemQuantity = useCartStore(
    (state) => state.decreaseItemQuantity,
  );
  const removeItem = useCartStore((state) => state.removeItem);
  const getItemQuantity = useCartStore((state) => state.getItemQuantity);

  const quantity = getItemQuantity(id);

  if (quantity === 0) {
    return (
      <button
        onClick={() => increaseItemQuantity(id)}
        className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition"
      >
        + Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <button
        onClick={() => decreaseItemQuantity(id)}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-sm"
      >
        -
      </button>
      <span className="font-bold text-base">{quantity}</span>
      <button
        onClick={() => increaseItemQuantity(id)}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-sm"
      >
        +
      </button>
      <button
        onClick={() => removeItem(id)}
        className="text-red-500 text-xs ml-1 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
