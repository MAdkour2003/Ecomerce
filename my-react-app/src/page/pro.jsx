import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShopCart } from "../context/ShoppingCartContext";
import { getProducts } from "../api/api";

const Pro = () => {
  const { increaseItemQuantity } = useShopCart();
  const [Products, setProducts] = useState([]);
  const [visableCount, setvisablecount] = useState(10);
  const [error, seterror] = useState("");

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        seterror("falied to load data ");
      }
    };
    fetchproduct();
  }, []);

  const showmore = () => {
    setvisablecount((prev) => prev + 10);
  };

  const visiableProducts = Products.slice(0, visableCount);
  console.log(visiableProducts);
  return (
    <div className="p-6 text-center">
      <h1 className="text-title font-medium mb-8">React Shop</h1>
      {error && <p className="text-error font-bold">{error}</p>}
      <div className="flex flex-wrap justify-center gap-5">
        {visiableProducts.map((Product) => (
          <div
            key={Product.id}
            className="bg-white text-text1 rounded-lg w-50 p-0.5 shadow hover:translate-1 transition-all duration-300 ease-linear "
          >
            <img
              className=" object-contain w-full h-48 mb-4"
              src={Product.image}
              alt=""
            />
            <h3 className="font-bold text-sm text-black overflow-hidden">
              {Product.title}
            </h3>
            <p className="text-textid text-sm">{Product.category}</p>
            <p className="text-price font-extrabold">${Product.price}</p>
            <button
              onClick={() => increaseItemQuantity(Product.id)}
              className="bg-addcart text-text1 px-4 py-1 rounded-full text-sm hover:bg-addcarthover transition mb-0.5"
            >
              + Add To Cart
            </button>
            {/* <StoreItem id={Product.id} /> */}
            <div>
              <Link
                to={`/store/${Product.id}`}
                className="text-blue-600 text-sm hover:underline mb-1.5"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
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

export default Pro;
