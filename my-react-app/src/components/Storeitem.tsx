import { useShopCart } from "../context/ShopCartContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  icon: string;
};

export default function StoreItem({ id, name, price, icon }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useShopCart();
  const quantity = getItemQuantity(id);

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition bg-white flex flex-col">
      {/* Icon - no fixed height, just padding */}
      <div className="w-full bg-gray-50 flex items-center justify-center text-6xl py-12">
        {icon}
      </div>

      {/* Content - flex-grow pushes button to bottom */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-gray-800">{name}</span>
          <span className="text-gray-500 font-medium">${price}</span>
        </div>

        {/* mt-auto pushes this to bottom of card */}
        <div className="mt-auto">
          {quantity === 0 ? (
            <button
              onClick={() => increaseItemQuantity(id)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-basket-shopping"></i>
              Add to Cart
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-4">
                <button
                  className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center text-xl font-bold"
                  onClick={() => decreaseItemQuantity(id)}
                >
                  -
                </button>
                <div className="text-center">
                  <span className="text-2xl font-bold">{quantity}</span>
                  <span className="text-gray-500 text-sm block">in cart</span>
                </div>
                <button
                  className="w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center text-xl font-bold"
                  onClick={() => increaseItemQuantity(id)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeItem(id)}
                className="text-red-500 hover:text-red-700 text-sm underline"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
