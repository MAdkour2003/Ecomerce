import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItem,
  selectCartItems,
} from "../store/cartSlice";
import { getProducts } from "../api/api";
// Todo: Change route and component name to Products
const Products = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [Products, setProducts] = useState([]);
  const [visableCount, setvisablecount] = useState(10);
  const [error, seterror] = useState("");

  const fetchproduct = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      seterror("falied to load data ");
    }
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  const showmore = () => {
    setvisablecount((prev) => prev + 10);
  };

  const visiableProducts = Products.slice(0, visableCount);
  return (
    <div className="p-6 text-center">
      <h1 className="text-title font-medium mb-8">React Shop</h1>
      {error && <p className="text-error font-bold">{error}</p>}
      <div className="flex flex-wrap justify-center gap-5">
        {visiableProducts.map((Product) => {
          const cartItem = cartItems.find((item) => item.id === Product.id);

          return (
            <div
              key={Product.id}
              className="bg-white text-text1 rounded-lg w-50 p-0.5 shadow hover:translate-1 transition-all duration-300 ease-linear"
            >
              <img
                className="object-contain w-full h-48 mb-4"
                src={Product.image}
                alt={Product.title}
              />

              <h3 className="font-bold text-sm text-black overflow-hidden">
                {Product.title}
              </h3>

              <p className="text-textid text-sm">{Product.category}</p>

              <p className="text-price font-extrabold">${Product.price}</p>

              <div>
                <Link
                  to={`/detailed/${Product.id}`}
                  className="text-textid text-sm hover:underline mb-1.5"
                >
                  View Details
                </Link>
              </div>

              {!cartItem ? (
                <button
                  onClick={() => dispatch(increaseItemQuantity(Product.id))}
                  className="bg-addcart text-text1 px-4 py-1 rounded-full text-sm hover:bg-addcarthover transition mb-2"
                >
                  + Add to Cart
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 mb-2">
                  <button
                    onClick={() => dispatch(decreaseItemQuantity(Product.id))}
                    className="px-2 py-1 bg-incDecbg rounded"
                  >
                    -
                  </button>

                  <span className="font-bold text-black">
                    {cartItem.quantity}
                  </span>

                  <button
                    onClick={() => dispatch(increaseItemQuantity(Product.id))}
                    className="px-2 py-1 bg-incDecbg rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => dispatch(removeItem(Product.id))}
                    className="px-2 py-1 bg-remove text-text1 rounded"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {visableCount < Products.length && (
        <button
          onClick={showmore}
          className="text-text1 mt-4 p-2 border-none bg-showmore hover:bg-showmorehover rounded-full text-center w-1/2"
        >
          show more
        </button>
      )}
    </div>
  );
};

export default Products;
