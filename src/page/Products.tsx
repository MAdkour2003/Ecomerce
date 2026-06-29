import { useState } from "react";
import { Link } from "react-router-dom";
import { toCartProduct } from "../store";
import StoreItem from "../components/Storeitem";
import { Useproducts } from "../Hook/UseProduct";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [visibleCount, setVisibleCount] = useState(10);

  const { data: productList = [], isPending, isError } = Useproducts();

  if (isPending)
    return <div className="p-6 text-center">Loading products...</div>;
  if (isError)
    return (
      <div className="p-6 text-center text-error font-bold">
        Failed to load data
      </div>
    );

  const visibleProducts = productList.slice(0, visibleCount);

  return (
    <div className="p-6 text-center">
      <h1 className="text-title font-medium mb-8">React Shop</h1>
      <div className="flex flex-wrap justify-center gap-5">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white text-text1 rounded-lg w-50 p-0.5 shadow hover:translate-1 transition-all duration-300 ease-linear"
          >
            <img
              className="object-contain w-full h-48 mb-4"
              src={product.image}
              alt={product.title}
            />
            <h3 className="font-bold text-sm text-black overflow-hidden">
              {product.title}
            </h3>
            <p className="text-textid text-sm">{product.category}</p>
            <p className="text-price font-extrabold">${product.price}</p>
            <div>
              <Link
                to={`/detailed/${product.id}`}
                className="text-textid text-sm hover:underline mb-1.5"
              >
                View Details
              </Link>
            </div>
            <StoreItem product={toCartProduct(product)} />
          </div>
        ))}
      </div>
      {visibleCount < productList.length && (
        <Button
          onClick={() => setVisibleCount((prev) => prev + 10)}
          className="text-text1 mt-4 p-2 border-none bg-showmore hover:bg-showmorehover rounded-full text-center w-1/2"
        >
          show more
        </Button>
      )}
    </div>
  );
};

export default Products;
