import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import StoreItem from './Storeitem';
import { getProductById } from '../api/api';
import { selectCartItems } from '../store/cartSlice';

export default function CartSidebar({ isOpen, onClose }) {
  const cartItems = useSelector(selectCartItems);

  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const productCache = useRef({});

  const fetchCartDetails = async (itemsToFetch) => {
    if (itemsToFetch.length === 0) return;

    setLoading(true);
    try {
      const promises = itemsToFetch.map((item) => getProductById(item.id));
      const responses = await Promise.all(promises);

      responses.forEach((data, index) => {
        productCache.current[itemsToFetch[index].id] = data;
      });

      const products = cartItems.map((item) => ({
        ...productCache.current[item.id],
        id: item.id,
        quantity: item.quantity,
      }));

      setCartProducts(products);
    } catch (err) {
      console.error('Failed to fetch cart products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen || cartItems.length === 0) {
      setCartProducts([]);
      return;
    }

    const itemsToFetch = cartItems.filter(
      (item) => !productCache.current[item.id]
    );

    if (itemsToFetch.length > 0) {
      fetchCartDetails(itemsToFetch);
    } else {
      const products = cartItems.map((item) => ({
        ...productCache.current[item.id],
        id: item.id,
        quantity: item.quantity,
      }));
      setCartProducts(products);
    }
  }, [isOpen, cartItems.length]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-60 flex justify-end'>
      <div className='absolute inset-0 bg-incDec/50' onClick={onClose} />

      <div className='relative w-full max-w-md bg-text1 h-full shadow-xl overflow-y-auto'>
        <div className='p-4 border-b flex items-center justify-between bg-primary text-text1'>
          <h2 className='text-xl font-bold'>Your Cart ({cartItems.length})</h2>
          <button onClick={onClose} className='text-2xl hover:text-incDechover'>
            &times;
          </button>
        </div>

        <div className='p-4'>
          {loading ? (
            <p className='text-center text-textload py-8'>Loading cart...</p>
          ) : cartProducts.length === 0 ? (
            <p className='text-center text-textload py-8'>Your cart is empty</p>
          ) : (
            <div className='space-y-4'>
              {cartProducts.map(
                ({ id, image, title, category, price, quantity }) => (
                  <div
                    key={id}
                    className='flex gap-3 border rounded-lg p-3 hover:shadow-md transition'
                  >
                    <img
                      src={image}
                      alt={title}
                      className='w-20 h-20 object-contain'
                    />

                    <div className='flex-1'>
                      <h3 className='font-semibold text-sm text-titelcart line-clamp-2'>
                        {title}
                      </h3>
                      <p className='text-categorycart text-xs mt-1'>
                        {category}
                      </p>
                      <p className='text-price font-bold mt-1'>${price}</p>

                      <StoreItem id={id} />
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
