import { useSelector, useDispatch } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem,
} from "../store/cartSlice";

export default function StoreItem({ id }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const quantity = cartItems.find((item) => item.id === id)?.quantity || 0;

  if (quantity === 0) {
    return (
      <button
        onClick={() => dispatch(increaseItemQuantity(id))}
        className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition"
      >
        + Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <button
        onClick={() => dispatch(decreaseItemQuantity(id))}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-sm"
      >
        -
      </button>
      <span className="font-bold text-base">{quantity}</span>
      <button
        onClick={() => dispatch(increaseItemQuantity(id))}
        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-sm"
      >
        +
      </button>
      <button
        onClick={() => dispatch(removeItem(id))}
        className="text-red-500 text-xs ml-1 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
