import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppStore } from './types';
import { createCartSlice } from './cartSlice';
import { cartPersistOptions } from './persistConfig';

export const useCartStore = create<AppStore>()(
  persist(createCartSlice, cartPersistOptions)
);
