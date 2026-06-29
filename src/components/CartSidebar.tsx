import StoreItem from "./Storeitem";
import { useCartItems, useCartCount } from "../store";
import { Button } from "@/components/ui/button";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const items = useCartItems();
  const count = useCartCount();

  if (!isOpen) return null;

  const itemsArr = Array.from(items.values());

  return (
    <div className="fixed inset-0 z-60 flex justify-end">
      <div className="absolute inset-0 bg-incDec/50" onClick={onClose} />

      <div className="relative w-full max-w-md bg-text1 h-full shadow-xl overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between bg-primary text-text1">
          <h2 className="text-xl font-bold">Your Cart ({count})</h2>
          <Button onClick={onClose} className="text-2xl hover:text-incDechover">
            &times;
          </Button>
        </div>

        <div className="p-4">
          {itemsArr.length === 0 ? (
            <p className="text-center text-textload py-8">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {itemsArr.map(
                ({ id, image, title, category, price, quantity: _q }) => (
                  <div
                    key={id}
                    className="flex gap-3 border rounded-lg p-3 hover:shadow-md transition"
                  >
                    <img
                      src={image}
                      alt={title}
                      className="w-20 h-20 object-contain"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-sm text-titelcart line-clamp-2">
                        {title}
                      </h3>
                      <p className="text-categorycart text-xs mt-1">
                        {category}
                      </p>
                      <p className="text-price font-bold mt-1">${price}</p>

                      <StoreItem
                        product={{ id, title, image, category, price }}
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
