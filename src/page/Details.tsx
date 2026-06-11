import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../api/api';
import StoreItem from '../components/Storeitem';
import { toCartProduct } from '../store';
import type { Product } from '../types';

type PageState =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'error'; message: string }
  | { status: 'ok'; product: Product };

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [state, setState] = useState<PageState>({ status: 'loading' });

  useEffect(() => {
    if (!id) { setState({ status: 'not-found' }); return; }
    getProductById(id)
      .then((product) => setState({ status: 'ok', product }))
      .catch(() => setState({ status: 'error', message: 'Failed to load product' }));
  }, [id]);

  if (state.status === 'error') return <p className='p-6 text-remove'>{state.message}</p>;
  if (state.status === 'not-found') return <p className='p-6 text-remove'>Product not found.</p>;
  if (state.status === 'loading') return <p className='p-6 text-center'>Loading...</p>;
  const { product } = state;

  return (
    <div className='p-6 max-w-2xl mx-auto'>
      <button
        onClick={() => navigate('/products')}
        className='text-4xl font-bold text-sidebar'
      >
        ~ Back to Home
      </button>
      <img
        src={product.image}
        alt={product.title}
        className='w-full h-64 object-contain mb-4'
      />
      <h1 className='text-2xl font-bold'>{product.title}</h1>
      <p className='text-textbody capitalize'>{product.category}</p>
      <p className='text-xl font-bold text-price mt-2'>${product.price}</p>
      <p className='text-textbody mt-4'>{product.description}</p>
      <div className='mt-6'>
        <StoreItem product={toCartProduct(product)} />
      </div>
    </div>
  );
};

export default Details;
