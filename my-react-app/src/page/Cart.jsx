import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../api/api';
import StoreItem from '../components/StoreItem';

const Cart = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .catch(() => setError('Failed to load product'));
  }, [id]);

  if (error) return <p className='p-6 text-red-500'>{error}</p>;
  if (!product) return <p className='p-6 text-center'>Loading...</p>;

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <img
        src={product.image}
        alt={product.title}
        className='w-full h-64 object-contain mb-4'
      />
      <h1 className='text-2xl font-bold text-gray-800'>{product.title}</h1>
      <p className='text-gray-500 capitalize'>{product.category}</p>
      <p className='text-xl font-bold text-price mt-2'>${product.price}</p>
      <p className='text-gray-600 mt-4'>{product.description}</p>

      <div className='mt-6'>
        <StoreItem id={product.id} />
      </div>
    </div>
  );
};

export default Cart;
