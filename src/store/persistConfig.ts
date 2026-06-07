import { createJSONStorage, type PersistOptions } from 'zustand/middleware';
import type { AppStore, CartLine } from './types';
import { withCartTotals } from './helpers';

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
  // Belt-and-suspenders: if stored count/total ever drifts from items
  // (e.g. external tampering with localStorage), recompute on rehydrate.
  onRehydrateStorage: () => (state) => {
    if (state && state.items instanceof Map) {
      const { count, total } = withCartTotals(state.items);
      state.count = count;
      state.total = total;
    }
  },
};
