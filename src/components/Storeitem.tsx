import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  addItem,
  removeOne,
  removeItem,
  selectCartQuantityById,
  selectCartItemTotals,
} from '../store/cartSlice';

interface StoreItemProps {
  id: number;
  price: number;
}

export default function StoreItem({ id, price }: StoreItemProps) {
  const dispatch = useAppDispatch();
  const selectQuantity = useMemo(() => selectCartQuantityById(id), [id]);
  const quantity = useAppSelector(selectQuantity);
  const totals = useAppSelector(selectCartItemTotals);
  const itemTotal = totals[id] ?? 0;

  if (quantity === 0) {
    return (
      <button
        onClick={() => dispatch(addItem({ id, price }))}
        className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-addcarthover transition"
      >
        + Add to Cart
      </button>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <div className="bg-categorycart/10 px-4 py-1.5 rounded-full border border-categorycart/20">
        <p className="font-bold text-price text-base">${itemTotal.toFixed(2)}</p>
      </div>
      <button
        onClick={() => dispatch(removeOne(id))}
        className="w-8 h-8 rounded-full bg-text1 hover:bg-bgcolorWH font-bold text-sm"
      >
        -
      </button>
      <span className="font-bold text-base">{quantity}</span>
      <button
        onClick={() => dispatch(addItem({ id, price }))}
        className="w-8 h-8 rounded-full bg-text1 hover:bg-bgcolorWH font-bold text-sm"
      >
        +
      </button>
      <button
        onClick={() => dispatch(removeItem(id))}
        className="text-remove text-xs ml-1 hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
