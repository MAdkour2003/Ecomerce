import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartItems, useCartActions, toCartProduct } from '../store';
import { getProducts } from '../api/api';
import type { Product } from '../types';

const Products = () => {
  const cartItems = useCartItems();
  const { addItem, removeOne, removeItem } = useCartActions();

  const [productList, setProductList] = useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProductList(data);
    } catch {
      setError('Failed to load data');
    }
  };

  useEffect(() => {
    void fetchProducts();
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const visibleProducts = productList.slice(0, visibleCount);

  return (
    <div className='p-6 text-center'>
      <h1 className='text-title font-medium mb-8'>React Shop</h1>
      {error && <p className='text-error font-bold'>{error}</p>}
      <div className='flex flex-wrap justify-center gap-5'>
        {visibleProducts.map((product) => {
          const line = cartItems.get(product.id);
          const quantity = line?.quantity ?? 0;
          const itemTotal = line ? line.quantity * line.price : 0;

          return (
            <div
              key={product.id}
              className='bg-white text-text1 rounded-lg w-50 p-0.5 shadow hover:translate-1 transition-all duration-300 ease-linear'
            >
              <img
                className='object-contain w-full h-48 mb-4'
                src={product.image}
                alt={product.title}
              />

              <h3 className='font-bold text-sm text-black overflow-hidden'>
                {product.title}
              </h3>

              <p className='text-textid text-sm'>{product.category}</p>

              <p className='text-price font-extrabold'>${product.price}</p>

              <div>
                <Link
                  to={`/detailed/${product.id}`}
                  className='text-textid text-sm hover:underline mb-1.5'
                >
                  View Details
                </Link>
              </div>

              {!line ? (
                <button
                  onClick={() => addItem(toCartProduct(product))}
                  className='bg-addcart text-text1 px-4 py-1 rounded-full text-sm hover:bg-addcarthover transition mb-2'
                >
                  + Add to Cart
                </button>
              ) : (
                <div className='flex flex-col items-center justify-center gap-2 mb-2'>
                  <div className='flex items-center justify-center gap-2 mb-2'>
                    <button
                      onClick={() => removeOne(product.id)}
                      className='px-2 py-1 bg-incDecbg rounded'
                    >
                      -
                    </button>

                    <span className='font-bold text-black'>{quantity}</span>

                    <button
                      onClick={() => addItem(toCartProduct(product))}
                      className='px-2 py-1 bg-incDecbg rounded'
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(product.id)}
                      className='px-2 py-1 bg-remove text-text1 rounded'
                    >
                      Remove
                    </button>
                  </div>
                  <p className='font-bold text-categorycart'>
                    ${itemTotal.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {visibleCount < productList.length && (
        <button
          onClick={showMore}
          className='text-text1 mt-4 p-2 border-none bg-showmore hover:bg-showmorehover rounded-full text-center w-1/2'
        >
          show more
        </button>
      )}
    </div>
  );
};

export default Products;
