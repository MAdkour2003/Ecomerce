import { useShopCart } from "../context/ShoppingCartContext";
import { cn } from "../utils";

function Header({ toggleSidebar }) {
  const { openCart, cartQuantity } = useShopCart();

  return (
    <header
      className={cn(
        "flex items-center justify-between px-5 py-3",
        "bg-primary text-text1 w-full fixed top-0 left-0 z-50",
      )}
    >
      <div className="flex items-center gap-4">
        <button
          className="bg-none border-none text-togsidebar text-xl cursor-pointer"
          onClick={toggleSidebar}
        >
          <i>Toggle</i>
        </button>
        <span>LOGO</span>
      </div>

      <button
        onClick={openCart}
        className={cn(
          "relative w-10 h-10 rounded-full border border-text1   cursor-pointer  hover:bg-white/10 ",
        )}
      >
        <i className="fa-solid fa-cart-shopping text-sm"></i>

        {cartQuantity > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1 min-w-4.5 ",
              "bg-red-500 text-text1 text-xs font-bold",
              "rounded-full ",
            )}
          >
            {cartQuantity}
          </span>
        )}
      </button>
    </header>
  );
}

export default Header;
