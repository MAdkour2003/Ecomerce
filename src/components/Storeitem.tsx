import { useStoreItem, type CartProduct } from '../store';

interface StoreItemProps {
  product: CartProduct;
}

export default function StoreItem({ product }: StoreItemProps) {
  const { quantity, addItem, removeOne, removeItem } = useStoreItem(product.id);

  const itemTotal = quantity * product.price;

  if (quantity === 0) {
    return (
      <button
        onClick={() => addItem(product)}
        className='bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-addcarthover transition'
      >
        + Add to Cart
      </button>
    );
  }

  return (
    <div className='flex items-center justify-center gap-2 mt-2'>
      <div className='bg-categorycart/10 px-4 py-1.5 rounded-full border border-categorycart/20'>
        <p className='font-bold text-price text-base'>
          ${itemTotal.toFixed(2)}
        </p>
      </div>
      <button
        onClick={() => removeOne(product.id)}
        className='w-8 h-8 rounded-full bg-text1 hover:bg-bgcolorWH font-bold text-sm'
      >
        -
      </button>
      <span className='font-bold text-base'>{quantity}</span>
      <button
        onClick={() => addItem(product)}
        className='w-8 h-8 rounded-full bg-text1 hover:bg-bgcolorWH font-bold text-sm'
      >
        +
      </button>
      <button
        onClick={() => removeItem(product.id)}
        className='text-remove text-xs ml-1 hover:underline'
      >
        Remove
      </button>
    </div>
  );
}
