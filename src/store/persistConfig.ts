import { createJSONStorage, type PersistOptions } from 'zustand/middleware';
import type { AppStore, CartLine } from './types';
import { recomputeTotals } from './helpers';

const MAP_MARKER = '__cartMap__';

interface MapMarker {
  [MAP_MARKER]: true;
  entries: [number, CartLine][];
}

const isMapMarker = (value: unknown): value is MapMarker =>
  typeof value === 'object' &&
  value !== null &&
  (value as Record<string, unknown>)[MAP_MARKER] === true;

export const cartPersistOptions: PersistOptions<AppStore> = {
  name: 'cart-storage',
  version: 1,
  storage: createJSONStorage(() => localStorage, {
    replacer: (_key, value) => {
      if (value instanceof Map) {
        const marker: MapMarker = {
          [MAP_MARKER]: true,
          entries: Array.from(value.entries()) as [number, CartLine][],
        };
        return marker;
      }
      return value;
    },
    reviver: (_key, value) => {
      if (isMapMarker(value)) {
        return new Map(value.entries);
      }
      return value;
    },
  }),
  onRehydrateStorage: () => (state) => {
    if (state && state.items instanceof Map) {
      const { count, total } = recomputeTotals(state.items);
      state.count = count;
      state.total = total;
    }
  },
};
